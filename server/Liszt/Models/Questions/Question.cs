﻿using Liszt.Models.Answers;

namespace Liszt.Models.Questions
{
  public abstract class Question
  {
    public string Id { get; set; }
    public string Prompt { get; set; }

    public abstract string Type { get; }
  }
}
