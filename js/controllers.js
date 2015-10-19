var Pass = 123;
var location0 = {};
var httpsite = "http://shafadoc.tbzmed.ac.ir";
var Data = {};// docprofile
angular.module('starter.controllers', ['ionic', 'ionic.utils', 'ngAnimate', 'ui.bootstrap', 'starter.directives'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })
    .controller('Docs', function ($scope, $http, $ionicPopup, $state, $cordovaGeolocation, $ionicLoading, $stateParams,$rootScope) {
        $scope.stateParams=$stateParams;
        $scope.mapCreated = function (map, $l0, $l1) {
            $scope.map = map;
            $scope.centerOnLocation($l0, $l1);
        };
        var directionsDisplay = new google.maps.DirectionsRenderer();
        $scope.centerOnLocation = function ($latitude, $longitude) {
            console.log("Centering");
            $scope.map.setCenter(new google.maps.LatLng($latitude, $longitude));
            var site = new google.maps.LatLng($latitude,$longitude);
            var marker = new google.maps.Marker({
                position: site,
                map: $scope.map
            });
            marker.setIcon('img/marker.png');
            directionsDisplay.setMap($scope.map);
            console.log("Done");

        };
        $scope.doctors = [];
        $scope.getDoctors = function ($city, $ostan) {
            $ionicLoading.show();
            var o = new Object();
            o.city = $city;
            o.ostan = $ostan;
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(o) + '&Func=doctors';
            $http({
                method: 'POST',
                url: '/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.doctors = response.data.Data;
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.docprofile = {};
        $scope.getDocProFile = function ($id) {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=docprofile';
            $http({
                method: 'POST',
                url: '/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.docprofile = response.data.Data;

                        $scope.mapCreated($scope.map,$scope.docprofile.map.latitude0,$scope.docprofile.map.latitude1);
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.hdocprofile={};
        $scope.getHospitalDocProFile=function($id)
        {
            $ionicLoading.show({
                content: 'دریافت اطلاعات..',
                showBackdrop: false
            });
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=hdocprofile';
            $http({
                method: 'POST',
                url: '/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hdocprofile = response.data.Data;
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };

        $scope.docdatetime = [];
        $scope.getDocDateTime = function ($id, $date) {
            $ionicLoading.show();
            var O = new Object();
            O.id = $id;
            O.date = String($date);
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(O) + '&Func=docdatetime';
            $http({
                method: 'POST',
                url: '/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.docdatetime = response.data.Data;
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.address = [];
        $scope.getAddress = function ($id) {
            console.log($id);
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=address';
            $http({
                method: 'POST',
                url: '/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.address = response.data.Data;
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.initDoctors = function () {
            console.log('location data:' + location0.city);
            $scope.getDoctors(location0.city, location0.ostan);
            console.log($scope.doctors.length);
        };
        $scope.httpsite = httpsite;
        $scope.hdocdatetime=[];
        $scope.getHospitalDocDateTime=function($hid,$hdocid)
        {
            var O=new Object();
            O.hid=$hid;
            O.docid=$hdocid;
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(O) + '&Func=hospitaldocdatetime';
            $http({
                method: 'POST',
                url: '/api/Hospital',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hdocdatetime = response.data.Data;
                        console.log($scope.hdocdatetime);
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };

        //-----------------------------Datapiker---------------
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();
        $scope.clear = function () {
            $scope.dt = null;
        };
        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && date.getDay() === 5   );

        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.openPersian = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.persianIsOpen = true;
            $scope.gregorianIsOpen = false;
        };
        $scope.openGregorian = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.gregorianIsOpen = true;
            $scope.persianIsOpen = false;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 6
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];
        //---------------------------------------------------------------------



    })
    .controller('Ostans', function ($scope, $http, $timeout, $q, $ionicPopup, $state,$stateParams,$ionicLoading,$rootScope) {
        $scope.ostans = [];
        $scope.cities = [];
        $ionicLoading.show({
            showBackdrop: false
        });
        $scope.stateParams=$stateParams;
        var xsrf = 'Pass=' + Pass + '&Func=ostans';
        $http({
            method: 'POST',
            url: '/api/Location',
            data: xsrf,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {

                if (response.data.HRM.StatusCode == 200) {

                    $scope.ostans = response.data.Data;
                    $ionicLoading.hide();
                }
                // success
            },
            function (response) { // optional
                // failed
                $ionicPopup.alert({
                    title: 'Failed',
                    content: ' ارتباط با سرور برقرار نیست'
                }).then(function (res) {
                    console.log('Failed Connection!');
                });
            });
        $scope.getCities = function ($id) {
            $scope.loading = $ionicLoading.show({
                showBackdrop: false
            });
            var xsrf = 'Data=' + $id + '&Pass=' + Pass + '&Func=citys';
            $http({
                method: 'POST',
                url: '/api/Location',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.cities = response.data.Data;
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.transfer = function ($city0, $ostan0) {
            location0.city = $city0;
            location0.ostan = $scope.showOstan($ostan0);
            $state.go('app.cityresult');
        };

        $scope.showOstan = function ($code) {
            for (var i = 0; i < $scope.ostans.length; i++) {
                if ($scope.ostans[i].code == $code) {
                    return $scope.ostans[i].ostands;
                }
            }
            return '';
        };

    })
    .controller('LogIn', function ($scope, $http, $ionicPopup,$localstorage,$state,$rootScope,$ionicLoading,$ionicHistory) {
        $scope.Error = false;
        $scope.init=function()
        {
            var UserData=$localstorage.getObject('UserData');
            if(UserData.idU===undefined)
            {
            }
            else
            {
                $scope.$root.UserData=UserData;
                $scope.$root.isLogin=true;
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.browse');
            }
        };
        $scope.goWithoutlogin=function()
        {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.browse');
        };
        $scope.Login = function ($username, $password, $type) {
            $ionicLoading.show();
            var O = new Object();
            O.username = $username;
            O.password = $password;
            O.type = $type;
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(O) + '&Func=signin';
            $http({
                method: 'POST',
                url: '/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        if(response.data.Data===true)
                        {
                            $scope.$root.isLogin=true;
                            $ionicLoading.hide();
                            $scope.LoginClick($username);
                        }
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.UserData={};
        $scope.getUserData=function($username) {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $username + '&Func=getuserdata';
            $http({
                method: 'POST',
                url: '/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.UserData=response.data.Data;
                        $localstorage.setObject('UserData',$scope.UserData);
                        $scope.$root.UserData=$scope.UserData;
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.LoginClick=function($username)
        {
            if($scope.$root.isLogin)
            {
               $scope.getUserData($username);
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.browse');
            }
            else
            {
                $scope.Error=true;
            }
        };
        $scope.signup = false;
        $scope.Signup = function ($mobile, $fl, $password, $codemelli) {
            var O = new Object();
            O.username = $mobile;
            O.password = $password;
            O.fl = $fl;
            O.codemelli = $codemelli;
            //var xsrf = 'Pass=' + Pass + '&Data={"username":"'+$usrname+'","password":"'+$password+'"}';
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(O) + '&Func=signup';
            $http({
                method: 'POST',
                url: '/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.result = response.data.Data;
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
    })
    .controller('Setting', function ($scope, $http, $ionicPopup,$rootScope) {
        $scope.value = {};
        $scope.getSetting = function ($key) {
            var xsrf = 'Pass=' + Pass + '&Data=' + $key + '&Func=get';
            $http({
                method: 'POST',
                url: '/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.value = response.data.Data;
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: '! ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
    })
    .controller('Search', function ($scope, $http, $ionicPopup, $localstorage,$rootScope,$ionicLoading) {

        $scope.Rsearch = {};
        $scope.doctors = [];
        $scope.hospitals = [];
        $scope.hdoctors=[];
        $scope.speciality=[];
        $scope.Data = {};
        $scope.selected = undefined;
        $scope.searchs = [];
        $scope.getResult = function ($search) {
            $ionicLoading.show({
                template:'در حال جستجو کردن ...',
                showBackdrop: false
            });
            $scope.saveSearch($search);
            var xsrf = 'Pass=' + Pass + '&Data=' + $search + '&Func=search';
            $http({
                method: 'POST',
                url: '/api/Search',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.Rsearch = response.data.Data;
                        $scope.doctors = JSON.parse($scope.Rsearch.doctors);
                        $scope.hospitals = JSON.parse($scope.Rsearch.hospitals);
                        $scope.hdoctors = JSON.parse($scope.Rsearch.hospitaldoctors);
                        $scope.speciality = JSON.parse($scope.Rsearch.Spe);
                        $rootScope.hide4search = true;
                        $ionicLoading.hide();

                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.remove = function () {
            $localstorage.removeObject('Data');
            $scope.searchs = [];
            $scope.Data = [];
        };
        $scope.saveSearch = function ($word) {
            console.log($scope.searchs);
            $scope.Data['search'].push($word);
            $scope.searchs = $scope.Data.search;
            $localstorage.setObject('Data', $scope.Data);
        };
        $scope.init = function () {
            $scope.Data = $localstorage.getObject('Data');

            if ($scope.Data.search === undefined) {
                $scope.Data.search = new Array();
            }
            else {
                $scope.searchs = $scope.Data.search;
            }
        };
    })
    .controller('Hospital', function ($scope, $http, $ionicPopup, $stateParams, $ionicLoading,$rootScope) {
        $scope.mapCreated = function (map, $l0, $l1) {
            $scope.map = map;
            $scope.centerOnLocation($l0, $l1);
        };
        $scope.centerOnLocation = function ($latitude, $longitude) {
            console.log("Centering");

            $scope.loading = $ionicLoading.show({
                content: 'آماداه سازی نقشه ...',
                showBackdrop: false
            });
            $scope.map.setCenter(new google.maps.LatLng($latitude, $longitude));
            $ionicLoading.hide();
            console.log("Done");

        };

        $scope.hospitals = [];
        $scope.getHospitals = function ($city, $ostan) {
            $ionicLoading.show();
            var o = new Object();
            o.city = $city;
            o.ostan = $ostan;
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(o) + '&Func=hospitals';
            $http({
                method: 'POST',
                url: '/api/Hospital',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hospitals = response.data.Data;
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.hospital = {};
        $scope.getHospital = function ($id) {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=hospital';
            $http({
                method: 'POST',
                url: '/api/Hospital',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hospital = response.data.Data;
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPupup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.hospitaldatetime = [];
        $scope.getHospitalDateTimes = function ($id) {
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=hospitalalldatetime';
            $http({
                method: 'POST',
                url: '/api/Hospital',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hospitaldatetime = response.data.Data;
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPupup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };
        $scope.initHospitals = function () {
            console.log('location data:' + location0.city);
            $scope.getHospitals(location0.city, location0.ostan);
            console.log($scope.hospitals.length);
        };
        $scope.httpsite = httpsite;
        $scope.transfer2Hpro = function () {
            $scope.getHospital($stateParams.hid);
            $scope.getHospitalDocs($stateParams.hid);
        };
        $scope.hdoctors=[];
        $scope.getHospitalDocs=function($id)
        {
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=hospitaldoctors';
            $http({
                method: 'POST',
                url: '/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hdoctors = response.data.Data;
                    }
                    // success
                },
                function (response) { // optional
                    // failed
                    $ionicPopup.alert({
                        title: 'Failed',
                        content: ' ارتباط با سرور برقرار نیست'
                    }).then(function (res) {
                        console.log('Failed Connection!');
                    });
                });
        };



        //---------------------------------------------------------------------
    })
    .controller('Util', function ($scope, $http, $ionicPopup,$localstorage,$state,$rootScope,$ionicLoading) {
        $scope.value = {};
        $scope.reload=function()
        {
            $scope.rootScope=$rootScope;
        };
        $scope.logout=function()
        {
            $scope.$root.UserData={};
            $rootScope.isLogin=false;
            $localstorage.removeObject('UserData');
            $state.go('app.login2');
        }

    })
    .controller('Map', function ($scope, $http, $ionicPopup,$localstorage,$state,$rootScope,$ionicLoading,$stateParams)
    {
        $scope.stateParams=$stateParams;
        $scope.mapCreated = function (map, $l0, $l1) {
            $scope.map = map;
            $scope.centerOnLocation($l0, $l1);
        };
        $scope.centerOnLocation = function ($latitude, $longitude) {
            console.log("Centering");
            $scope.loading = $ionicLoading.show({
                template: 'آماداه سازی نقشه ...'
            });
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log('Got pos', pos);
                // $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.pos.lat= pos.coords.latitude;
                $scope.pos.lng= pos.coords.longitude;
                $ionicLoading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });

            $scope.map.setCenter(new google.maps.LatLng($latitude, $longitude));
            var site = new google.maps.LatLng($latitude,$longitude);
            var marker = new google.maps.Marker({
                position: site,
                map: $scope.map,
                title: 'مطب'
            });
            $ionicLoading.hide();
            directionsDisplay.setMap($scope.map);
            console.log("Done");

        };
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        $scope.calcRoute=function() {
            $ionicLoading.show({
                template: 'مسیر دهی...'
            });
            var end = $stateParams.l0+","+$stateParams.l1;
            var start = $scope.pos.lat + "," + $scope.pos.lng;


            var request = {
                origin: start,
                destination: end,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    console.log('enter!');
                    $ionicLoading.hide();

                }
            });




        };
        $scope.Screanshot=function() {
            window.plugins.screenshot.save(function (error, res) {
                if (error) {
                    alert(error);
                } else {
                    alert('ok', res.filePath); //should be path/to/myScreenshot.jpg
                }

            }, 'jpg', 50, 'myScreenShot');
        }
        $scope.positions = [];
        $scope.pos={};
    });

