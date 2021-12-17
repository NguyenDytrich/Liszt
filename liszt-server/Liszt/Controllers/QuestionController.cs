using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Liszt.Converters;
using Liszt.Models;
using Liszt.Models.DTO;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Prompts;
using Liszt.Quiz.Questions;
using Liszt.Quiz.Builders;
using Liszt.Services;
using Microsoft.AspNetCore.Mvc;

namespace Liszt.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class QuestionController : ControllerBase
  {
    private readonly IFirestoreDb _firestore;
    private readonly SingleNoteRecognition PitchQuiz;

    public QuestionController(IFirestoreDb firestore)
    {
      _firestore = firestore;
      PitchQuiz = new SingleNoteRecognition("note_recognition/notation/pitch");

      var pitchopts = new List<PitchClass>() {
        PitchClasses.GetValue("C"),
        PitchClasses.GetValue("D"),
        PitchClasses.GetValue("E"),
        PitchClasses.GetValue("F"),
        PitchClasses.GetValue("G"),
        PitchClasses.GetValue("A"),
        PitchClasses.GetValue("B")
      };

      PitchQuiz.AddOption(pitchopts);
    }

    [HttpGet("pitch")]
    public IEnumerable<MultipleChoice<Notation, PitchClass>> Get([FromQuery] int count = 1)
    {
      var questions = new List<MultipleChoice<Notation, PitchClass>>();
      for (int i = 0; i < count; i++)
      {
        questions.Add(PitchQuiz.Random());
      }
      return questions;
    }
  }
}
