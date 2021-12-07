using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Liszt.Quiz.Answers
{
  /// <summary>
  /// A representation of possible pitch classes.
  /// </summary>
  public class PitchClasses
  {
    private static readonly IDictionary<int, PitchClass> _naturals = new Dictionary<int, PitchClass>() {
          { 0, new PitchClass(0, 'C', Accidental.NATURAL) },
          { 2, new PitchClass(2, 'D', Accidental.NATURAL) },
          { 4, new PitchClass(4, 'E', Accidental.NATURAL) },
          { 5, new PitchClass(5, 'F', Accidental.NATURAL) },
          { 7, new PitchClass(7, 'G', Accidental.NATURAL) },
          { 9, new PitchClass(9, 'A', Accidental.NATURAL) },
          { 11, new PitchClass(11, 'B', Accidental.NATURAL) },
        };
    private static readonly IDictionary<int, PitchClass> _sharps = new Dictionary<int, PitchClass>() {
          { 0, new PitchClass(0, 'B', Accidental.SHARP) },
          { 1, new PitchClass(1, 'C', Accidental.SHARP) },
          { 3, new PitchClass(3, 'D', Accidental.SHARP) },
          { 5, new PitchClass(5, 'E', Accidental.SHARP) },
          { 6, new PitchClass(6, 'F', Accidental.SHARP) },
          { 8, new PitchClass(8, 'G', Accidental.SHARP) },
          { 10, new PitchClass(10, 'A', Accidental.SHARP) },
        };
    private static readonly IDictionary<int, PitchClass> _flats = new Dictionary<int, PitchClass>() {
          { 1, new PitchClass(1, 'D', Accidental.FLAT) },
          { 3, new PitchClass(3, 'E', Accidental.FLAT) },
          { 4, new PitchClass(4, 'F', Accidental.FLAT) },
          { 6, new PitchClass(6, 'G', Accidental.FLAT) },
          { 8, new PitchClass(8, 'A', Accidental.FLAT) },
          { 10, new PitchClass(10, 'B', Accidental.FLAT) },
          { 11, new PitchClass(11, 'C', Accidental.FLAT) },
        };

    /// <summary>
    /// Find a value by its human-readable letter name, case insensitive.
    /// </summary>
    /// <param name="key">A string in the letter name convention. Ex.'C#'</param>
    /// <returns>A <c>Pitch</c> representation of the passed letter PitchClass</returns>
    /// <exception cref="ArgumentException">When passed a string that cannot be parsed as a pitch</exception>
    public static PitchClass GetValue(string key)
    {

      string pattern = @"^[A-G][#b]?$";
      var r = new Regex(pattern);
      var match = r.Match(key);
      if (match.Success == false || key.Length > 2) throw new ArgumentException("Expected key in the form of [A-g][#b]?.");

      char accidental = key.Length > 1 ? key[1] : ' ';
      switch (accidental)
      {
        case '#':
          return _sharps.Select(p => p.Value).Where(p => p.LetterClass == key).Single();
        case 'b':
          return _flats.Select(p => p.Value).Where(p => p.LetterClass == key).Single();
        default:
          return _naturals.Select(p => p.Value).Where(p => p.LetterClass == key).Single();
      }
    }

    /// <summary>
    /// Find a value by its integer class, defaulting to the sharp spelling if it is an accidental.
    /// </summary>
    /// <param name="pitchClass">The integer representation of the pitch class</param>
    /// <param name="accidental">The <c>Accidental</c> to spell accidental notes with. Defaults to <c>Accidental.SHARP.</param>
    /// <returns>A <c>Pitch</c> representation of the pitch class for the given integer</returns>
    /// <exception cref="IndexOutOfRangeException">When passed an invalid pitch class integer.</exception>
    /// <exception cref="KeyNotFoundException">If no result is found by the passed key, despite being passed a valid integer value</exception>
    public static PitchClass GetValue(int pitchClass, Accidental accidental = Accidental.SHARP)
    {
      if (pitchClass > 11 || pitchClass < 0) throw new IndexOutOfRangeException("Expected pitch class index between [0..12]");
      PitchClass result;
      var found = _naturals.TryGetValue(pitchClass, out result);
      if (!found)
      {
        switch (accidental)
        {
          case Accidental.SHARP:
            found = _sharps.TryGetValue(pitchClass, out result);
            break;
          case Accidental.FLAT:
            found = _flats.TryGetValue(pitchClass, out result);
            break;
          default:
            result = null;
            break;
        }
      }
      return found == true ? result : throw new KeyNotFoundException();
    }
  }
}
