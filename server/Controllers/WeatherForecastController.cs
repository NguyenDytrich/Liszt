using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Liszt.Services;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Liszt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IFirestoreDb _firestore;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IFirestoreDb firestore)
        {
            _logger = logger;
            _firestore = firestore;

        }

        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            var result = new List<WeatherForecast>();
            Query weatherQuery = _firestore.Collection("weather_test");
            QuerySnapshot weatherQuerySnapshot = await weatherQuery.GetSnapshotAsync();
            foreach (var snapshot in weatherQuerySnapshot.Documents)
            {
                result.Add(snapshot.ConvertTo<WeatherForecast>());
            }
            return result;
        }
    }
}
