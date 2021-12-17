using System;
using System.Collections.Generic;
using System.Linq;

namespace Liszt.Models
{
  public class QuizSubmission
  {
    public Guid QuizId { get; set; }
    public string UserId { get; set; }
    public DateTime SubmissionDate { get; set; }

    /// <value>
    /// Responses uses a collection of FirestoreQuestionResponses because
    /// they are JSON; one quiz can have multiple question types.
    /// </value>
    public ICollection<FirestoreQuestionResponse> Responses { get; set; }

    public int TotalQuestions => Responses.Count();
    public int TotalCorrect => Responses.Select(r => r.Correct).Where(c => c).Count();
    public double Accuracy => (double)TotalCorrect / (double)Responses.Count();
    public double AverageDwellTime => Responses.Select(r => r.DwellTimeSeconds).Sum() / Responses.Count();

    public FirestoreQuiz ToFirestore() => new FirestoreQuiz()
    {
      QuizId = QuizId.ToString(),
      UserId = UserId,
      SubmissionDate = SubmissionDate.ToUniversalTime(),
      Responses = Responses,
      Metadata = new FirestoreQuizMetadata() {
        TotalQuestions = TotalQuestions,
        TotalCorrect = TotalCorrect,
        Accuracy = Accuracy,
        AverageDwellTime = AverageDwellTime
      }
    };
  }
}
