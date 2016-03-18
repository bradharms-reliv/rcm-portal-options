///**
// * Created by idavis on 3/16/16.
// */
//rcm.addAngularModule('rcmPortalOptions');
//
//angular.module('rcmPortalOptions', [])
//
//.directive (
//    'rcmPortalOptions',
//    [
//        '$http', '$log', '$sce', 'rcmAdminService',
//        function ($http, $log, $sce, rcmAdminService) {
//
//            var thisLink = function (scope, element, attrs) {
//                scope.portalOptionsMenus = [
//                    {id: 1, title: 'sign up new people', url: '/sing-up'},
//                    {id: 2, title: 'shop', url: '/quick-shop'}
//                ];
//
//                scope.editMode = false;
//
//                rcmAdminService.rcmEventManager.on(
//                    'editingStateChange', function (page) {
//                        if (page.editMode === true) {
//                            scope.editMode = true;
//                        }
//                    });
//
//
//            };
//            return {
//                link: thisLink,
//                restrict: 'A',
//                templateUrl: '/modules/rcm-portal-options/portal-options-menus.html'
//
//            }
//        }
//    ]
//);