using System;
using Google.Cloud.Firestore;
using Liszt.Converters;
using Liszt.Models.Answers;
using Liszt.Models.Questions;

namespace Liszt.Models
{
  public class QuestionResponse<Q, A>
    where A : Answer<A>
    where Q : Question
  {
    public string UserId { get; set; }

    public DateTime SubmittedAt { get; set; }

    public DateTime RecievedAt { get; set; }

    public QuestionData<Q, A> Question { get; set; }

    public TimeSpan DwellTime => SubmittedAt - RecievedAt;
  }

  public class QuestionData<Q, A>
    where Q : Question
    where A : Answer<A>
  {
    public string Id { get; set; }

    public A SubmittedAnswer { get; set; }

    public Q Question { get; set; }

    public bool Correct { get; set; }
  }
}
