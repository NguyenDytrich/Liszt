using System;
using System.Data.Common;

namespace Liszt.Models.Answers
{
  public abstract class Answer<T>: IEquatable<T>
  {
    public string Id;
    public override string ToString() => Id;

    public override bool Equals(object o) {
      if (o.GetType() != typeof(T)) {
        throw new ArgumentException($"Cannot compare type of {o.GetType()} to type of {typeof(T)}");
      }
      return Equals((T)o);
    }

    public abstract bool Equals(T answer);
    public static bool operator ==(Answer<T> lhs, Answer<T> rhs) {
      if(lhs is null) {
        if(rhs is null) {
          return true;
        }
        return false;
      }
      return lhs.Equals(rhs);
    }
    public static bool operator !=(Answer<T> lhs, Answer<T> rhs) => !(lhs == rhs);

    public override int GetHashCode()
    {
      return Id.GetHashCode();
    }
  }
}
