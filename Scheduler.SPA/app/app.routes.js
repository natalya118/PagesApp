"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var page_routes_1 = require('./pages/page.routes');
exports.routes = page_routes_1.PageRoutes.concat([
    { path: '', component: home_component_1.HomeComponent }
]);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map