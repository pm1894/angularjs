var myApp=angular.module('myApp',['core']);
myApp.controller('myComponentController',function myComponentController($scope)

{});
angular.module('myApp').
component('myComponent',{
  templateUrl:'mytable.html',
  controller:['$http',
  function myComponentController($http){
    var self = this;
    self.currentPage = 0;
    self.pageSize = 4;
    $http.get('crimes.json').then(function(content){
      self.crime=content.data;
      self.len= Math.ceil(self.crime.length);
      self.pageCount = (Math.ceil(self.crime.length/self.pageSize));
    });
  }
]
});
