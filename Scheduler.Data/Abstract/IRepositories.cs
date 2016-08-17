using Pages.Models;

namespace Scheduler.Data.Abstract
{
    public interface IPageRepository : IEntityBaseRepository<Page> { }

    public interface INavLinkRepository : IEntityBaseRepository<NavLink> { }

    public interface IRelatedPagesRepository : IEntityBaseRepository<RelatedPages> { }
}
