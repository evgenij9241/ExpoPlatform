var expoplatform = angular.module('expoplatform', ["ui.router", "ngAnimate", "ngSanitize", 'ui.bootstrap'])

expoplatform.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("first", {
            url: "/first",
            template: '<h1>{{anyTitle}}</h1><p>{{anyText}}</p><a ui-sref="second">Go to second page</a>',
            controller: 'firstControler'
        })
        .state("second", {
            url: "/second",
            template: '<accordion-widget></accordion-widget>'
        })
    $urlRouterProvider.otherwise("/first");
}).controller('firstControler', ['$scope', function ($scope) {
    $scope.anyTitle = 'First page';
    $scope.anyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
}]).directive('accordionWidget', function ($http, $compile) {
    return {
        restrict: 'E',
        link: function(scope, element) {
            var url = "categories.json";
            $http.get(url).then(function (res) {
                accordionGeneration(res.data);
            });
            function accordionGeneration(json) {
                var ary = json;
                scope.groups = ary;
                var accView = "";
                var accLevel = 0;
                var accName = "groups";
                function accBuild (obj) {
                    if (typeof(obj) === "object") {
                            accView = accView + "<accordion close-others=\"true\">";
                            accView = accView + "<accordion-group ng-repeat=\"" + (accName + accLevel);
                            if (accLevel>0) {
                                accView = accView + " in " + accName + "._children\" is-open=\"{{" + (accName + accLevel) + ".isOpen}}\"><accordion-heading><div ng-click=\"opened(" + (accName + accLevel) + ".name)\">{{" + (accName + accLevel) + ".name }}</div></accordion-heading>";
                            } else {
                                accView = accView + " in " + accName + "\" is-open=\"{{" + (accName + accLevel) + ".isOpen}}\"><accordion-heading><div ng-click=\"opened(" + (accName + accLevel) + ".name)\">{{" + (accName + accLevel) + ".name}}</div></accordion-heading>";
                            }
                            for (var i in obj) {
                                if (obj[i]._hasChildren) {
                                    accName = accName + accLevel;
                                    accLevel = accLevel + 1;
                                    accBuild(obj[i]._children);
                                }
                            }
                            accView = accView + "</accordion-group></accordion>";
                    }
                }
                accBuild(ary);
                var el = angular.element('<div/>');
                el.append(accView);
                $compile(el)(scope);
                element.append(el);
            }
        }
    }
});
