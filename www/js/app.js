
var app = angular.module('ToDo', ['ionic', 'ionic.utils'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('ToDoCtrl', function($scope, $ionicModal, $localstorage){
  $scope.tasks = $localstorage.getArray();
  $ionicModal.fromTemplateUrl('views/task.html', {
    scope:$scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.taskModal = modal 
  });

  function Task(title, description, done){
    this.title = title || '';
    this.description = description || '';
    this.done = done || false;
  }

  $scope.addNewTask = function(){
    $scope.activeTask = new Task();
    $scope.creatingNewTask = true;
    $scope.taskModal.show();
  }

  $scope.closeTask = function(){
    $scope.taskModal.hide();
  };

  $scope.openTask = function(id){
    $scope.activeTask = angular.copy($scope.tasks[id]);
    $scope.creatingNewTask = false;
    $scope.currentTaskId = id;
    $scope.taskModal.show();
  }

  $scope.deleteTask = function(id){
    $scope.tasks.splice(id,1);
    $scope.saveToStorage();
  }

  $scope.saveTask = function(activeTask){
    var newTask = angular.copy(activeTask)
    if($scope.creatingNewTask){
      $scope.tasks.push(newTask);
    }else{
      var currentId = $scope.currentTaskId
      angular.copy(newTask, $scope.tasks[currentId])
    }
    $scope.closeTask();
    $scope.saveToStorage();
  }

  $scope.saveToStorage = function(){
    $localstorage.setArray($scope.tasks);
  }


});
