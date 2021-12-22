using System;
using Google.Cloud.Firestore;

namespace Liszt.Models
{
  [FirestoreData]
  public class UserProfile
  {
    [FirestoreProperty]
    public string UserId { get; set; }

    [FirestoreProperty]
    public string DisplayName { get; set; }

    [FirestoreProperty]
    public string Name { get; set; }

    [FirestoreProperty]
    public string Pronouns { get; set; }

    [FirestoreProperty]
    public string Instruments { get; set; }
  }
}
