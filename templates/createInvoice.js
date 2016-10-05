(function() {

  'use strict';

  angular
    .module('facturi')
    .controller('createInvoiceController', createInvoiceController);

  function createInvoiceController($http) {
    $http.post('http://localhost:3001/api/createInvoice')
        .success(function(data) {
          console.log(data.message);
        });
  }

})();