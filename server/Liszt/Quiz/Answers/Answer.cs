using System;
using System.Data.Common;

namespace Liszt.Quiz.Answers
{
  public abstract class Answer<T>: IEquatable<T>
  {
    public abstract string Type { get; }
    public abstract string Id { get; }

    public override bool Equals(object o) {
      if(o is null) {
        return false;
      }

      if (o.GetType() != typeof(T)) {
        throw new InvalidOperationException($"Cannot compare type of {o.GetType()} to type of {typeof(T)}");
      }
      return Equals((T)o);
    }

    public abstract bool Equals(T answer);
    public static bool operator ==(Answer<T> lhs, object rhs) {
      if(lhs is null) {
        if(rhs is null) {
          return true;
        }
        return false;
      }
      return lhs.Equals(rhs);
    }
    public static bool operator !=(Answer<T> lhs, object rhs) => !(lhs == rhs);

    public override int GetHashCode()
    {
      return this.ToString().GetHashCode();
    }
  }
}
