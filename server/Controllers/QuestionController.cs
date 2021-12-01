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
                                new Pitch() { Id = "C", IntegerClass = 0, LetterClass = {"C"} },
                                new Pitch() { Id = "C#", IntegerClass = 1, LetterClass = {"C#", "Db"} },
                                new Pitch() { Id = "D", IntegerClass = 2, LetterClass = {"D"} },
                                new Pitch() { Id = "D#", IntegerClass = 3, LetterClass = {"D#", "Eb"} },
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
