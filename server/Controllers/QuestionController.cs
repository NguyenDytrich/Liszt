using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Liszt.Models;
using Liszt.Models.Answers;
using Liszt.Models.Questions;
using Liszt.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.Extensions.Logging;

namespace Liszt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly IFirestoreDb _firestore;
        public QuestionController(IFirestoreDb firestore)
        {
            _firestore = firestore;
        }

        [HttpGet("/pitch")]
        public IEnumerable<MultipleChoice<Pitch>> Get()
        {
            throw new NotImplementedException();
        }
    }
}