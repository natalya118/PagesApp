using Scheduler.API.ViewModels.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.API.ViewModels
{

    public class RelatedPages
    {
        public int Id { get; set; }

        public int Page1Id { get; set; }

        public int Page2Id { get; set; }
    }
}