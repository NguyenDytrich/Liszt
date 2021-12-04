using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Liszt.Models.Answers
{
  /// <summary>
  /// A representation of possible pitch classes.
  /// </summary>
  public class Pitches
  {
    private static readonly IDictionary<int, Pitch> _naturals = new Dictionary<int, Pitch>() {
          { 0, new Pitch(0, 'C', Accidental.NATURAL) },
          { 2, new Pitch(2, 'D', Accidental.NATURAL) },
          { 4, new Pitch(4, 'E', Accidental.NATURAL) },
          { 5, new Pitch(5, 'F', Accidental.NATURAL) },
          { 7, new Pitch(7, 'G', Accidental.NATURAL) },
          { 9, new Pitch(9, 'A', Accidental.NATURAL) },
          { 11, new Pitch(11, 'B', Accidental.NATURAL) },
        };
    private static readonly IDictionary<int, Pitch> _sharps = new Dictionary<int, Pitch>() {
          { 0, new Pitch(0, 'B', Accidental.SHARP) },
          { 1, new Pitch(1, 'C', Accidental.SHARP) },
          { 3, new Pitch(3, 'D', Accidental.SHARP) },
          { 5, new Pitch(5, 'E', Accidental.SHARP) },
          { 6, new Pitch(6, 'F', Accidental.SHARP) },
          { 8, new Pitch(8, 'G', Accidental.SHARP) },
          { 10, new Pitch(10, 'A', Accidental.SHARP) },
        };
    private static readonly IDictionary<int, Pitch> _flats = new Dictionary<int, Pitch>() {
          { 1, new Pitch(1, 'D', Accidental.FLAT) },
          { 3, new Pitch(3, 'E', Accidental.FLAT) },
          { 4, new Pitch(4, 'F', Accidental.FLAT) },
          { 6, new Pitch(6, 'G', Accidental.FLAT) },
          { 8, new Pitch(8, 'A', Accidental.FLAT) },
          { 10, new Pitch(10, 'B', Accidental.FLAT) },
          { 11, new Pitch(11, 'C', Accidental.FLAT) },
        };

    public Pitch this[string key]
    {
      get => GetValue(key);
    }
    public Pitch this[int key]
    {
      get => GetValue(key);
    }

    public Pitch this[int key, Accidental accidental]
    {
      get => GetValue(key, accidental);
    }

    /// <summary>
    /// Find a value by its human-readable letter name, case insensitive.
    /// </summary>
    /// <param name="key">A string in the letter name convention. Ex.'C#'</param>
    /// <returns>A <c>Pitch</c> representation of the passed letter PitchClass</returns>
    /// <exception cref="ArgumentException">When passed a string that cannot be parsed as a pitch</exception>
    public static Pitch GetValue(string key)
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
    public static Pitch GetValue(int pitchClass, Accidental accidental = Accidental.SHARP)
    {
      if (pitchClass > 11 || pitchClass < 0) throw new IndexOutOfRangeException("Expected pitch class index between [0..12]");
      Pitch result;
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
