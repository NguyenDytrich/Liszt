using System;
using Google.Cloud.Firestore;
using Liszt.Models.Questions;

namespace Liszt.Models
{
    [FirestoreData]
    public class QuestionResponse<T> where T : Question
    {
        [FirestoreProperty]
        public string UserId { get; set; }

        [FirestoreProperty("type")]
        private string _type { get; set; }
        public string Type => nameof(T);

        /// <value>Property <c>FlashQuestion</c> is an embedded document of the question corresponding
        /// to this response.
        /// <seealso cref="FlashQuestion"/>
        [FirestoreProperty]
        public T Question { get; set; }

        [FirestoreProperty("submittedAt")]
        private Timestamp _submittedAt { get; set; }

        [FirestoreProperty("recievedAt")]
        private Timestamp _recievedAt { get; set; }

        [FirestoreProperty]
        public bool Correct { get; set; }

        public DateTime SubmittedAt => _submittedAt.ToDateTime();
        public DateTime RecievedAt => _recievedAt.ToDateTime();
        public TimeSpan DwellTime => SubmittedAt - RecievedAt;
    }
}