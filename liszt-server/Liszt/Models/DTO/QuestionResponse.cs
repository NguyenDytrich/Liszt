﻿using System;
using Google.Cloud.Firestore;
using Liszt.Converters;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Prompts;
using Liszt.Quiz.Questions;
using Liszt.Models;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Liszt.Models.DTO
{
  public class QuestionResponse<Q, P, A>
    where A : Answer<A>
    where Q : Question<P>
    where P : Prompt
  {
    public DateTime SubmittedAt { get; set; }

    public DateTime RecievedAt { get; set; }

    public Q Question { get; set; }
    public A SubmittedAnswer { get; set; }

    public TimeSpan DwellTime => SubmittedAt - RecievedAt;
    public bool Correct { get; set; }

    /// <summary>
    /// Converts a typed <c>QuestionResponse</c> into a JSON-serializable object for
    /// Firestore.
    /// </summary>
    /// <returns></returns>
    public FirestoreQuestionResponse ToFirestore() => new FirestoreQuestionResponse
    {
      SubmittedAt = SubmittedAt,
      RecievedAt = RecievedAt,
      Correct = Correct,
      Question = JsonSerializer.SerializeToNode(Question, new JsonSerializerOptions
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      }),
      SubmittedAnswer = JsonSerializer.SerializeToNode(SubmittedAnswer, new JsonSerializerOptions
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      })
    };
  }
}
