angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $firebase) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PantouflesCtrl', function($scope, $firebase) {
  var sync = $firebase(new Firebase('https://radiant-torch-6239.firebaseio.com/Slipper'));
  var pantoufles = sync.$asArray();
  pantoufles.$loaded().then(function(){
    $scope.pantoufles = pantoufles;
    $scope.getRandomPantoufle();
  });

  $scope.getRandomPantoufle = function(){

    var pantoufle = null;
    var id = 0;

    while(!pantoufle){
      id = Math.floor(Math.random() * $scope.pantoufles.length);
      pantoufle = $scope.pantoufles.$getRecord(id.toString());
      // console.log(pantoufle);
      console.log('Retrieved record #' + id);  
    }

    $scope.pantoufle = pantoufle;
  };

  $scope.rate = function(rating){
    // Update the vote
    $scope.pantoufle.rating.votes++;
    $scope.pantoufle.rating.total += rating;

    // Save rating to Firebase
    $scope.pantoufles.$save($scope.pantoufle);

    // update cookie
    // $scope.alreadyRated[$scope.pantoufle.$id] = {
    //   'rating': rating,
    //   'last-rated': new Date() 
    // };
    // $cookieStore.put('pantoufle.rated', $scope.alreadyRated);
    // console.log($scope.alreadyRated);
    
    // Get a new pantoufle at random      
    $scope.getRandomPantoufle();
  };

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
