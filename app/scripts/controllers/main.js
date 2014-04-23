'use strict';

angular.module('googleCloudEndpointsApp')
.controller('MainCtrl', function ($scope, $http, $resource) {
  $scope.items = [];

  $scope.listItems = function() {
    // setup items
    gapi.client.factory.list().execute(function(resp) {
      $scope.items = resp.items;
      // apply update
      $scope.$apply();
    });
  }

  // List items by default
  $scope.listItems();

  $scope.addItem = function(owner, url) {
    var item = {
      'owner': owner,
      'url': url
    };
    console.log("Adding item with owner" + owner + "and url " + url);

    gapi.client.factory.add(item).execute(function(resp) {
      $scope.listItems();
    });
  };


  $scope.removeItem = function(indexId) {
    var item = $scope.items[indexId];
    console.log("removing item with id" + item.id);

    var entry = {
      'id': item.id
    };
    
    // using resource service
    var factory = $resource('https://1-dot-wise-cycling-550.appspot.com/_ah/api/factory/v1/factory/:factoryId', {factoryId:item.id});
    factory.delete( function() {
      $scope.listItems();
    });

    //gapi.client.factory.remove(entry).execute(function(resp) {
    //  $scope.listItems();
    //});
  };

});
