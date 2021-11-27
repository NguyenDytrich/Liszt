using System;
using Google.Cloud.Firestore;

namespace Liszt
{
    [FirestoreData]
    public class WeatherForecast
    {
        [FirestoreProperty("date")]
        private Timestamp _timestamp { get; set; }

        public DateTime Date => _timestamp.ToDateTime();

        [FirestoreProperty]
        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        [FirestoreProperty]
        public string Summary { get; set; }
    }
}
