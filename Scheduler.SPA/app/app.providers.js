"use strict";
var http_1 = require('@angular/http');
var data_service_1 = require('./shared/services/data.service');
var config_service_1 = require('./shared/utils/config.service');
var items_service_1 = require('./shared/utils/items.service');
var notification_service_1 = require('./shared/utils/notification.service');
exports.APP_PROVIDERS = [
    config_service_1.ConfigService,
    data_service_1.DataService,
    items_service_1.ItemsService,
    notification_service_1.NotificationService,
    http_1.HTTP_PROVIDERS];
//# sourceMappingURL=app.providers.js.map