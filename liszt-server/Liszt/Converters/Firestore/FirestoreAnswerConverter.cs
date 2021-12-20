using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;

namespace Liszt.Converters.Firestore
{
  public class FirestoreAnswerConverter : IFirestoreConverter<JsonNode>
  {

    public object ToFirestore(JsonNode value)
    {
      if (value is null) return null;
      string answerType = (string)value["type"];

      switch (answerType)
      {
        case "pitch_class":
          return ConvertPitchClass(value);
        default:
          throw new ArgumentException($"Unknown type: {answerType} in object {value.ToJsonString()}");
      };
    }

    public JsonNode FromFirestore(object value)
    {
      if (value is IDictionary<string, object> map)
      {
        return JsonSerializer.SerializeToNode(map);
      }
      throw new ArgumentException($"Unknown type: {value.GetType()}");
    }

    private object ConvertPitchClass(JsonNode value) => new
    {
      Type = (string)value["type"],
      IntegerClass = (int)value["integerClass"],
      LetterClass = (string)value["letterClass"]
    };
  }
}
