using System;
using System.Collections.Generic;
using Liszt.Quiz.Answers;

namespace Liszt.Generators {
  public class RandomPitch {

    /// <value>Minimum octave of Pitch Class 0 (C)</value>
    private int minOctave;

    /// <value>Maximum octave of Pitch Class 0 (C)</value>
    private int maxOctave;

    public RandomPitch() {
      // Defaults to a range of middle C (C4) to C above treble clef (C6)
      minOctave = 4;
      maxOctave = 6;
    }

    public RandomPitch(int minOctave, int maxOctave) {
      this.minOctave = minOctave;
      this.maxOctave = maxOctave;
    }

    public Pitch One() {
      var rand = new Random();

      // Select a random octave and pitch class
      int octave = rand.Next(minOctave, maxOctave + 1);
      var pitchClass = PitchClasses.GetValue(rand.Next(0, 12));

      // If our random octave is the minimum, we need to account for A, Bb, and B
      // Since our octaves are indexed by C
      if(octave == minOctave && 9 < pitchClass.IntegerClass) octave++;
      return new Pitch(pitchClass, octave);
    }

    public IEnumerable<Pitch> Many(int count) {
      var pitches = new List<Pitch>();
      for(int i = 0; i < count; i++) {
        pitches.Add(One());
      }
      return pitches;
    }
  }
}