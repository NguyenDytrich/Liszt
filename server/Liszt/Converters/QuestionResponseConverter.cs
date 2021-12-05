using System;
using System.Collections.Generic;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;
using Liszt.Models;
using Liszt.Quiz.Answers;

namespace Liszt.Converters
{
  public class QuestionResponseConverter : IFirestoreConverter<QuestionResponseDTO>
  {
    private static readonly Pitches Pitches = new Pitches();
    public object ToFirestore(QuestionResponseDTO value)
    {
      string questionType = (string)value.Question["Type"];

      object answer = ConvertToAnswer(value.SubmittedAnswer);
      object questionData;

      switch (questionType)
      {
        case "multiple_choice":
          var optionPool = new List<object>();
          foreach (var o in value.Question["optionPool"].AsArray())
          {
            optionPool.Add(ConvertToAnswer(o));
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
          throw new NotSupportedException();
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

    public QuestionResponseDTO FromFirestore(object value)
    {
      object answer;
      CastAnswerFromObject<Pitch>(value, out answer);

      throw new NotImplementedException();
    }

    private object ConvertToAnswer(JsonNode value)
    {
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
          throw new NotSupportedException();
      };
    }

    private bool CastAnswerFromObject<T>(object value, out object result)
    {
      throw new NotImplementedException();
    }
  }
}
