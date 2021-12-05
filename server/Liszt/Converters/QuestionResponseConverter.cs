using System;
using System.Collections.Generic;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;
using Liszt.Models;
using Liszt.Quiz.Answers;

namespace Liszt.Converters
{
  /// <summary>
  /// Firestore converter class for <c>FirestoreQuestionResponse</c>
  /// </summary>
  public class QuestionResponseConverter : IFirestoreConverter<FirestoreQuestionResponse>
  {
    public object ToFirestore(FirestoreQuestionResponse value)
    {
      string questionType = (string)value.Question["type"];

      object answer = ConvertToAnswer(value.SubmittedAnswer);
      object questionData;

      switch (questionType)
      {
        case "multiple_choice":
          var optionPool = new List<object>();
          foreach (var o in value.Question["optionPool"].AsArray())
          {
            var a = ConvertToAnswer(o);
            if(a != null)
              optionPool.Add(a);
          }

          questionData = new
          {
            Id = (string)value.Question["id"],
            Type = (string)value.Question["type"],
            Prompt = (string)value.Question["prompt"],
            OptionPool = optionPool,
            Answer = ConvertToAnswer(value.Question["answer"])
          };
          break;
        default:
          throw new ArgumentException($"Unkown type: {questionType} for object {value.Question.ToJsonString()}");
      }

      return new
      {
        UserId = value.UserId,
        Correct = value.Correct,
        SubmittedAt = value.SubmittedAt,
        RecievedAt = value.RecievedAt,
        DwellTimeSeconds = (value.SubmittedAt - value.RecievedAt).TotalSeconds,
        SubmittedAnswer = answer,
        Question = questionData
      };
    }

    public FirestoreQuestionResponse FromFirestore(object value)
    {
      object answer;
      CastAnswerFromObject<PitchClass>(value, out answer);

      throw new NotImplementedException();
    }

    private object ConvertToAnswer(JsonNode value)
    {
      if(value is null) return null;

      string answerType = (string)value["type"];
      switch (answerType)
      {
        case "pitch_class":
          return new
          {
            Type = (string)value["type"],
            IntegerClass = (int)value["integerClass"],
            LetterClass = (string)value["letterClass"]
          };
        default:
          throw new ArgumentException($"Unknown type: {answerType} in object {value.ToJsonString()}");
      };
    }

    private bool CastAnswerFromObject<T>(object value, out object result)
    {
      throw new NotImplementedException();
    }
  }
}
