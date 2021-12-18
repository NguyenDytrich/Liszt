using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Liszt.Converters;
using Liszt.Models;
using Liszt.Models.DTO;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Prompts;
using Liszt.Services;
using Microsoft.AspNetCore.Mvc;

namespace Liszt.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class QuizController : ControllerBase
  {
    private readonly IFirestoreDb _firestore;

    public QuizController(IFirestoreDb firestore)
    {
      _firestore = firestore;
    }

    /// <summary>
    /// Validates an array of submitted questions, then serializes it and stores it in Firestore
    /// </summary>
    /// <param name="requestBody"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<FirestoreQuiz> Post(QuizSubmissionArgs requestBody)
    // public async Task<QuizSubmission> Post(QuizSubmissionArgs requestBody)
    {
      var responses = new List<FirestoreQuestionResponse>();

      foreach (var s in requestBody.Responses)
      {
        var f = ConvertAnswer(s);
        responses.Add(f);
      }

      var quiz = new QuizSubmission()
      {
        QuizId = Guid.NewGuid(),
        UserId = requestBody.UserId,
        Responses = requestBody.Responses
                      .Select(r => ConvertAnswer(r))
                      .ToList(),
        SubmissionDate = requestBody.SubmissionDate.GetValueOrDefault(DateTime.Now),
      };

      var fsQuiz = quiz.ToFirestore();
      await _firestore.Collection("quizzes").AddAsync(fsQuiz);

      return fsQuiz;
    }

    [HttpGet]
    public async Task<ActionResult<FirestoreQuiz>> Get()
    {
      var docRef = await _firestore.Collection("quizzes").GetSnapshotAsync();
      var snapshot = docRef.FirstOrDefault();
      return snapshot.Exists ? snapshot.ConvertTo<FirestoreQuiz>() : NotFound();
    }

    private FirestoreQuestionResponse ConvertAnswer(AnswerSubmission submission)
    {
      var answerType = (string)submission.SubmittedAnswer["type"];
      var questionType = (string)submission.Question["type"];

      FirestoreQuestionResponse firestore;
      if (questionType == "multiple_choice" && answerType == "pitch_class")
      {
        var response = MultipleChoiceConverter.FromDTO<Notation, PitchClass>(submission);
        response.Correct = response.SubmittedAnswer == response.Question.Answer;
        firestore = response.ToFirestore();
      }
      else
      {
        throw new ArgumentException($"Invalid question-answer type pair: {questionType}, {answerType}");
      }
      return firestore;
    }
  }
}
