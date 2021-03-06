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
var items_service_1 = require('./items.service');
var MappingService = (function () {
    function MappingService(itemsService) {
        this.itemsService = itemsService;
    }
    MappingService.prototype.mapPageDetailsToPage = function (pageDetails) {
        var page = {
            id: pageDetails.id,
            title: pageDetails.title,
            description: pageDetails.description,
            urlName: pageDetails.urlName,
            content: pageDetails.content,
            addedDate: pageDetails.addedDate
        };
        return page;
    };
    MappingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [items_service_1.ItemsService])
    ], MappingService);
    return MappingService;
}());
exports.MappingService = MappingService;
//# sourceMappingURL=mapping.service.js.map