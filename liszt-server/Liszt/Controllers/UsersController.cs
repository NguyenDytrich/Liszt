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
  public class UsersController : ControllerBase
  {
    private readonly IFirestoreDb _firestore;

    public UsersController(IFirestoreDb firestore)
    {
      _firestore = firestore;
    }

    /// <summary>
    /// Return the profile of the specified user by their Firebase UID
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>The specified user's UserProfile without email or name</returns>
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDTO>> Get(string userId)
    {
      bool hasAuthToken = Request.Headers.TryGetValue("Authorization", out var token);
      if (!hasAuthToken) return Unauthorized();

      try
      {
        FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(
          token.FirstOrDefault().Split(' ')[1]
        );
        var profile = await GetUserProfile(userId);
        return UserProfileDTO.FromUserProfile(profile);
      }
      catch
      {
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
