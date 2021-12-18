using System;
using System.Collections.Generic;
using System.Text.Json.Nodes;
using Liszt.Models.DTO;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Prompts;
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
    public static QuestionResponse<MultipleChoice<P, T>, P, T> FromDTO<P, T>(AnswerSubmission response)
      where T : Answer<T>
      where P : Prompt
    {
      var questionData = QuestionDataFromJson<P, T>(response.Question);

      T answer;
      switch ((string)response.SubmittedAnswer["type"])
      {
        case "pitch_class":
          answer = PitchClassConverter.FromJson(response.SubmittedAnswer) as T;
          break;
        default:
          throw new ArgumentException();
      };

      return new QuestionResponse<MultipleChoice<P, T>, P, T>
      {
        SubmittedAt = response.SubmittedAt,
        RecievedAt = response.RecievedAt,
        Question = questionData,
        SubmittedAnswer = answer
      };
    }

    /// <exception cref="ArgumentException">When T is not a valid type for this response</exception>
    private static MultipleChoice<P, T> QuestionDataFromJson<P, T>(JsonNode question)
      where T : Answer<T>
      where P : Prompt
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

      P prompt;
      switch ((string)question["prompt"]["type"])
      {
        case "notation":
          prompt = new Notation()
          {
            DisplayText = (string) question["prompt"]["displayText"],
            MidiNotation = (string) question["prompt"]["midiNotation"]
          } as P;
          break;
        default:
          throw new ArgumentException(
            $"Unexpected value for property \"prompt.type\": {question["prompt"]["type"]}.");
      };

      return new MultipleChoice<P, T>()
      {
        Id = (string)question["id"],
        Prompt = prompt,
        OptionPool = optionPool,
        Answer = PitchClassConverter.FromJson(question["answer"]) as T
      };
    }
  }
}
