angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  var key = 'ToDo';
  return {    
    setArray: function(value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getArray: function() {
      return JSON.parse($window.localStorage[key] || '[]');
    }
  }
}]);