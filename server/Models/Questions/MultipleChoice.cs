using System.Collections.Generic;
using Google.Cloud.Firestore;
using Liszt.Models.Answers;

namespace Liszt.Models.Questions
{
  [FirestoreData]
  public class MultipleChoice<T> : Question where T : Answer
  {
    public List<T> OptionPool { get; set; }

    /// <value>Answer is the the correct answer in the outside of OptionPool</value>
    public T Answer { get; set; }
  }
}
