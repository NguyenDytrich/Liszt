namespace Liszt.Models.DTO
{
  public class UserProfileDTO
  {
    public string DisplayName { get; set; }
    public string Pronouns { get; set; }
    public string Instruments { get; set; }

    public static UserProfileDTO FromUserProfile(UserProfile profile) => new UserProfileDTO()
    {
      DisplayName = profile.DisplayName,
      Pronouns = profile.Pronouns,
      Instruments = profile.Instruments,
    };
  }
}
