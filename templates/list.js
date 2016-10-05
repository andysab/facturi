(function() {

  'use strict';

angular
  .module('facturi')
  .controller('listController', function($scope, $mdDialog) {
    $scope.toppings = [
      { name: 'Pepperoni', wanted: true },
      { name: 'Sausage', wanted: false },
      { name: 'Black Olives', wanted: true },
      { name: 'Green Peppers', wanted: false }
    ];
});

})();