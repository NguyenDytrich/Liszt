using System.Collections.Generic;
using Google.Cloud.Firestore;
using Liszt.Models.Answers;

namespace Liszt.Models.Questions
{
    [FirestoreData]
    public class MultipleChoice<T> : Question where T : Answer
    {
        public List<T> OptionPool { get; set; }

        /// <value>Answer is the index of the correct answer in the OptionPool</value>
        public int Answer { get; set; }
    }
}