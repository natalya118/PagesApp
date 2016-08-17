using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Data.Abstract;
using Scheduler.Model;
using Scheduler.API.ViewModels;
using AutoMapper;
using Scheduler.API.Core;
using Pages.Models;
using Pages.API.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Scheduler.API.Controllers
{
    [Route("api/[controller]")]
    public class PagesController : Controller
    {
        private IPageRepository _pagesRepository;
        private INavLinkRepository _navlinksRepository;
        private IRelatedPagesRepository _relatedpagesRepository;
        int page = 1;
        int pageSize = 4;
        public PagesController(IPageRepository pagesRepository,
                                    INavLinkRepository navlinksRepository,
                                    IRelatedPagesRepository relpagesRepository)
        {
            _pagesRepository = pagesRepository;
            _navlinksRepository = navlinksRepository;
            _relatedpagesRepository = relpagesRepository;
        }

        public IActionResult Get()
        {
            var pagination = Request.Headers["Pagination"];

            if (!string.IsNullOrEmpty(pagination))
            {
                string[] vals = pagination.ToString().Split(',');
                int.TryParse(vals[0], out page);
                int.TryParse(vals[1], out pageSize);
            }

            int currentPage = page;
            int currentPageSize = pageSize;
            var totalSchedules = _pagesRepository.Count();
            var totalPages = (int)Math.Ceiling((double)totalSchedules / pageSize);
            
            IEnumerable<Page> _pages = _pagesRepository
                .AllIncluding()
                .OrderBy(p => p.Id)
                .Skip((currentPage - 1) * currentPageSize)
                .Take(currentPageSize)
                .ToList();

            Response.AddPagination(page, pageSize, totalSchedules, totalPages);

            IEnumerable<PageViewModel> _pagesVM = Mapper.Map<IEnumerable<Page>, IEnumerable<PageViewModel>>(_pages);

            return new OkObjectResult(_pagesVM);
        }

        [HttpGet("{id}", Name = "GetPage")]
        public IActionResult Get(int id)
        {
            Page _page = _pagesRepository
                .GetSingle(s => s.Id == id, s => s.UrlName, s => s.Title);

            if (_page != null)
            {
                PageViewModel _pagesVM = Mapper.Map<Page, PageViewModel>(_page);
                return new OkObjectResult(_pagesVM);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}/details", Name = "GetPageDetails")]
        public IActionResult GetPageDetails(int id)
        {
            Page _page = _pagesRepository
                .GetSingle(s => s.Id == id, s => s.UrlName, s => s.Title);

            if (_page != null)
            {


                PageDetailsViewModel _pageDetailsVM = Mapper.Map<Page, PageDetailsViewModel>(_page);

                

                return new OkObjectResult(_pageDetailsVM);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody]PageViewModel page)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Page _newPage = Mapper.Map<PageViewModel, Page>(page);
            _newPage.AddedDate = DateTime.Now;

            _pagesRepository.Add(_newPage);
            _pagesRepository.Commit();

            //foreach (var userId in page.Attendees)
            //{
            //    _newPage.Attendees.Add(new Attendee { UserId = userId });
            //}
            _pagesRepository.Commit();

            page = Mapper.Map<Page, PageViewModel>(_newPage);

            CreatedAtRouteResult result = CreatedAtRoute("GetPage", new { controller = "Pages", id = page.Id }, page);
            return result;
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]PageViewModel page)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Page _pageDb = _pagesRepository.GetSingle(id);

            if (_pageDb == null)
            {
                return NotFound();
            }
            else
            {
                _pageDb.UrlName = page.UrlName;
                _pageDb.Title = page.Title;
                _pageDb.Description = page.Description;
                _pageDb.Content = page.Content;
                
                
                
                _pagesRepository.Commit();
            }

            //page = Mapper.Map<Schedule, NavLinkViewModel>(_pageDb);

            return new NoContentResult();
        }

        [HttpDelete("{id}", Name = "DeletePage")]
        public IActionResult Delete(int id)
        {
            Page _pageDb = _pagesRepository.GetSingle(id);

            if (_pageDb == null)
            {
                return new NotFoundResult();
            }
            else
            {
                _pagesRepository.DeleteWhere(a => a.Id == id);
                //_pagesRepository.Delete(_pageDb);

                _pagesRepository.Commit();

                return new NoContentResult();
            }
        }

    }
}
