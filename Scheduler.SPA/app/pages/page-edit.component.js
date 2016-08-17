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
var data_service_1 = require('../shared/services/data.service');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var config_service_1 = require('../shared/utils/config.service');
var mapping_service_1 = require('../shared/utils/mapping.service');
var date_format_pipe_1 = require('../shared/pipes/date-format.pipe');
var ng2_slim_loading_bar_1 = require('../../node_modules/ng2-slim-loading-bar/ng2-slim-loading-bar');
var ng2_datetime_1 = require('ng2-datetime/ng2-datetime');
var PageEditComponent = (function () {
    function PageEditComponent(route, router, dataService, itemsService, notificationService, configService, mappingService, slimLoader) {
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.configService = configService;
        this.mappingService = mappingService;
        this.slimLoader = slimLoader;
        this.pageLoaded = false;
    }
    PageEditComponent.prototype.ngOnInit = function () {
        // (+) converts string 'id' to a number
        this.id = +this.route.snapshot.params['id'];
        this.apiHost = this.configService.getApiHost();
        this.loadPageDetails();
    };
    PageEditComponent.prototype.loadPageDetails = function () {
        var _this = this;
        this.slimLoader.start();
        this.dataService.getPageDetails(this.id)
            .subscribe(function (page) {
            _this.page = _this.itemsService.getSerialized(page);
            _this.pageLoaded = true;
            // Convert date times to readable format
            _this.page.addedDate = new Date(_this.page.addedDate.toString()); // new DateFormatPipe().transform(page.addedDate, ['local']);
            _this.slimLoader.complete();
        }, function (error) {
            _this.slimLoader.complete();
            _this.notificationService.printErrorMessage('Failed to load page. ' + error);
        });
    };
    PageEditComponent.prototype.updatePage = function (editPageForm) {
        var _this = this;
        console.log(editPageForm.value);
        var pageMapped = this.mappingService.mapPageDetailsToPage(this.page);
        this.slimLoader.start();
        this.dataService.updatePage(pageMapped)
            .subscribe(function () {
            _this.notificationService.printSuccessMessage('Page has been updated');
            _this.slimLoader.complete();
        }, function (error) {
            _this.slimLoader.complete();
            _this.notificationService.printErrorMessage('Failed to update page. ' + error);
        });
    };
    PageEditComponent.prototype.back = function () {
        this.router.navigate(['/pages']);
    };
    PageEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-page-edit',
            templateUrl: 'page-edit.component.html',
            directives: [ng2_datetime_1.NKDatetime],
            providers: [mapping_service_1.MappingService],
            pipes: [date_format_pipe_1.DateFormatPipe]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, data_service_1.DataService, items_service_1.ItemsService, notification_service_1.NotificationService, config_service_1.ConfigService, mapping_service_1.MappingService, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], PageEditComponent);
    return PageEditComponent;
}());
exports.PageEditComponent = PageEditComponent;
//# sourceMappingURL=page-edit.component.js.map