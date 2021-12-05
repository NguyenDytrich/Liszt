using System;
using Google.Cloud.Firestore;
using Liszt.Models.Answers;

namespace Liszt.Converters {
  public class PitchConverter : IFirestoreConverter<Pitch>
  {
    public object ToFirestore(Pitch value) => new {
        Type = value.Type,
        IntegerClass = value.IntegerClass,
        LetterClass = value.LetterClass
    };

    public Pitch FromFirestore(object value) {
      throw new NotImplementedException();
    }
  }
}
