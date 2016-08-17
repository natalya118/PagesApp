using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Scheduler.Data;

namespace Scheduler.API.Migrations
{
    [DbContext(typeof(PagesContext))]
    [Migration("20160816173612_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Pages.Models.NavLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ParentLinkID");

                    b.Property<int?>("Position");

                    b.Property<int?>("RelatedPageId");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("RelatedPageId");

                    b.ToTable("NavLinks");
                });

            modelBuilder.Entity("Pages.Models.Page", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("AddedDate");

                    b.Property<string>("Content");

                    b.Property<string>("Description")
                        .HasAnnotation("MaxLength", 300);

                    b.Property<string>("Title")
                        .IsRequired();

                    b.Property<string>("UrlName")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Pages");
                });

            modelBuilder.Entity("Pages.Models.RelatedPages", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Page1Id");

                    b.Property<int?>("Page2Id");

                    b.HasKey("Id");

                    b.HasIndex("Page1Id");

                    b.HasIndex("Page2Id");

                    b.ToTable("RelatedPages");
                });

            modelBuilder.Entity("Pages.Models.NavLink", b =>
                {
                    b.HasOne("Pages.Models.Page", "RelatedPage")
                        .WithMany()
                        .HasForeignKey("RelatedPageId");
                });

            modelBuilder.Entity("Pages.Models.RelatedPages", b =>
                {
                    b.HasOne("Pages.Models.Page", "Page1")
                        .WithMany()
                        .HasForeignKey("Page1Id");

                    b.HasOne("Pages.Models.Page", "Page2")
                        .WithMany()
                        .HasForeignKey("Page2Id");
                });
        }
    }
}
