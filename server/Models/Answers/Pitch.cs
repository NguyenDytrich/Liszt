using System.Collections.Generic;

namespace Liszt.Models.Answers
{
  public class Pitch : Answer
  {
    public int IntegerClass { get; set; }
    public List<string> LetterClass { get; set; }

    public Pitch()
    {
      LetterClass = new List<string>();
    }

    public override string ToString()
    {
      return Id;
    }
  }
}
