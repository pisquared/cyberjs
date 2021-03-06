/// <reference path="../app.ts" />
'use strict';
var angulartsApp;
(function (angulartsApp) {
    /**
     * The TsList ist an editable Bootstrap 3 list written in TypeScript.
     * Entries can be added and removed
     */
    var TsList = (function () {
        function TsList() {
            this.templateUrl = 'views/ts-list-directive.html';
            this.restrict = 'A';
            this.scope = {
                service: '=tsList',
                route: '@',
                onSelect: '=onSelect'
            };
        }
        TsList.prototype.controller = function ($scope, $state) {
            // The service model provided in the tsList attribute is expected to have methods:
            // list(), create(name), remove(id)
            //console.log('[TS-List] directive controller, entries %o', $scope.service);
            $scope.list = $scope.service.list() || {};
            $scope.addEntry = function (name) {
                //console.debug('[TsList] uiAddEntry %s', name);
                var entry = $scope.service.create(name);
                $scope.list[entry.id] = entry;
                $scope.newEntryName = "";
            };
            $scope.selectEntry = function (id) {
                console.debug('[TsList] selectEntry %s, route %o', id, $scope.route);
                $scope.$emit(TsList.EVENT_SELECT, {
                    route: $scope.route,
                    id: id
                });
            };
            $scope.removeEntry = function (id) {
                //console.debug('[TsList] removeEntry %s', id);
                $scope.service.remove(id);
                delete $scope.list[id];
            };
        };
        TsList.EVENT_SELECT = 'TsListSelect';
        TsList.EVENT_ADD = 'TsListAdd';
        TsList.EVENT_REMOVE = 'TsListRemove';
        return TsList;
    })();
    angulartsApp.TsList = TsList;
    function tsListFactory() {
        return new angulartsApp.TsList();
    }
    angulartsApp.tsListFactory = tsListFactory;
})(angulartsApp || (angulartsApp = {}));
angular.module('angulartsApp').directive('tsList', angulartsApp.tsListFactory);
//# sourceMappingURL=ts-list-directive.js.map