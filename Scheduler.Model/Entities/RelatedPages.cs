using Scheduler.Model;
using System.ComponentModel.DataAnnotations.Schema;


namespace Pages.Models
{
    public class RelatedPages : IEntityBase
    {
        public int Id { get; set; }

        [ForeignKey("Page1Id")]
        public Page Page1 { get; set; }
        public int? Page1Id { get; set; }

        [ForeignKey("Page2Id")]
        public Page Page2 { get; set; }
        public int? Page2Id { get; set; }

        public override string ToString()
        {
            return $"Page1: { Page1Id}, Page2: {Page2Id}";
        }
    }
}
