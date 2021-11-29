using System.Collections.Generic;

namespace Liszt.Models.Answers
{
    public class Pitch : Answer
    {
        public override string ToString()
        {
            return Id;
        }

        public int IntegerClass { get; set; }
        public string[] LetterClass { get; set; }
    }
}