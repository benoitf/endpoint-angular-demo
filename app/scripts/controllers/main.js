'use strict';

angular.module('googleCloudEndpointsApp')
.controller('MainCtrl', function ($scope, $http) {

  $scope.items = [];



  $scope.listItems = function() {
    // setup items
    gapi.client.helloworldsql.list().execute(function(resp) {
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
    console.log("Adding item with author" + author + "and content=" + content);

    gapi.client.helloworldsql.add(item).execute(function(resp) {
      $scope.listItems();
    });
  };


  $scope.removeItem = function(indexId) {
    var item = $scope.items[indexId];
    console.log("removing item with id" + item.id);

    var entry = {
      'id': item.id
    };

    gapi.client.helloworldsql.remove(entry).execute(function(resp) {
      $scope.listItems();
    });
  };

});
