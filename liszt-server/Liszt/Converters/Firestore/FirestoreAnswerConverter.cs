using System;
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

    public JsonNode FromFirestore(object value) {
      throw new NotImplementedException();
    }

    private object ConvertPitchClass(JsonNode value) => new
    {
      Type = (string)value["type"],
      IntegerClass = (int)value["integerClass"],
      LetterClass = (string)value["letterClass"]
    };
  }
}
