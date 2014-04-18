'use strict';

angular.module('googleCloudEndpointsApp')
.controller('MainCtrl', function ($scope, $http) {

  $scope.items = [];



  $scope.listItems = function() {
    // setup items
    gapi.client.helloworld.list().execute(function(resp) {
      $scope.items = resp.items;
      // apply update
      $scope.$apply();
    });
  }

  // List items by default
  $scope.listItems();

  $scope.addItem = function(author, content) {
    var item = {
      'author': author,
      'content': content
    };

    gapi.client.helloworld.add(item).execute(function(resp) {
      $scope.listItems();
    });
  };


  $scope.removeItem = function(indexId) {
    var item = $scope.items[indexId];
    console.log("removing item with id" + item.id);

         $http({method: 'DELETE', url: '/_ah/api/helloworld/v1/greeting/' + item.id}).
    success(function(data, status, headers, config) {
      console.log("successfuly remove item with id" + item.id);
      $scope.listItems();
    }).
    error(function(data, status, headers, config) {
console.log("error while removing item with id" + item.id);
    });

    //gapi.client.helloworld.remove("" + item.id).execute(function(resp) {
    //  $scope.listItems();
    //});
  };

});
