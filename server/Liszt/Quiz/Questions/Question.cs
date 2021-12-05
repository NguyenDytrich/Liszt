using Liszt.Quiz.Answers;

namespace Liszt.Quiz.Questions
{
  public abstract class Question
  {
    public string Id { get; set; }
    public string Prompt { get; set; }

    public abstract string Type { get; }
  }
}
