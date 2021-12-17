using System;
using System.Collections.Generic;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;
using Liszt.Converters;

namespace Liszt.Models
{
  /// <summary>
  /// A DTO for storing and retrieving Quiz documents in Firestore
  /// </summary>
  [FirestoreData]
  public class FirestoreQuiz
  {
    /// <value>The Guid of a quiz this question response belongs to</value>
    [FirestoreProperty]
    public string QuizId { get; set; }

    /// <value>The Uesr's id</value>
    [FirestoreProperty]
    public string UserId { get; set; }

    [FirestoreProperty]
    public ICollection<FirestoreQuestionResponse> Responses { get; set; }
  }
}
