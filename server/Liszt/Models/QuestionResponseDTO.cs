using System;
using System.Diagnostics.Contracts;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;
using Liszt.Converters;

namespace Liszt.Models
{
  [FirestoreData(ConverterType = typeof(QuestionResponseConverter))]
  public class QuestionResponseDTO
  {
    public string UserId { get; set; }

    public bool Correct { get; set; }

    public DateTime SubmittedAt { get; set; }

    public DateTime RecievedAt { get; set; }

    public JsonNode Question { get; set; }

    public JsonNode SubmittedAnswer { get; set; }
  }
}
