using Liszt.Models.Answers;
using Xunit;

namespace Liszt.Tests
{
    public class PitchClass_AccessorTests
    {
        PitchClass PitchClass = new PitchClass();

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
            Assert.Equal(PitchClass[pitch].IntegerClass, expected);
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
            Assert.Equal(PitchClass.GetValue(pitch).IntegerClass, expected);
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
            Assert.Equal(PitchClass[pitch].IntegerClass, expected);
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
            Assert.Equal(PitchClass.GetValue(pitch).IntegerClass, expected);
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
            Assert.Equal(PitchClass[pitch].IntegerClass, expected);
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
            var a = PitchClass[pitchClass];
            Assert.Equal(a.IntegerClass, pitchClass);
            Assert.Equal(a.LetterClass, expected);

            var m = PitchClass.GetValue(pitchClass);
            Assert.Equal(m.IntegerClass, pitchClass);
            Assert.Equal(m.LetterClass, expected);
        }
    }
}