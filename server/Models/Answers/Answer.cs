using System.Data.Common;

namespace Liszt.Models.Answers {
    public abstract class Answer {
        public string Id;

        public abstract override string ToString();
    }
}