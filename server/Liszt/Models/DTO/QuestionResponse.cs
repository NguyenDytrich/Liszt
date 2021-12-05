using System;
using Google.Cloud.Firestore;
using Liszt.Converters;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Questions;
using Liszt.Models;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Liszt.Models.DTO
{
  public class QuestionResponse<Q, A>
    where A : Answer<A>
    where Q : Question
  {
    public string UserId { get; set; }

    public DateTime SubmittedAt { get; set; }

    public DateTime RecievedAt { get; set; }

    public Q Question { get; set; }
    public A SubmittedAnswer { get; set; }

    public TimeSpan DwellTime => SubmittedAt - RecievedAt;

    public FirestoreQuestionResponse ToFirestore() => new FirestoreQuestionResponse {
      UserId = UserId,
      SubmittedAt = SubmittedAt,
      RecievedAt = RecievedAt,
      Question = JsonSerializer.SerializeToNode(Question, new JsonSerializerOptions {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      }),
      SubmittedAnswer = JsonSerializer.SerializeToNode(SubmittedAnswer, new JsonSerializerOptions {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      })
    };
  }
}
