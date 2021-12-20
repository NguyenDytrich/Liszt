using System;
using System.Collections.Generic;

namespace Liszt.Models.DTO
{
  public class QuizSubmissionArgs
  {
    public string UserId { get; set; }
    public DateTime? SubmissionDate { get; set; }
    public ICollection<AnswerSubmission> Responses { get; set; }
  }
}
