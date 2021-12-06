using Liszt.Quiz.Prompts;

namespace Liszt.Quiz.Questions
{
  public abstract class Question<T> where T : Prompt
  {
    public string Id { get; set; }
    public T Prompt { get; set; }

    public abstract string Type { get; }
  }
}
