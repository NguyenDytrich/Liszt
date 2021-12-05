using System;
using System.Collections.Generic;
using System.Text.Json.Nodes;
using Google.Cloud.Firestore;
using Liszt.Quiz.Answers;

namespace Liszt.Converters
{
  /// <summary>
  /// A converter class for converting JSON to a <c>PitchClass</c>
  /// </summary>
  public class PitchClassConverter
  {
    public static PitchClass FromJson(JsonNode value)
    {
      if(value is null) {
        return null;
      }

      return PitchClasses.GetValue((string)value["letterClass"]);
    }
  }
}
