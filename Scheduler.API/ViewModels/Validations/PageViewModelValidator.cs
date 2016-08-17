using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.API.ViewModels.Validations
{
    public class PageViewModelValidator : AbstractValidator<PageViewModel>
    {
        public PageViewModelValidator()
        {
            RuleFor(page => page.UrlName).NotEmpty().WithMessage("URL cannot be empty");
        }
    }
}
