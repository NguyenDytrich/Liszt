using System.Collections.Generic;

namespace Liszt.Models.Answers
{
  public class Pitch : Answer<Pitch>
  {
    public int IntegerClass { get; set; }
    public List<string> LetterClass { get; set; }

    public Pitch()
    {
      LetterClass = new List<string>();
    }

    public override bool Equals(Pitch a) {
      return a.IntegerClass == IntegerClass;
    }
    
  }
}
