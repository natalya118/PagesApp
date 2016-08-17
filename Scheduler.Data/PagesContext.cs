using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Pages.Models;
using System.IO;

namespace Scheduler.Data
{
    public class PagesContext : DbContext
    {

        public DbSet<Page> Pages { get; set; }
        public DbSet<NavLink> NavLinks { get; set; }
        public DbSet<RelatedPages> RelatedPages { get; set; }


        public PagesContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }


            //modelBuilder.Entity<Page>()
            //.Property(p => p.AddedDate)
            //.HasDefaultValueSql("CURRENT_TIMESTAMP");


            modelBuilder.Entity<Page>()
                .Property(p => p.UrlName)
                .IsRequired();

            modelBuilder.Entity<Page>()
                .Property(p => p.Title)
                .IsRequired();

            modelBuilder.Entity<Page>()
                .Property(p => p.Description)
                .HasMaxLength(300);



        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlite(@"Data Source=" + Directory.GetCurrentDirectory() + @"\PagesDB.db");
        //}
    }
}
