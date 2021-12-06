using System;
using System.Collections.Generic;
using System.Text.Json.Nodes;
using Liszt.Models.DTO;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Questions;

namespace Liszt.Converters
{
  /// <summary>
  /// Converter for converting from a QuizResponse DTO to a typed <c>QuestionResponse</c>.
  /// </summary>
  public class MultipleChoiceConverter
  {
    /// <summary>
    /// Deserialize the "question" and "answer" JSON properties from a QuizResponse DTO
    /// </summary>
    /// <param name="response">The passed QuizResponse</param>
    /// <typeparam name="T">The expected type for the potential answers in the "optionPool" property</typeparam>
    /// <returns>A typed <c>QuestionResponse</c> object</returns>
    /// <exception cref="ArgumentException">When T is not a valid type for this response</exception>
    public static QuestionResponse<MultipleChoice<T>, T> FromDTO<T>(AnswerSubmission response) where T : Answer<T>
    {
      var questionData = QuestionDataFromJson<T>(response.Question);

      T answer;
      switch ((string)response.SubmittedAnswer["type"])
      {
        case "pitch_class":
          answer = PitchClassConverter.FromJson(response.SubmittedAnswer) as T;
          break;
        default:
          throw new ArgumentException();
      };

      return new QuestionResponse<MultipleChoice<T>, T>
      {
        UserId = response.UserId,
        SubmittedAt = response.SubmittedAt,
        RecievedAt = response.RecievedAt,
        Question = questionData,
        SubmittedAnswer = answer
      };
    }

    /// <exception cref="ArgumentException">When T is not a valid type for this response</exception>
    private static MultipleChoice<T> QuestionDataFromJson<T>(JsonNode question) where T : Answer<T>
    {
      var optionPool = new List<T>();
      foreach (JsonNode o in question["optionPool"].AsArray())
      {
        switch ((string)o["type"])
        {
          case "pitch_class":
            var pc = PitchClassConverter.FromJson(o);
            optionPool.Add(pc as T);
            break;
          default:
            throw new ArgumentException();
        };
      }

      return new MultipleChoice<T>()
      {
        Id = (string)question["id"],
        Prompt = (string)question["prompt"],
        OptionPool = optionPool,
        Answer = PitchClassConverter.FromJson(question["answer"]) as T
      };
    }
  }
}
