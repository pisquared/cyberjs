/// <reference path="../app.ts" />
'use strict';
var angulartsApp;
(function (angulartsApp) {
    var SystemCtrl = (function () {
        // @ngInject
        function SystemCtrl(System, Parameter, $stateParams) {
            console.log($stateParams);
            this.data = System; //new SystemService($localStorage);
            this.parameter = Parameter; //new ParameterData($localStorage);
            console.log('[SystemCtrl] constructor %o', this.parameter.list());
            if ($stateParams.id) {
                this.system = this.data.read($stateParams.id);
            }
        }
        SystemCtrl.prototype.list = function () {
            return this.data.list();
        };
        SystemCtrl.prototype.read = function (id) {
            return this.data.read(id);
        };
        SystemCtrl.prototype.uiAddParameter = function (name) {
            console.debug('[System] this %o', this);
            console.debug('[System] Add parameter %s', name);
            this.system.parameters.push(name);
        };
        SystemCtrl.prototype.uiRemoveParameter = function (index) {
            var name = this.system.parameters[index];
            console.debug('[System] Remove parameter %s', name);
            this.system.parameters.splice(index, 1);
        };
        SystemCtrl.prototype.uiAddRelation = function (name) {
            console.debug('[System] Add relation %s', name);
        };
        SystemCtrl.prototype.uiRemoveRelation = function (name) {
            console.debug('[System] Remove relation %s', name);
        };
        SystemCtrl.prototype.uiAddSystem = function (name) {
            console.log('[System] User added system %s', name);
            var system = this.data.create(name);
            console.log('[System] create system %o', system);
            console.log('[System] system list %o', this.data.list());
        };
        return SystemCtrl;
    })();
    angulartsApp.SystemCtrl = SystemCtrl;
})(angulartsApp || (angulartsApp = {}));
angular.module('angulartsApp').controller('SystemCtrl', angulartsApp.SystemCtrl);
//# sourceMappingURL=system-controller.js.map