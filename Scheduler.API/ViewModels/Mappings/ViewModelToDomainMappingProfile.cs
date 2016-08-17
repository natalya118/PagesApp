using AutoMapper;
using Pages.Models;
using Scheduler.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.API.ViewModels.Mappings
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        protected override void Configure()
        {
            //Mapper.CreateMap<NavLinkViewModel, Schedule>()
            //   .ForMember(s => s.Creator, map => map.UseValue(null))
            //   .ForMember(s => s.Attendees, map => map.UseValue(new List<Attendee>()));

            Mapper.CreateMap<PageViewModel, Page>();
        }
    }
}
