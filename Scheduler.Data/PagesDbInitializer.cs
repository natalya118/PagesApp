using Pages.Models;
using System;
using System.Linq;
namespace Scheduler.Data
{
    public class PagesDbInitializer
    {
        private static PagesContext context;
        public static void Initialize(IServiceProvider serviceProvider)
        {
            context = (PagesContext)serviceProvider.GetService(typeof(PagesContext));

            InitializeSchedules();
        }

        private static void InitializeSchedules()
        {
            if(!context.Pages.Any())
            {

                Page page1 = new Page
                {
                    UrlName = "test1",
                    Content = "test content",
                    Description = "test description",
                    Title = "title1"

                };

                context.Pages.Add(page1);

                context.SaveChanges();
            }

           

            context.SaveChanges();
        }
    }
}
