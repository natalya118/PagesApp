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
    public class PageRepository : EntityBaseRepository<Page>, IPageRepository
    {
        public PageRepository(PagesContext context)
            : base(context)
        { }
    }
}
