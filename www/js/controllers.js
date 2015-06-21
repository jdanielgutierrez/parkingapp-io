angular.module('starter.controllers', ['firebase','ngCordova','ionic.service.core'])

.controller('DashCtrl', function($scope, $firebaseArray) {

	$scope.ref = new Firebase("https://parkingapp-dg.firebaseio.com/parkings");
	$scope.parkings = $firebaseArray($scope.ref);
	//$scope.products = [{'name':'Iphone', 'prices': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}, {'name':'Samsung', 'prices': 78.10, 'img': 'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}] 
  $scope.remove = function(parking) {
    console.log('Delete parking '+parking.$id);
    var itemRef = new Firebase("https://parkingapp-dg.firebaseio.com/parkings/" + parking.$id);
    itemRef.remove();

//    parking.remove();
  }

})

.controller('DashFormCtrl', function($scope, $firebaseArray, $rootScope, $state, $cordovaCamera, $cordovaGeolocation) {

//	$scope.product = {name: '', sale_price: '', content: {description: ''}, photo: ''};
 // $scope.parking = {address: '', schedule: '', rate:'' , latitude:'', longitude:'', photo: '', hrs_ini: '', hrs_end: ''};
    //document.addEventListener("deviceready", function () {

     $rootScope.parking = {address: '', schedule: '', rate:'' , latitude:-17.3933, longitude:-66.1570, photo: '', hrs_ini: '', hrs_end: ''};
/*
      var myLatlng = new google.maps.LatLng(-17.37, -66.15);

      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);


      var marker = new google.maps.Marker({
              position: new google.maps.LatLng(-17.37, -66.15),
              map: map,
              title: "Mi locacion",
              options: { draggable: true }
      });


    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      console.log(position);
      $scope.parking.latitude  = position.coords.latitude
      $scope.parking.longitude = position.coords.longitude

      map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          
      marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

    }, function(err) {
        console.log(err);
    });


    var watchOptions = {
      frequency : 1000,
      timeout : 3000,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function(err) {
        console.log(err);
      },
      function(position) {
        console.log(position);
        $scope.parking.latitude  = position.coords.latitude;
        $scope.parking.longitude = position.coords.longitude;

        marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

    });

    google.maps.event.addListener(marker, 'dragend', function() {
        $scope.$apply(function(){
          //Stop listening changes
          watch.clearWatch();
          var pos = marker.getPosition();
          console.log(pos);
          $scope.parking.latitude  = pos.A;
          $scope.parking.longitude = pos.F;
        });
    });



*/


    $scope.takePicture = function() {
          var options = {
              quality : 75,
              destinationType : Camera.DestinationType.DATA_URL,
              sourceType : Camera.PictureSourceType.CAMERA,
              allowEdit : true,
              encodingType: Camera.EncodingType.JPEG,
              popoverOptions: CameraPopoverOptions,
              targetWidth: 500,
              targetHeight: 500,
              saveToPhotoAlbum: false
          };
          $cordovaCamera.getPicture(options).then(function(imageData) {
              //syncArray.$add({image: imageData}).then(function() {
              //    alert("Image has been uploaded");
              //});
              console.log(imageData);
              $scope.parking.photo = imageData;

          }, function(error) {
              console.error(error);
          });
      }
    //}, false);

    $scope.uploadParking = function() {
      var parkingRef =  $rootScope.refirebase.child("parkings").push($scope.parking);
      var parkingId = parkingRef.key();
      console.log(parkingId);
      $state.go('tab.dash-detail',{parkingId: parkingId});
    }

    $scope.selectLocation = function() {
      /*
      var parkingRef =  $rootScope.refirebase.child("parkings").push($scope.parking);
      var parkingId = parkingRef.key();
      console.log(parkingId);
      */
      //$state.go('tab.dash-form-map',{parkingId: parkingId});
      console.log('Seleccionar mapa');
      $state.go('tab.dash-form-map');
    }

})


.controller('DashFormMapCtrl', function($scope, $firebaseArray, $rootScope, $state, $cordovaCamera, $cordovaGeolocation) {

     console.log("esta aqui");

    // $scope.parking = {address: '', schedule: '', rate:'' , latitude:-17.3933, longitude:-66.1570, photo: '', hrs_ini: '', hrs_end: ''};

      var myLatlng = new google.maps.LatLng(-17.3933, -66.1570);

      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);


      var marker = new google.maps.Marker({
              position: new google.maps.LatLng(-17.3933, -66.1570),
              map: map,
              title: "Mi locacion",
              options: { draggable: true }
      });

/*
    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      console.log(position);
      $scope.parking.latitude  = position.coords.latitude
      $scope.parking.longitude = position.coords.longitude

      map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          
      marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

    }, function(err) {
        console.log(err);
    });


    var watchOptions = {
      frequency : 1000,
      timeout : 3000,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function(err) {
        console.log(err);
      },
      function(position) {
        console.log(position);
        $scope.parking.latitude  = position.coords.latitude;
        $scope.parking.longitude = position.coords.longitude;

        marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

    });
*/
    google.maps.event.addListener(marker, 'dragend', function() {
        $scope.$apply(function(){
          //Stop listening changes
        //  watch.clearWatch();
          var pos = marker.getPosition();
          console.log(pos);
          $rootScope.parking.latitude  = pos.A;
          $rootScope.parking.longitude = pos.F;

          $scope.parking.latitude  = pos.A;
          $scope.parking.longitude = pos.F;
        });
    });

   console.log("llego aqui");


})

