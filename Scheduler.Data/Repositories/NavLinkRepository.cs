using Pages.Models;
using Scheduler.Data.Abstract;
using Scheduler.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Data.Repositories
{
    public class NavLinkRepository : EntityBaseRepository<NavLink>, INavLinkRepository
    {
        public NavLinkRepository(PagesContext context)
            : base(context)
        { }
    }
}
