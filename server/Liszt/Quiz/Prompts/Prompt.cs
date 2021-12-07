namespace Liszt.Quiz.Prompts {
  public class Prompt {
    public virtual string Type { get => "text"; }
    public string DisplayText { get; set; }
  }
}