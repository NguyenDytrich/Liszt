using System;
using System.Collections;
using System.Collections.Generic;
using Liszt.Quiz.Answers;
using Xunit;

namespace Liszt.Tests
{
    public class PitchClass_AccessorTests
    {
        Pitches Pitches = new Pitches();

        [Theory]
        [InlineData("C", 0)]
        [InlineData("D", 2)]
        [InlineData("E", 4)]
        [InlineData("F", 5)]
        [InlineData("G", 7)]
        [InlineData("A", 9)]
        [InlineData("B", 11)]
        public void GetNaturalsTest_Accessor(string pitch, int expected)
        {
            Assert.Equal(Pitches[pitch].IntegerClass, expected);
        }

        [Theory]
        [InlineData("C", 0)]
        [InlineData("D", 2)]
        [InlineData("E", 4)]
        [InlineData("F", 5)]
        [InlineData("G", 7)]
        [InlineData("A", 9)]
        [InlineData("B", 11)]
        public void GetNaturalsTest_Method(string pitch, int expected)
        {
            Assert.Equal(Pitches.GetValue(pitch).IntegerClass, expected);
        }

        [Theory]
        [InlineData("B#", 0)]
        [InlineData("C#", 1)]
        [InlineData("D#", 3)]
        [InlineData("E#", 5)]
        [InlineData("F#", 6)]
        [InlineData("G#", 8)]
        [InlineData("A#", 10)]
        public void GetSharps_Accessor(string pitch, int expected)
        {
            Assert.Equal(Pitches[pitch].IntegerClass, expected);
        }

        [Theory]
        [InlineData("B#", 0)]
        [InlineData("C#", 1)]
        [InlineData("D#", 3)]
        [InlineData("E#", 5)]
        [InlineData("F#", 6)]
        [InlineData("G#", 8)]
        [InlineData("A#", 10)]
        public void GetSharps_Method(string pitch, int expected)
        {
            Assert.Equal(Pitches.GetValue(pitch).IntegerClass, expected);
        }

        [Theory]
        [InlineData("Db", 1)]
        [InlineData("Eb", 3)]
        [InlineData("Fb", 4)]
        [InlineData("Gb", 6)]
        [InlineData("Ab", 8)]
        [InlineData("Bb", 10)]
        [InlineData("Cb", 11)]
        public void GetFlats(string pitch, int expected)
        {
            Assert.Equal(Pitches[pitch].IntegerClass, expected);
        }

        [Theory]
        [InlineData(0, "C")]
        [InlineData(1, "C#")]
        [InlineData(2, "D")]
        [InlineData(3, "D#")]
        [InlineData(4, "E")]
        [InlineData(5, "F")]
        [InlineData(6, "F#")]
        [InlineData(7, "G")]
        [InlineData(8, "G#")]
        [InlineData(9, "A")]
        [InlineData(10, "A#")]
        [InlineData(11, "B")]
        public void IntegerClassDefaultsNaturalOrSharps(int pitchClass, string expected)
        {
            var a = Pitches[pitchClass];
            Assert.Equal(a.IntegerClass, pitchClass);
            Assert.Equal(a.LetterClass, expected);

            var m = Pitches.GetValue(pitchClass);
            Assert.Equal(m.IntegerClass, pitchClass);
            Assert.Equal(m.LetterClass, expected);
        }

        [Theory]
        [InlineData(0, "C")]
        [InlineData(1, "Db")]
        [InlineData(2, "D")]
        [InlineData(3, "Eb")]
        [InlineData(4, "E")]
        [InlineData(5, "F")]
        [InlineData(6, "Gb")]
        [InlineData(7, "G")]
        [InlineData(8, "Ab")]
        [InlineData(9, "A")]
        [InlineData(10, "Bb")]
        [InlineData(11, "B")]
        public void IntegerClassAccesorGetsFlats(int pitchClass, string expected)
        {
            var a = Pitches[pitchClass, Accidental.FLAT];
            Assert.Equal(a.IntegerClass, pitchClass);
            Assert.Equal(a.LetterClass, expected);

            var m = Pitches.GetValue(pitchClass, Accidental.FLAT);
            Assert.Equal(m.IntegerClass, pitchClass);
            Assert.Equal(m.LetterClass, expected);
        }

        [Theory]
        [ClassData(typeof(PitchClassAccessorData))]
        public void AccessorRegexTest(bool throws, string key)
        {
            if (throws)
            {
                Assert.Throws<ArgumentException>(() => Pitches[key]);
            }
            else
            {
                Assert.Equal(Pitches[key].LetterClass.ToUpper(), key.ToUpper());
            }
        }

        [Fact]
        public void AccessorIntegerTest()
        {
            for (var i = 0; i < 11; i++)
            {
                Assert.IsType<Pitch>(Pitches[i]);
            }

            for (var i = -100; i < 0; i++)
            {
                Assert.Throws<IndexOutOfRangeException>(() => Pitches[i]);
            }

            for (var i = 12; i < 100; i++)
            {
                Assert.Throws<IndexOutOfRangeException>(() => Pitches[i]);
            }
        }
    }

    class PitchClassAccessorData : IEnumerable<object[]>
    {
        private static List<string> _stringThrows = new List<string> {
            "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "ca", "h#", "jjj", "Hb",
            "c", "d", "e", "f", "g", "a", "b",
            "c#", "d#", "e#", "f#", "g#", "a#", "b#",
            "cb", "db", "eb", "fb", "gb", "ab", "bb",
        };

        private static List<string> _stringPass = new List<string> {
            "C", "D", "E", "F", "G", "A", "B",
            "C#", "D#", "E#", "F#", "G#", "A#", "B#",
            "Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"
        };

        private List<object[]> combine()
        {
            var combined = new List<object[]>();
            foreach (var v in _stringThrows)
            {
                combined.Add(new object[] { true, v });
            }
            foreach (var v in _stringPass)
            {
                combined.Add(new object[] { false, v });
            }
            return combined;
        }

        public IEnumerator<object[]> GetEnumerator()
        {
            var combined = combine();
            return combined.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator() => this.GetEnumerator();
    }
}