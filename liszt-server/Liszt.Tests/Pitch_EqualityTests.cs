using System;
using System.Collections.Generic;
using Liszt.Quiz.Answers;
using Xunit;

namespace Liszt.Tests
{
    public class Pitch_EqualityTests
    {
        public static PitchClass p = new PitchClass(0, 'C', Accidental.NATURAL);
        public static PitchClass q = new PitchClass(1, 'C', Accidental.SHARP);

        [Fact]
        public void EqualsOperator_True()
        {
            var j = new PitchClass(0, 'C', Accidental.NATURAL);
            Assert.True(p == j);
        }

        [Fact]
        public void EqualsOperator_False()
        {
            Assert.False(p == q);
            Assert.True(p != q);
        }

        [Fact]
        public void EqualsOperator_Null()
        {
            Assert.False(p == null);
            Assert.True(p != null);
        }

        [Fact]
        public void EqualsMethod_True()
        {
            var j = new PitchClass(0, 'C', Accidental.NATURAL);
            Assert.True(p.Equals(j));
        }

        [Fact]
        public void EqualsMethod_False()
        {
            Assert.False(p.Equals(q));
            Assert.True(!p.Equals(q));
        }

        [Fact]
        public void EqualsOperator_InvalidArgument()
        {
            Assert.Throws<InvalidOperationException>(() => p == 2.0);
        }

        [Fact]
        public void EqualsMethod_InvalidArgument()
        {
            Assert.Throws<InvalidOperationException>(() => p.Equals(2.0));
        }

        [Fact]
        public void EqualsOperator_IntegerTrue() {
            Assert.True(p == 0);
            Assert.True(p != 1);
        }

        [Fact]
        public void EqualsMethod_IntegerTrue() {
            Assert.True(p.Equals(0));
            Assert.True(!p.Equals(1));
        }

        [Fact]
        public void EqualsOperator_IntegerFalse() {
            Assert.False(p == 1);
            Assert.False(p != 0);
        }

        [Fact]
        public void EqualsMethod_IntegerFalse() {
            Assert.False(p.Equals(1));
            Assert.False(!p.Equals(0));
        }
    }
}