using Scheduler.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pages.Models
{
    public class NavLink : IEntityBase
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public int? ParentLinkID { get; set; }
        [ForeignKey("RelatedPageId")]
        public int? RelatedPageId { get; set; }
        public Page RelatedPage { get; set; }
        public int? Position { get; set; }
        
        public override string ToString()
        {
            return $"NavLink: {Id}, Title: {Title}, ParentLinkID: {ParentLinkID}, RelatedPageId: {RelatedPageId}, Position: {Position}";
        }
    }
}
