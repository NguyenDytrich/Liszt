using System.Collections.Generic;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Prompts;

namespace Liszt.Quiz.Questions
{
  public class MultipleChoice<P, T> : Question<P> 
    where T : Answer<T>
    where P : Prompt
  {
    public override string Type { get => "multiple_choice"; }

    public List<T> OptionPool { get; set; }

    public T Answer { get; set; }
  }
}
