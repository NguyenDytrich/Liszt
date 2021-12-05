using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Liszt.Models;
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
    private static readonly Pitches pitches = new Pitches();
    private readonly QuestionBuilder<Pitch> PitchQuiz;

    public QuestionController(IFirestoreDb firestore)
    {
      _firestore = firestore;
      PitchQuiz = new QuestionBuilder<Pitch>("note_recognition/notation");

      var pitchopts = new List<Pitch>() {
        pitches["C"],
        pitches["D"],
        pitches["E"],
        pitches["F"],
        pitches["G"],
        pitches["A"],
        pitches["B"]
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

    [HttpPost("answer")]
    public async Task Post(QuestionResponseDTO requestBody)
    {
      var reference = await _firestore.Collection($"question_responses").AddAsync(requestBody);
    }
  }
}
