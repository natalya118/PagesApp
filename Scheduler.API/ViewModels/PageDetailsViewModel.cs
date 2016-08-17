using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pages.API.ViewModels
{
    public class PageDetailsViewModel
    {
        public int Id { get; set; }

        public string UrlName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public DateTime AddedDate { get; set; }
    }
}
