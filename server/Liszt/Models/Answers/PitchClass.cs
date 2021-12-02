using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Liszt.Models.Answers
{
    public class PitchClass
    {
        private static IDictionary<int, Pitch> _naturals = new Dictionary<int, Pitch>() {
          { 0, new Pitch(0, 'C', Accidental.NATURAL) },
          { 2, new Pitch(2, 'D', Accidental.NATURAL) },
          { 4, new Pitch(4, 'E', Accidental.NATURAL) },
          { 5, new Pitch(5, 'F', Accidental.NATURAL) },
          { 7, new Pitch(7, 'G', Accidental.NATURAL) },
          { 9, new Pitch(9, 'A', Accidental.NATURAL) },
          { 11, new Pitch(11, 'B', Accidental.NATURAL) },
        };
        private static IDictionary<int, Pitch> _sharps = new Dictionary<int, Pitch>() {
          { 0, new Pitch(0, 'B', Accidental.SHARP) },
          { 1, new Pitch(1, 'C', Accidental.SHARP) },
          { 3, new Pitch(3, 'D', Accidental.SHARP) },
          { 5, new Pitch(5, 'E', Accidental.SHARP) },
          { 6, new Pitch(6, 'F', Accidental.SHARP) },
          { 8, new Pitch(8, 'G', Accidental.SHARP) },
          { 10, new Pitch(10, 'A', Accidental.SHARP) },
        };
        private static IDictionary<int, Pitch> _flats = new Dictionary<int, Pitch>() {
          { 1, new Pitch(1, 'D', Accidental.FLAT) },
          { 3, new Pitch(3, 'E', Accidental.FLAT) },
          { 5, new Pitch(5, 'F', Accidental.FLAT) },
          { 6, new Pitch(6, 'G', Accidental.FLAT) },
          { 8, new Pitch(8, 'A', Accidental.FLAT) },
          { 10, new Pitch(10, 'B', Accidental.FLAT) },
          { 11, new Pitch(11, 'C', Accidental.FLAT) },
        };

        public Pitch this[string key]
        {
            get => GetValue(key);
        }

        /// <summary>
        /// Find a value by its human-readable letter name, case insensitive.
        /// </summary>
        /// <param name="key">A string in the letter name convention. Ex.'C#'</param>
        /// <returns></returns>
        public static Pitch GetValue(string key)
        {

            string pattern = @"^[a-gA-G][#b]?$";
            var r = new Regex(pattern);
            var match = r.Match(key);
            if (match == null || key.Length > 2) throw new ArgumentException("Expected key in the form of [a-gA-g][#b]?.");

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

        public static Pitch GetValue(int pitchClass, Accidental a = Accidental.SHARP)
        {
            Pitch result;
            try
            {
                _naturals.TryGetValue(pitchClass, out result);
            }
            catch
            {
                switch (a)
                {
                    case Accidental.SHARP:
                        _sharps.TryGetValue(pitchClass, out result);
                        break;
                    case Accidental.FLAT:
                        _sharps.TryGetValue(pitchClass, out result);
                        break;
                    default:
                        result = null;
                        break;
                }
            }
            return result != null ? result : throw new ArgumentNullException();
        }
    }
}
