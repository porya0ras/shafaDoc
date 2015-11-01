// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic.utils', 'ngCordova', 'starter.directives','ui.bootstrap.persian.datepicker'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.hdocprof', {
                url: '/hdocprof/:hdocid',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hdoctorprof.html'
                    }
                }
            })
            .state('app.cities', {
                url: '/cities/:idostan',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cities.html'
                    }
                }
            })
            .state('app.specialResult', {
                url: "/specialResult",
                views: {
                    'menuContent': {
                        templateUrl: 'templates/specialResult.html'
                    }
                }
            })

            .state('app.specialResult.hospitals', {
                url: '/hospitals',
                views: {
                    'hospitals-tab': {
                        templateUrl: 'templates/hospitals.html'
                    }
                }
            })
            .state('app.specialResult.doctors', {
                url: '/doctors',
                views: {
                    'doctors-tab': {
                        templateUrl: 'templates/doctors.html'
                    }
                }
            })
            .state('app.specialResult.hdoctors', {
                url: '/hdoctors',
                views: {
                    'doctors-tab': {
                        templateUrl: 'templates/hdoctors.html'
                    }
                }
            })
            .state('app.signup', {
                url: '/signup',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/signup.html'
                    }
                }
            })
            .state('app.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/about.html'
                    }
                }
            })
            .state('app.setting', {
                url: '/setting',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/setting.html'
                    }
                }
            })
.state('app.login2', {
                url: '/login2',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login2.html'
                    }
                }
            })
            .state('app.doctorprof', {
                url: '/doctorprof/:docid',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/doctorprof.html'
                    }
                }
            })
            .state('app.hdoctorprof', {
                url: '/hdoctorprof/:hid/:hdocid',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hdoctorprof.html'
                    }
                }
            })
            .state('app.hprof', {
                url: '/hprof/:hid',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/hospital.html'
                    }
                }
            })
            .state('app.docreserv', {
                url: '/docreserv/:docid',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/dreservtable.html'
                    }
                }
            })
            .state('app.map', {
                url: '/map/:l0/:l1',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/map.html',
                        controller:'Map'

                    }
                }
            })
            .state('app.playlists', {
                url: '/playlists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlists.html',
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
       $urlRouterProvider.otherwise('/app/login2');
    });
angular.module('ionic.utils', [])

    .factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            removeObject: function (key) {
                $window.localStorage.removeItem(key);
            }
        }
    }]);
