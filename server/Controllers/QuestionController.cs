using System.Collections.Generic;
using Liszt.Models.Answers;
using Liszt.Models.Questions;
using Liszt.Services;
using Microsoft.AspNetCore.Mvc;

namespace Liszt.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class QuestionController : ControllerBase
  {
    private readonly IFirestoreDb _firestore;
    private readonly QuestionBuilder<Pitch> PitchQuiz;

    public QuestionController(IFirestoreDb firestore)
    {
      _firestore = firestore;
      PitchQuiz = new QuestionBuilder<Pitch>("note_recognition/notation");

      var pitchopts = new List<Pitch>() {
                                new Pitch(0, 'C', Accidental.NATURAL),
                                new Pitch(1, 'C', Accidental.SHARP),
                                new Pitch(2, 'D', Accidental.NATURAL),
                                new Pitch(3, 'D', Accidental.SHARP),
                        };

      PitchQuiz.AddOptions(pitchopts);
    }

    [HttpGet("pitch")]
    public IEnumerable<MultipleChoice<Pitch>> Get()
    {
      var questions = new List<MultipleChoice<Pitch>>();
      for (int i = 0; i < 20; i++)
      {
        questions.Add(PitchQuiz.Random("Identify the following pitch."));
      }
      return questions;
    }
  }
}
