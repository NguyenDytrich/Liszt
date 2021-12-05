using System.Collections.Generic;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Google.Cloud.Firestore;
using Liszt.Converters;
using Liszt.Quiz.Answers;

namespace Liszt.Quiz.Questions
{
  public class MultipleChoice<T> : Question where T : Answer<T>
  {
    public override string Type { get => "multiple_choice"; }

    public List<T> OptionPool { get; set; }

    public T Answer { get; set; }
  }
}