.controller('ChatsCtrl', function($scope, Chats, $rootScope, $state, $ionicHistory) {

  if (!$rootScope.userSignedIn()){
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
  	$state.go('sign-in');
  }
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('DashDetailCtrl', function($scope, $stateParams, $firebaseObject) {

	var ref = new Firebase("https://parkingapp-dg.firebaseio.com/parkings/"+$stateParams.parkingId);

	$scope.parking = $firebaseObject(ref);
	console.log($scope.parking);


  $scope.parking.$loaded().then(function() {
    $scope.loadMap();
  });

  $scope.loadMap = function(){

    console.log("Parking");

    console.log($scope.parking.latitude);
    console.log($scope.parking.longitude);

    var myLatlng = new google.maps.LatLng($scope.parking.latitude, $scope.parking.longitude);

    console.log(myLatlng);

    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map1"), mapOptions);

    var marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.parking.latitude, $scope.parking.longitude),
            map: map,
            title: "Rate:" + $scope.parking.rate
    });
  }  



})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SignInCtrl', ['$scope', '$rootScope', '$window', '$localstorage' , '$ionicUser', 
  function ($scope, $rootScope, $window, $localstorage, $ionicUser) {
     // check session
     //$rootScope.checkSession();
     $scope.user = {
        email: "",
        password: ""
     };


     $scope.validateUser = function () {
        $rootScope.show('Please wait.. Authenticating');
        var email = this.user.email;
        var password = this.user.password;
        if (!email || !password) {
           $rootScope.notify("Please enter valid credentials");
           return false;
        }
        function authHandler(error, authData) {
          if (error) {
                $rootScope.hide();
                if (error.code == 'INVALID_EMAIL') {
                  $rootScope.notify('Invalid Email Address');
                }
                else if (error.code == 'INVALID_PASSWORD') {
                  $rootScope.notify('Invalid Password');
                }
                else if (error.code == 'INVALID_USER') {
                  $rootScope.notify('Invalid User');
                }
                else {
                  $rootScope.notify('Oops something went wrong. Please try again later');
                }
              }
            else {
              $rootScope.hide();
              console.log(authData);
              $rootScope.token = authData.token;
              $localstorage.set('token', authData.token);
              //console.log($localstorage.get('token', authData.token));
              //console.log($window.localStorage);

              $ionicUser.identify({
                user_id: authData.uid,
                email: email              
              }).then(function() {
                console.log("Success identify User");
              }, function(err) {
                  console.log("Error identify User");
                  console.log(err);
              });;
              $window.location.href = ('#/tabs/dash');
          }
        }
        $rootScope.refirebase.authWithPassword({
          email    : email,
          password : password
        }, authHandler);
     }
  }
])

 .controller('SignUpCtrl', [
    '$scope', '$rootScope',  '$window',
    function ($scope, $rootScope, $window) {
      
      $scope.user = {
        email: "",
        password: ""
      };

      $scope.createUser = function () {
 
		var ref = new Firebase("https://parkingapp-dg.firebaseio.com");


        if (!$scope.user.email || !$scope.user.password) {
          $rootScope.notify("Please enter valid credentials");
          return false;
        }
 
        $rootScope.show('Please wait.. Registering');

        $rootScope.refirebase.createUser($scope.user, function (error, user) {
          if (!error) {
          	console.log(user);
            $rootScope.hide();
            $rootScope.refirebase.child("users").child(user.uid).set({
              provider: 'password',
              email: $scope.user.email
            });
            //$rootScope.token = user.token;
            $window.location.href = ('#/');
          }
          else {
            $rootScope.hide();
            if (error.code == 'INVALID_EMAIL') {
              $rootScope.notify('Invalid Email Address');
            }
            else if (error.code == 'EMAIL_TAKEN') {
              $rootScope.notify('Email Address already taken');
            }
            else {
              $rootScope.notify('Oops something went wrong. Please try again later');
            }
          }
        });
      }
    }
  ])



.controller('AccountCtrl', function($scope, $rootScope, $state) {
  if (!$rootScope.userSignedIn()){
  	$state.go('sign-in');
  }
  $scope.settings = {
    enableFriends: true
  };
});

