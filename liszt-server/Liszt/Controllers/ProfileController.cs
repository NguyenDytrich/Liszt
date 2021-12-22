using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using Liszt.Converters;
using Liszt.Models;
using Liszt.Models.DTO;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Prompts;
using Liszt.Services;
using Microsoft.AspNetCore.Mvc;

namespace Liszt.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ProfileController : ControllerBase
  {
    private readonly IFirestoreDb _firestore;

    public ProfileController(IFirestoreDb firestore)
    {
      _firestore = firestore;
    }

    [HttpPost]
    public async Task<ActionResult<UserProfile>> Post(UserProfile newProfile)
    {
      bool hasAuthToken = Request.Headers.TryGetValue("Authorization", out var token);
      if (!hasAuthToken) return Unauthorized();

      try
      {
        FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(
          token.FirstOrDefault().Split(' ')[1]
        );
        var uid = decodedToken.Uid;
        var docRef = _firestore.Collection("profiles").Document(uid);
        await docRef.SetAsync(newProfile);
        var snapshot = await docRef.GetSnapshotAsync();
        return snapshot.ConvertTo<UserProfile>();
      }
      catch
      {
        return Unauthorized();
      }
    }

    /// <summary>
    /// Get the profile of the currently authorized user
    /// </summary>
    /// <returns>The authorized user's profile</returns>
    [HttpGet]
    public async Task<ActionResult<UserProfile>> Get()
    {
      bool hasAuthToken = Request.Headers.TryGetValue("Authorization", out var token);
      if (!hasAuthToken) return Unauthorized();

      try
      {
        FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(
          token.FirstOrDefault().Split(' ')[1]
        );
        var uid = decodedToken.Uid;
        return await GetUserProfile(uid);
      }
      catch (Exception e)
      {
        Console.WriteLine(e.GetType());
        Console.WriteLine(e.Message);
        return Unauthorized();
      }
    }

    private async Task<UserProfile> GetUserProfile(string userId)
    {
      var docRef = _firestore.Collection("profiles").Document(userId);
      var snapshot = await docRef.GetSnapshotAsync();

      return snapshot.ConvertTo<UserProfile>();
    }
  }
}
