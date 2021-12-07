using System;
using System.Collections.Generic;
using System.Linq;
using Liszt.Quiz.Answers;
using Liszt.Quiz.Prompts;
using Liszt.Quiz.Questions;
using Microsoft.AspNetCore.Components.Forms;

namespace Liszt.Quiz.Questions
{
  /// <summary>
  /// Class <c>OptionPool</c> provides an API to generate randomzied questions
  /// easily without storing discrete permutations.
  /// </summary>
  /// <typeparam name="T">The <c>Answer</c> type of this builder</typeparam>
  public abstract class AnswerPool<T>
    where T : Answer<T>
  {
    private List<T> _optionPool;
    protected string _baseUri;
    public AnswerPool(string baseUri)
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

    public void AddOption(IEnumerable<T> options)
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
    public void RemoveOption(IEnumerable<T> options)
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
    /// Shuffles the options from the option pool and randomly selects <c>count</c>
    /// </summary>
    /// <param name="count">The number of options to create. Defaults to 4.</param>
    protected List<T> RandomOptions(int count = 4)
    {
      var rand = new Random();
      var options = new List<T>();

      var selectedIndices = new List<int>();
      while (options.Count < count)
      {
        var i = rand.Next(_optionPool.Count);
        if (!selectedIndices.Contains(i))
        {
          options.Add(_optionPool[i]);
          selectedIndices.Add(i);
        }
      }

      return options.OrderBy(a => rand.Next()).ToList();
    }

    /// <summary>
    /// Method <c>Random</c> creates a MultipleChoice question from a random selection of <c>num</c>
    /// options.
    /// <param name="count">The number of options to have. Defaults to 4.</param>
    /// </summary>
    protected AnswerOptions<T> RandomAnswerOptions(int count = 4)
    {
      var rand = new Random();

      var options = RandomOptions(count);

      // Select a random index as an answer
      int answerIndex = rand.Next(options.Count);
      T answer = options[answerIndex];

      // Then remove this item from the options List
      options.RemoveAt(answerIndex);

      return new AnswerOptions<T>
      {
        Answer = answer,
        Options = options
      };
    }

  }

  /// <summary>
  /// A selection of 1 answer and a list of incorrect answers (options)
  /// </summary>
  public struct AnswerOptions<T>
  {
    public T Answer;
    public ICollection<T> Options;
  }
}
