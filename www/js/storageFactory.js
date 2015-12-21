angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    
    key:'ToDo',

    setArray: function(value) {
      var key = 'ToDo';
      $window.localStorage[key] = JSON.stringify(value);
    },
    getArray: function() {
      var key = 'ToDo';
      return JSON.parse($window.localStorage[key] || '[]');
    }
  }
}]);