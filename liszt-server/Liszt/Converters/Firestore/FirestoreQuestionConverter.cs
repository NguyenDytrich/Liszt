using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;
using Liszt.Quiz.Prompts;

namespace Liszt.Converters.Firestore
{
  public class FirestoreQuestionConverter : IFirestoreConverter<JsonNode>
  {
    private static readonly FirestoreAnswerConverter answerConverter = new FirestoreAnswerConverter();
    public object ToFirestore(JsonNode value)
    {
      string type = (string)value["type"];
      object prompt = PromptConverter.Convert(value["prompt"]);

      var firestoreObj = new Dictionary<string, object>() {
        {"Id",  (string)value["id"]},
        {"Type" , (string)value["type"]},
        {"Prompt" , prompt},
      };

      switch (type)
      {
        case "multiple_choice":
          var optionPool = MultipleChoiceConverter.OptionPool(value["optionPool"].AsArray());
          firestoreObj.Add("OptionPool", optionPool);
          return firestoreObj;
        default:
          throw new ArgumentException($"Unknown type: {type} for object {value.ToJsonString()}");
      }
    }

    public JsonNode FromFirestore(object value)
    {
      if (value is IDictionary<string, object> map)
      {
        return JsonSerializer.SerializeToNode(value);
      }
      throw new ArgumentException($"Unknown type: {value.GetType()}");
    }

    protected static class MultipleChoiceConverter
    {
      /// <summary>
      /// Converts an OptionPool to a Firestore serializable object
      /// </summary>
      /// <param name="value">The JsonArray of options in OptionPool</param>
      /// <returns></returns>
      public static object OptionPool(JsonArray value)
      {
        return value.Select(o => answerConverter.ToFirestore(o))
        .Where(o => o != null)
        .ToList();
      }
    }

    protected static class PromptConverter
    {
      public static object Convert(JsonNode value)
      {
        string promptType = (string)value["type"];
        switch (promptType)
        {
          case "notation":
            return PromptConverter.Notation(value);
          default:
            throw new ArgumentException($"Unkown type: {promptType} in object {value.ToJsonString()}");
        }
      }
      private static object Notation(JsonNode value) => new
      {
        Type = (string)value["type"],
        DisplayText = (string)value["displayText"],
        ABCString = (string)value["abcString"]
      };
    }
  }
}
