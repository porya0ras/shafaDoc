var Pass = 123;
var location0 = {};
var httpsite = "http://shafadoc.tbzmed.ac.ir";
//var apiAdd="http://drugs.fractalteam.ir";
var apiAdd="";
var Data = {};// docprofile
angular.module('starter.controllers', ['ionic', 'ionic.utils', 'ngAnimate', 'ui.bootstrap', 'starter.directives'])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout,$rootScope,$ionicPopup) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $ionicPopup.alert({
            title: '!هشدار',
            content: 'لطفا از فعال بودن GPS  و ارتباط با اینترنت اطمینان حاصل فرمایید.'
        }).then(function (res) {

        });
        $rootScope.httpsite="http://shafadoc.tbzmed.ac.ir";
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
    .controller('Docs', function ($scope, $http, $ionicPopup, $state, $cordovaGeolocation,$ionicNavBarDelegate,$ionicHistory,$ionicLoading, $stateParams,$rootScope) {
        $scope.stateParams=$stateParams;


        //$scope.mapCreated = function (map, $l0, $l1) {
        //    $scope.map = map;
        //    $scope.centerOnLocation($l0, $l1);
        //};
        $scope.hdreservation=function()
        {
            $ionicLoading.show();
            var o = new Object();
            o.docid = $stateParams.hid;
            o.dhid = $stateParams.hdocid;
            o.dateid=$scope.dateid;
            o.user=String($scope.$root.UserData.idU);
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(o) + '&Func=hdocreservation';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        var return0 = response.data.Data;
                        console.log(return0);
                        if(return0.ret==true)
                        {
                            $ionicPopup.alert({
                                title: 'اطلاع',
                                content: 'این زمان برای شما رزرو گردید '+'\nشناسه ثبت : '+return0.happo.hid
                            }).then(function (res) {
                                console.log('reserve don');
                                $scope.getHospitalDocDateTime($stateParams.hid,$stateParams.hdocid);
                            });
                        }
                        else{
                            $ionicPopup.alert({
                                title: 'اخطار',
                                content: 'مشکلی پیش آمده است ، لطفا بعدا تلاش فرمایید .'
                            }).then(function (res) {
                                console.log('اخطار Connection!');
                            });
                        }
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });




        };
        //var directionsDisplay = new google.maps.DirectionsRenderer();
        //$scope.centerOnLocation = function ($latitude, $longitude) {
        //    console.log("Centering");
        //    $scope.map.setCenter(new google.maps.LatLng($latitude, $longitude));
        //    var site = new google.maps.LatLng($latitude,$longitude);
        //    var marker = new google.maps.Marker({
        //        position: site,
        //        map: $scope.map
        //    });
        //    marker.setIcon('img/Dicon.png');
        //    directionsDisplay.setMap($scope.map);
        //    console.log("Done");
        //
        //};
        $scope.doctors = [];
        $scope.getDoctors = function ($city, $ostan) {
            $ionicLoading.show();
            var o = new Object();
            o.city = $city;
            o.ostan = $ostan;
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(o) + '&Func=doctors';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.doctors = response.data.Data;

                    }
                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.hdoctors=[];
        $scope.getHDoctors=function($id){
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=hdoctors';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        if(response.data.Data!=null) {
                            $scope.hdoctors = response.data.Data.$values;
                        }

                    }
                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.getDoctors2 = function ($id) {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=doctors2';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        if(response.data.Data!=null) {
                            $scope.doctors = response.data.Data.$values;
                        }

                    }
                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.docprofile = {};
        $scope.getDocProFile = function ($id) {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=docprofile';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.docprofile = response.data.Data;

                        //$scope.mapCreated($scope.map,$scope.docprofile.map.latitude0,$scope.docprofile.map.latitude1);
                    }
                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
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
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hdocprofile = response.data.Data;
                        $scope.getHospitalDocDateTime($stateParams.hid,$stateParams.hdocid);
                    }
                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
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
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.docdatetime = response.data.Data;

                    }
                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.address = [];
        $scope.getAddress = function ($id) {
            console.log($id);
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=address';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.address = response.data.Data;
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.initDoctors = function () {
            //console.log('location data:' + location0.city);
            $scope.getDoctors2($rootScope.spe);
            $scope.inithDoctors();
            //console.log($scope.doctors.length);
        };
        $scope.inithDoctors=function()
        {
            $scope.getHDoctors($rootScope.spe);
        };
        $scope.httpsite = httpsite;
        $scope.hdocdatetime=[];
        $scope.getHospitalDocDateTime=function($hid,$hdocid)
        {
            var O=new Object();
            O.hid=$hid;
            O.docid=$hdocid;
            //console.log(O);
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(O) + '&Func=hospitaldocdatetime';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Hospital',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        if(response.data.Data!=null) {
                            $scope.hdocdatetime = response.data.Data.$values;
                            //$scope.dateid=hdocdatetime[0].dateid;
                            //console.log($scope.hdocdatetime);
                        }
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
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
    .controller('Resbox', function ($scope, $http, $timeout, $q, $ionicPopup, $state,$stateParams,$ionicLoading,$rootScope){
        $scope.appo=[];
        $scope.happo=[];
        $scope.init=function()
        {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $scope.$root.UserData.idU + '&Func=getress';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                    if (response.data.HRM.StatusCode == 200) {
                        if(response.data.Data!=null)
                        {
                            $scope.appo=response.data.Data.appo.$values;
                            console.log(response.data.Data.happo.$values);
                            $scope.happo=response.data.Data.happo.$values;
                        }
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        }
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
            url: apiAdd+'/api/Location',
            data: xsrf,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {

                if (response.data.HRM.StatusCode == 200) {

                    $scope.ostans = response.data.Data;

                }
                $ionicLoading.hide();
                // success
            },
            function (response) { // optional
                // اخطار
                $ionicPopup.alert({
                    title: 'اخطار',
                    content: ' ارتباط با سرور برقرار نیست.'
                }).then(function (res) {
                    console.log('اخطار Connection!');
                });
            });
        $scope.getCities = function ($id) {
            $scope.loading = $ionicLoading.show({
                showBackdrop: false
            });
            var xsrf = 'Data=' + $id + '&Pass=' + Pass + '&Func=citys';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Location',
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
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
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
    .controller('LogIn', function ($scope, $http, $ionicPopup,$localstorage,$state,$rootScope,$ionicLoading,$ionicHistory,$ionicModal) {
        $scope.Error = false;
        $ionicModal.fromTemplateUrl('templates/signup.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $ionicModal.fromTemplateUrl('templates/resetpassword.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal1 = modal;
        });

        $scope.valDig=function ($obj) {
            if($obj==undefined) {
            return false;
            }
                for (n = 0; n < $obj.length; n++)
                    if (isNaN($obj.charAt(n))) {
                        console.log("not digit");
                        return false;
                    }
                return true;

        };
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
                url: apiAdd+'/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                    if (response.data.HRM.StatusCode == 200) {
                        if(response.data.Data===true)
                        {
                            $scope.$root.isLogin=true;
                            $scope.LoginClick($username);
                        }
                        else{
                            $ionicPopup.alert({
                                title: 'اخطار',
                                content: 'نام کاربری و یا رمز عبور اشتباه می باشد '
                            }).then(function (res) {
                                console.log('اخطار Login!');
                            });
                        }
                    }

                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.UserData={};
        $scope.getUserData=function($username) {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $username + '&Func=getuserdata';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {

                        $scope.UserData=response.data.Data;
                        try {
                            $localstorage.setObject('UserData', $scope.UserData);
                            $scope.$root.UserData = $scope.UserData;
                        }
                        catch (err){

                        }

                    }
                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.LoginClick=function($username)
        {
            console.log($username);
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

        $scope.repass={};
        $scope.closerepass=function()
        {
            $scope.modal1.hide();
        };
        $scope.openrepass=function()
        {
            $scope.modal1.show();
        };
        $scope.resetpassword=function()
        {
            $ionicLoading.show();
            var O = new Object();
            O.idU = $scope.repass.idU;
            //var xsrf = 'Pass=' + Pass + '&Data={"username":"'+$usrname+'","password":"'+$password+'"}';
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(O) + '&Func=resetpassword';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.result = response.data.Data;
                        if( $scope.result==true)
                        {
                            $ionicPopup.alert({
                                title: 'اطلاع',
                                content: 'رمز جدید برای شما ارسال گردید.'
                            }).then(function (res) {
                                console.log('signup Done');
                                $scope.closerepass();

                            });
                        }
                        else{
                            $ionicPopup.alert({
                                title: 'هشدار',
                                content: 'اشکال در وارد کردن اطلاعات.تغییر رمز انجام نشد !'
                            }).then(function (res) {
                                console.log('signup اخطار');
                            });
                        }
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.signup = false;
        $scope.signupData={};
        $scope.closereg=function()
        {
            $scope.modal.hide();
        };
        $scope.opensignup=function()
        {
            $scope.modal.show();
        };
        $scope.mobileValidation=function()
        {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $scope.signupData.mobile + '&Func=smsvalid';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        //$scope.value = response.data.Data;
                        console.log(response.data.Data);
                        $scope.signupData.show=false;

                    }
                    $ionicLoading.hide();
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.Signup = function () {
            var O = new Object();
            O.username = $scope.signupData.username;
            O.password = $scope.signupData.password;
            O.fname = $scope.signupData.fname;
            O.lname = $scope.signupData.lname;
            O.codemelli = $scope.signupData.codemeli;
            O.token=$scope.signupData.token;
            O.mobile=$scope.signupData.mobile;
            O.father=$scope.signupData.father;
            //var xsrf = 'Pass=' + Pass + '&Data={"username":"'+$usrname+'","password":"'+$password+'"}';
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(O) + '&Func=signup';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.result = response.data.Data;
                        if( $scope.result==true)
                        {
                            $ionicPopup.alert({
                                title: 'اطلاع',
                                content: '!ثبت نام با موفقیت انجام شد '
                            }).then(function (res) {
                                console.log('signup Done');
                                $scope.closereg();

                            });
                        }
                        else{
                            $ionicPopup.alert({
                                title: 'هشدار',
                                content: 'اشکال در وارد کردن اطلاعات.! ثبت نام صورت نگرفت '
                            }).then(function (res) {
                                console.log('signup اخطار');
                            });
                        }
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
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
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.value = response.data.Data;
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: '! ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
    })
    .controller('special', function ($scope, $http, $ionicPopup, $localstorage,$stateParams,$state,$rootScope){
        $rootScope.spe=$stateParams.name;

    })
    .controller('Search', function ($scope, $http, $ionicPopup, $localstorage,$rootScope,$ionicLoading,ApiService,userService,$state) {

        $scope.Rsearch = {};
        $scope.city='';
        $scope.doctors = [];
        $scope.hospitals = [];
        $scope.hdoctors=[];
        $scope.speciality=[];
        $scope.Data = {};
        $scope.selected = '';
        $scope.searchs = [];
        $scope.Isnull=false;
        $scope.$watch('selected', function (newValue, oldValue) {
           if(newValue=='')
           {
               $scope.doctors=[];
               $scope.hospitals = [];
               $scope.hdoctors = [];
               $scope.speciality = [];
           }
            $scope.Isnull=false;
        }, true);
        $scope.getResult = function ($search) {
            $ionicLoading.show({
                template:'...در حال جستجو کردن ',
                showBackdrop: false
            });
            $scope.saveSearch($search);
            var sendSearch=new Object();
            sendSearch.search=$search;
            sendSearch.city=$scope.city;
            //console.log(sendSearch);
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(sendSearch) + '&Func=search';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Search',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.Rsearch = response.data.Data;
                        $scope.doctors = JSON.parse($scope.Rsearch.doctors);
                        $scope.hospitals = JSON.parse($scope.Rsearch.hospitals);
                        $scope.hdoctors = JSON.parse($scope.Rsearch.hospitaldoctors);
                        $scope.speciality = JSON.parse($scope.Rsearch.Spe);
                        $scope.Isnull=true;
                        $rootScope.hide4search = true;
                        $ionicLoading.hide();

                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
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
        $scope.getCities = function () {
            $scope.loading = $ionicLoading.show({
                showBackdrop: false
            });
            var xsrf = 'Pass=' + Pass + '&Func=allcitys';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Location',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.cities = response.data.Data;
                        $scope.city=$scope.cities[0].city;
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.init = function () {
            $scope.Data = $localstorage.getObject('Data');
            /*$scope.cities=userService.getAllCities();*/
            $scope.getCities();

            if ($scope.Data.search === undefined) {
                $scope.Data.search = new Array();
            }
            else {
                $scope.searchs = $scope.Data.search;
            }
        };
        $scope.gotospe=function($spe)
        {
            $rootScope.spe=$spe;
            $state.go('app.specialResult');
        }
    })
    .controller('Hospital', function ($scope, $http, $ionicPopup, $stateParams, $ionicLoading,$rootScope) {
        //$scope.mapCreated = function (map, $l0, $l1) {
        //    $scope.map = map;
        //    //console.log(map);
        //    //$scope.centerOnLocation($l0, $l1);
        //};

        //$scope.centerOnLocation = function ($latitude, $longitude) {
        //    console.log("Centering");
        //    $scope.map.setCenter(new google.maps.LatLng($latitude, $longitude));
        //    var site = new google.maps.LatLng($latitude,$longitude);
        //    var marker = new google.maps.Marker({
        //        position: site,
        //        map: $scope.map
        //    });
        //    console.log($latitude,$longitude);
        //    marker.setIcon('img/hicon.png');
        //    directionsDisplay.setMap($scope.map);
        //    console.log("Done")
        //
        //};
        //var directionsDisplay = new google.maps.DirectionsRenderer();
        $scope.hospitals = [];
        $scope.getHospitals = function ($city, $ostan) {
            $ionicLoading.show();
            var o = new Object();
            o.city = $city;
            o.ostan = $ostan;
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(o) + '&Func=hospitals';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Hospital',
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
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.getHospitals2= function ($id) {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=hospitals2';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Hospital',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        if(response.data.Data!=null) {
                            $scope.hospitals = response.data.Data.$values;
                            console.log(response.data.Data);
                        }
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.hospital = {};
        $scope.getHospital = function ($id) {
            $ionicLoading.show();
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=hospital';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Hospital',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hospital = response.data.Data;
                        //console.log($scope.hospital);
                        //$scope.centerOnLocation($scope.hospital.map.latitude0, $scope.hospital.map.latitude1);
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPupup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.hospitaldatetime = [];
        $scope.getHospitalDateTimes = function ($id) {
            var xsrf = 'Pass=' + Pass + '&Data=' + $id + '&Func=hospitalalldatetime';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Hospital',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hospitaldatetime = response.data.Data;
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPupup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
        $scope.initHospitals = function () {
            //console.log('location data:' + location0.city);
            //console.log($rootScope.spe);
            $scope.getHospitals2($rootScope.spe);

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
                url: apiAdd+'/api/Docs',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.hdoctors = response.data.Data.$values;

                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };



        //---------------------------------------------------------------------
    })
    .controller('Util', function ($scope,$ionicHistory, $http, $ionicPopup,$localstorage,$state,$rootScope,$ionicLoading,$ionicModal) {
        $scope.backState=$ionicHistory.backView();
        console.log( $scope.backState);
        $ionicModal.fromTemplateUrl('templates/changepassword.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal2 = modal;
        });
        $scope.chpass={};
        $scope.openchpass=function()
        {
            $scope.modal2.show();
        };
        $scope.closechpass=function()
        {
            $scope.modal2.hide();
        };
        $scope.changepassword=function()
        {
            $ionicLoading.show();
            var O = new Object();
            O.oldpass = $scope.chpass.oldpass;
            O.newpass = $scope.chpass.newpass;
            O.idU = $scope.$root.UserData.idU;
            //var xsrf = 'Pass=' + Pass + '&Data={"username":"'+$usrname+'","password":"'+$password+'"}';
            var xsrf = 'Pass=' + Pass + '&Data=' + JSON.stringify(O) + '&Func=changepassword';
            $http({
                method: 'POST',
                url: apiAdd+'/api/Login',
                data: xsrf,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {

                    if (response.data.HRM.StatusCode == 200) {
                        $scope.result = response.data.Data;
                        if( $scope.result==true)
                        {
                            $ionicPopup.alert({
                                title: 'اطلاع',
                                content: 'رمز جدید برای شما ثبت گردید.'
                            }).then(function (res) {
                                console.log('signup Done');
                                $scope.closechpass();

                            });
                        }
                        else{
                            $ionicPopup.alert({
                                title: 'هشدار',
                                content: 'تغییر رمز انجام نشد ! رمز فعلی اشتباه است .'
                            }).then(function (res) {
                                console.log('signup اخطار');
                            });
                        }
                        $ionicLoading.hide();
                    }
                    // success
                },
                function (response) { // optional
                    // اخطار
                    $ionicPopup.alert({
                        title: 'اخطار',
                        content: ' ارتباط با سرور برقرار نیست.'
                    }).then(function (res) {
                        console.log('اخطار Connection!');
                    });
                });
        };
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
                template: '...آماداه سازی نقشه '
            });
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log('Got pos', pos);
                // $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.pos.lat= pos.coords.latitude;
                $scope.pos.lng= pos.coords.longitude;
                $ionicLoading.hide();
            }, function (error) {
                $ionicPopup.alert({
                    title: 'اخطار',
                    content: 'Unable to get location: ' + error.message
                }).then(function (res) {
                    console.log('اخطار Connection!');
                });
            });

            $scope.map.setCenter(new google.maps.LatLng($latitude, $longitude));
            var site = new google.maps.LatLng($latitude,$longitude);
            var marker = new google.maps.Marker({
                position: site,
                map: $scope.map,
                title: 'مطب'
            });
            marker.setIcon('img/hicon.png');
            $ionicLoading.hide();
            directionsDisplay.setMap($scope.map);
            console.log("Done");
        };
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        $scope.calcRoute=function() {
            $ionicLoading.show({
                template: '...مسیر دهی'
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
        };
        $scope.positions = [];
        $scope.pos={};
    })
    .service('ApiService',function($http,$ionicLoading,$ionicPopup)
    {
        return({
            getAllCities: getAllCities
        });
        function getAllCities($id)

            {

                var xsrf = 'Data=' + $id + '&Pass=' + Pass + '&Func=allcitys';
                var request= $http({
                    method: 'POST',
                    url: apiAdd+'/api/Location',
                    data: xsrf,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
                return( request.then( handleSuccess, handleError ) );
                    /*.then(function (response) {

                        if (response.data.HRM.StatusCode == 200) {

                            return response.data.Data;

                        }
                        // success
                    },
                    function (response) { // optional
                        // اخطار

                        $ionicPopup.alert({
                            title: 'اخطار',
                            content: ' ارتباط با سرور برقرار نیست.'
                        }).then(function (res) {
                            console.log('اخطار Connection!');
                        });
                    });*/
            };
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
            ) {
                 console.log( "An unknown error occurred." ) ;
            }
            // Otherwise, use expected error message.
            console.log(response.data.message );

            return null;
        }
        function handleSuccess( response ) {
            if (response.data.HRM.StatusCode == 200) {
                return ( response.data );
            }
            else{
                return null;
            }
        }

    })
    .factory('userService', function($http) {
        return {
            getAllCities: function(){
                var xsrf ='&Pass=' + Pass + '&Func=allcitys';
                $http({
                    method: 'POST',
                    url: apiAdd+'/api/Location',
                    data: xsrf,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {

                        if (response.data.HRM.StatusCode == 200) {
                            console.log(response.data.Data);
                            return response.data.Data;
                        }
                        // success
                    },
                    function (response) { // optional
                        // اخطار
                        console.log("ERR!");
                        return null;
                    });
            }
        }
    })

;

