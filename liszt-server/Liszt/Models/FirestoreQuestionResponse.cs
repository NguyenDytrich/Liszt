using System;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;
using Liszt.Converters.Firestore;

namespace Liszt.Models
{
  /// <summary>
  /// A DTO for storing and retrieving documents in Firestore
  /// </summary>
  [FirestoreData]
  public class FirestoreQuestionResponse
  {
    [FirestoreProperty]
    public bool Correct { get; set; }

    [FirestoreProperty]
    public DateTime SubmittedAt { get; set; }

    [FirestoreProperty]
    public DateTime RecievedAt { get; set; }

    [FirestoreProperty(ConverterType = typeof(FirestoreQuestionConverter))]
    public JsonNode Question { get; set; }

    [FirestoreProperty(ConverterType = typeof(FirestoreAnswerConverter))]
    public JsonNode SubmittedAnswer { get; set; }

    /// <value>Time spent on a this quesiton</value>
    public double DwellTimeSeconds => (SubmittedAt - RecievedAt).TotalSeconds;
  }
}
