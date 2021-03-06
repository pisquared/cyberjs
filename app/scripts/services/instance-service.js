/// <reference path="../app.ts" />
'use strict';
var angulartsApp;
(function (angulartsApp) {
    /*
      export function instanceFactory($localStorage) {
        return function() {
          return new InstanceService($localStorage);
        }
      }
    */
    var InstanceService = (function () {
        // @ngInject
        function InstanceService($localStorage) {
            this.storage = $localStorage;
            this.storage.instances = this.storage.instances || {};
        }
        InstanceService.prototype.create = function (systemId) {
            console.debug('[InstanceFactory] create new Instance of system %s', systemId);
            var instance = {
                id: angulartsApp.randomId(),
                systemId: systemId,
                history: []
            };
            // save parameter
            this.storage.instances[instance.id] = instance;
            return instance;
        };
        InstanceService.prototype.read = function (instanceId) {
            return this.storage.instances[instanceId];
        };
        InstanceService.prototype.list = function () {
            return this.storage.instances;
        };
        return InstanceService;
    })();
    angulartsApp.InstanceService = InstanceService;
})(angulartsApp || (angulartsApp = {}));
angular.module('angulartsApp').service('Instance', angulartsApp.InstanceService);
//# sourceMappingURL=instance-service.js.map