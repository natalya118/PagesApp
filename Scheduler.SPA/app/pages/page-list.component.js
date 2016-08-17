"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var data_service_1 = require('../shared/services/data.service');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var config_service_1 = require('../shared/utils/config.service');
var date_format_pipe_1 = require('../shared/pipes/date-format.pipe');
var PageListComponent = (function () {
    function PageListComponent(slimLoader, dataService, itemsService, notificationService, configService) {
        this.slimLoader = slimLoader;
        this.dataService = dataService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.configService = configService;
        this.itemsPerPage = 2;
        this.totalItems = 0;
        this.currentPage = 1;
        this.items = ['item1', 'item2', 'item3'];
        this.selectedPageLoaded = false;
        this.index = 0;
        this.backdropOptions = [true, false, 'static'];
        this.animation = true;
        this.keyboard = true;
        this.backdrop = true;
    }
    PageListComponent.prototype.ngOnInit = function () {
        this.apiHost = this.configService.getApiHost();
        this.loadPages();
    };
    PageListComponent.prototype.loadPages = function () {
        var _this = this;
        this.slimLoader.start();
        this.dataService.getPages(this.currentPage, this.itemsPerPage)
            .subscribe(function (res) {
            _this.pages = res.result; // pages;
            _this.totalItems = res.pagination.TotalItems;
            _this.slimLoader.complete();
        }, function (error) {
            _this.slimLoader.complete();
            _this.notificationService.printErrorMessage('Failed to load pages. ' + error);
        });
    };
    PageListComponent.prototype.pageChanged = function (event) {
        this.currentPage = event.page;
        this.loadPages();
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
    };
    ;
    PageListComponent.prototype.removePage = function (page) {
        var _this = this;
        this.notificationService.openConfirmationDialog('Are you sure you want to delete this page?', function () {
            _this.slimLoader.start();
            _this.dataService.deletePage(page.id)
                .subscribe(function () {
                _this.itemsService.removeItemFromArray(_this.pages, page);
                _this.notificationService.printSuccessMessage(page.title + ' has been deleted.');
                _this.slimLoader.complete();
            }, function (error) {
                _this.slimLoader.complete();
                _this.notificationService.printErrorMessage('Failed to delete ' + page.title + ' ' + error);
            });
        });
    };
    PageListComponent.prototype.viewPageDetails = function (id) {
        this.selectedPageId = id;
        this.modal.open('lg');
        console.log('test');
    };
    PageListComponent.prototype.closed = function () {
        this.output = '(closed) ' + this.selected;
    };
    PageListComponent.prototype.dismissed = function () {
        this.output = '(dismissed)';
    };
    PageListComponent.prototype.opened = function () {
        var _this = this;
        this.slimLoader.start();
        this.dataService.getPageDetails(this.selectedPageId)
            .subscribe(function (page) {
            _this.pageDetails = _this.itemsService.getSerialized(page);
            // Convert date times to readable format
            _this.pageDetails.addedDate = new date_format_pipe_1.DateFormatPipe().transform(page.addedDate, ['local']);
            _this.slimLoader.complete();
            _this.selectedPageLoaded = true;
        }, function (error) {
            _this.slimLoader.complete();
            _this.notificationService.printErrorMessage('Failed to load page. ' + error);
        });
        this.output = '(opened)';
    };
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], PageListComponent.prototype, "modal", void 0);
    PageListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-pages',
            templateUrl: 'page-list.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, ng2_bs3_modal_1.MODAL_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES],
            pipes: [date_format_pipe_1.DateFormatPipe],
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('0.5s ease-in')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [Object, data_service_1.DataService, items_service_1.ItemsService, notification_service_1.NotificationService, config_service_1.ConfigService])
    ], PageListComponent);
    return PageListComponent;
}());
exports.PageListComponent = PageListComponent;
//# sourceMappingURL=page-list.component.js.map