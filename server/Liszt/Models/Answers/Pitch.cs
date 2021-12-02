using System;

namespace Liszt.Models.Answers
{
  /// <summary>
  /// Enum <c>Accidental</c> is a list of possible accidentals and their distance
  /// relative to the natural note in semitones.
  /// </summary>
  public enum Accidental
  {
    NATURAL = 0,
    SHARP = 1,
    FLAT = -1,
    DOUBLE_SHARP = 2,
    DOUBLE_FLAT = -2
  }

  public class Pitch : Answer<Pitch>
  {
    /// <value><c>IntegerClass</c> is the integer-representation of the pitch class starting at C=0</value>
    public int IntegerClass { get; }
    /// <value><c>_letterClass</c> is the alphabetical representation of a pitch</value>
    private char _letterClass;
    /// <value><c>_accidental</c> is the accidental that this Pitch will be spelled with</value>
    private Accidental _accidental;

    public Pitch(int integerClass, char letterClass, Accidental accidental)
    {
      IntegerClass = integerClass;
      _letterClass = letterClass;
      _accidental = accidental;

    }

    public string LetterClass
    {
      get
      {
        switch (_accidental)
        {
          case Accidental.NATURAL:
            return _letterClass.ToString();
          case Accidental.SHARP:
            return _letterClass + "#";
          case Accidental.FLAT:
            return _letterClass + "b";
          case Accidental.DOUBLE_SHARP:
            return _letterClass + "##";
          case Accidental.DOUBLE_FLAT:
            return _letterClass + "bb";
          default:
            throw new ArgumentOutOfRangeException($"Unexpected value {_accidental}");
        }
      }
    }

    public override bool Equals(Pitch a)
    {
      return a.IntegerClass == IntegerClass
            && a.LetterClass == LetterClass;
    }
    public bool EnharmonicEquals(Pitch a)
    {
      return a.IntegerClass == IntegerClass;
    }

  }
}
