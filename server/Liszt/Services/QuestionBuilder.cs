using System;
using System.Collections.Generic;
using System.Linq;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Questions;

namespace Liszt.Services
{
  /// <summary>
  /// Class <c>QuestionBuilder</c> provides a builds questions from
  /// complementary question-answer pairs, e.g. A is the answer to B, and B is the answer
  /// to A. The nature of this class allows multiple of the same type category of information,
  /// for example "note recognition" to be generated easily without storing discrete permutations.
  /// </summary>
  public class QuestionBuilder<T> where T : Answer<T>
  {
    private List<T> _optionPool;
    private string _baseUri;
    public QuestionBuilder(string baseUri)
    {
      _baseUri = baseUri;
      _optionPool = new List<T>();
    }

    /// <summary>
    /// Method <c>AddOption</c> adds an option to this object's <c>_optionPool</c>.
    /// </summary>
    public void AddOption(T option)
    {
      _optionPool.Add(option);
    }

    public void AddOptions(IEnumerable<T> options)
    {
      foreach (var o in options)
      {
        _optionPool.Add(o);
      }
    }

    /// <summary>
    /// Method <c>RemoveOption</c> removes an answer from this object's <c>_optionPool</c> dictionary.
    /// <exception cref="ArgumentOutOfRangeException">They option does not exist</exception>
    /// </summary>
    public void RemoveOption(T option)
    {
      var val = _optionPool.IndexOf(option);
      if (val == -1)
        throw new ArgumentOutOfRangeException($"No option {option} found in pool.");

      _optionPool.Remove(option);
    }

    /// <summary>
    /// Method <c>RemoveOptions</c> removes a set of key-value pairs from this object's <c>_optionPool</c> dictionary.
    /// </summary>
    public void RemoveOptions(IEnumerable<T> options)
    {
      foreach (var o in options)
      {
        try
        {
          RemoveOption(o);
        }
        catch (ArgumentOutOfRangeException)
        {
          continue;
        }
      }
    }

    /// <summary>
    /// Method <c>Random</c> creates a MultipleChoice question from a random selection of <c>num</c>
    /// options.
    /// <param name="prompt">The text to display for the question</param>
    /// <param name="num">The number of options to have. Defaults to 4.</param>
    /// </summary>
    public MultipleChoice<T> Random(string prompt, int num = 4)
    {
      var rand = new Random();
      var options = new List<T>();

      // Select a random index as an answer
      int answerIndex = rand.Next(_optionPool.Count);
      T answer = _optionPool[answerIndex];

      // Select some other non-answer options
      // selectedIndices keeps track of the potential answers we might have
      var selectedIndices = new List<int>();
      while (options.Count < num - 1)
      {
        var j = rand.Next(_optionPool.Count);
        if (j != answerIndex && !selectedIndices.Contains(j))
        {
          options.Add(_optionPool[j]);
          selectedIndices.Add(j);
        }
      }

      // Shuffle our options deck
      List<T> shuffledOptions = options.OrderBy(a => rand.Next()).ToList();

      // Cast our result to our new flash question
      return new MultipleChoice<T>()
      {
        Id = $"{_baseUri}/{_optionPool[answerIndex].Id}",
        Prompt = prompt,
        OptionPool = shuffledOptions,
        Answer = answer
      };
    }
  }
}
