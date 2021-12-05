using System;
using System.Collections.Generic;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using Liszt.Converters;
using Liszt.Models.DTO;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Questions;
using Liszt.Services;
using Microsoft.AspNetCore.Mvc;

namespace Liszt.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class QuestionController : ControllerBase
  {
    private readonly IFirestoreDb _firestore;
    private readonly QuestionBuilder<PitchClass> PitchQuiz;

    public QuestionController(IFirestoreDb firestore)
    {
      _firestore = firestore;
      PitchQuiz = new QuestionBuilder<PitchClass>("note_recognition/notation/pitch_class");

      var pitchopts = new List<PitchClass>() {
        PitchClasses.GetValue("C"),
        PitchClasses.GetValue("D"),
        PitchClasses.GetValue("E"),
        PitchClasses.GetValue("F"),
        PitchClasses.GetValue("G"),
        PitchClasses.GetValue("A"),
        PitchClasses.GetValue("B")
      };

      PitchQuiz.AddOptions(pitchopts);
    }

    [HttpGet("pitch")]
    public IEnumerable<MultipleChoice<PitchClass>> Get([FromQuery]int count = 1)
    {
      var questions = new List<MultipleChoice<PitchClass>>();
      for (int i = 0; i < count; i++)
      {
        questions.Add(PitchQuiz.Random("Identify the following pitch."));
      }
      return questions;
    }

    [HttpPost("answer")]
    public async Task Post(QuizResponse requestBody)
    {
      var answerType = (string) requestBody.SubmittedAnswer["type"];
      var questionType = (string) requestBody.Question["type"];

      if(questionType == "multiple_choice" && answerType == "pitch_class") {
        var response = MultipleChoiceConverter.FromDTO<PitchClass>(requestBody);
        var reference = await _firestore.Collection($"question_responses").AddAsync(response.ToFirestore());
        return;
      }
      throw new ArgumentException($"Invalid question-answer type pair: {questionType}, {answerType}");
    }
  }
}
