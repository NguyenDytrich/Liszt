using System;
using System.Diagnostics.Contracts;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;
using Liszt.Converters;

namespace Liszt.Models
{
  /// <summary>
  /// A DTO for storing and retrieving documents in Firestore
  /// </summary>
  [FirestoreData(ConverterType = typeof(QuestionResponseConverter))]
  public class FirestoreQuestionResponse
  {
    public string UserId { get; set; }

    public bool Correct { get; set; }

    public DateTime SubmittedAt { get; set; }

    public DateTime RecievedAt { get; set; }

    public JsonNode Question { get; set; }

    public JsonNode SubmittedAnswer { get; set; }
  }
}
