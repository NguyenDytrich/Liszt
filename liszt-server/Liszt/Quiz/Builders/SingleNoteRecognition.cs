using System;
using System.Linq;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Prompts;
using Liszt.Quiz.Questions;

namespace Liszt.Quiz.Builders
{
  public class SingleNoteRecognition : AnswerPool<PitchClass>
  {
    public SingleNoteRecognition(string baseUri) : base(baseUri) {}

    public MultipleChoice<Notation, PitchClass> Random(string prompt = "Identify the following pitch.") {
      var rand = new Random();
      // Get some a random set of options
      var answerOptions = RandomAnswerOptions();

      // TODO: 
      // Choose various octaves for the display pitch
      // Without doing so, the range will be from A4 - D4

      var _prompt = new Notation() {
        DisplayText = prompt,
        ABCString = $"{answerOptions.Answer.LetterClass}2|]"
      };

        //prompt = (prompt as Notation).ABCString = "C2|]";

      // Cast our result to our new flash question
      return new MultipleChoice<Notation, PitchClass>()
      {
        // TODO:
        // See above for magic "4" at the end of this formatted string.
        Id = $"{_baseUri}/{answerOptions.Answer.LetterClass}4",
        Prompt = _prompt,
        OptionPool = answerOptions.Options.ToList(),
        Answer = answerOptions.Answer,
      };
    }
  }
}
