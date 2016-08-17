
using Scheduler.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Pages.Models

{
    public class Page : IEntityBase
    {

        
        public int Id { get; set; }
        //s[IsUrlAvailable(ErrorMessage = "Page with this url already exists.")]

        public string UrlName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public DateTime AddedDate { get; set; }
        public override string ToString()
        {
            return $"PageID: {Id}, UrlName: {UrlName}, Title: {Title}, Description: {Description}, Content:{Content}, AddedDate: {AddedDate}";
        }
    }
}
