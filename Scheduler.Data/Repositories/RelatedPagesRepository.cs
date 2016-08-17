using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Model;
using Scheduler.Data;
using Scheduler.Data.Repositories;
using Scheduler.Data.Abstract;
using Pages.Models;

namespace Scheduler.Data.Repositories
{
    public class RelatedPagesRepository : EntityBaseRepository<RelatedPages>, IRelatedPagesRepository
    {
        public RelatedPagesRepository(PagesContext context)
            : base(context)
        { }
    }
}
