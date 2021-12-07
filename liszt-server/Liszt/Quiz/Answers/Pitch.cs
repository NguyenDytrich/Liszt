namespace Liszt.Quiz.Answers
{
  public class Pitch : Answer<Pitch>
  {
    public override string Type { get => "pitch"; }
    public override string Id { get => Name; }
    public PitchClass PitchClass { get; }
    public int Octave { get; }
    public string LetterClass { get => PitchClass.LetterClass; }

    /// <value>The name of this pitch using Scientific Pitch Notation</value>
    public string Name { get => $"{LetterClass}{Octave}"; }

    public Pitch(PitchClass pitchClass, int octave)
    {
      PitchClass = pitchClass;
      Octave = octave;
    }

    public override bool Equals(Pitch answer)
    {
      return Name == answer.Name;
    }
  }
}