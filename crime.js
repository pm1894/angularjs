  var app = angular.module('myApp', []);
  app.controller('crimeCtrl',function($scope, $http,orderByFilter) {
    $scope.resetValue='';
    $scope.pageSize= 4;
    currentPage= 1;
    $scope.orderProp="year";
    $http.get("crimes.json").then(function (response) {
    $scope.year = response.data;
    $scope.original = response.data;
      //console.log("From cons "+$scope.year[0].year);
    $scope.copy=$scope.year;

$scope.buttonCount(1);
  });

//pagenation
  $scope.buttonCount = function(pageValue)
  {

    length=$scope.year.length;
    $scope.pages=[];
    totalPages= Math.ceil($scope.year.length/$scope.pageSize);
    endValue = (pageValue) * $scope.pageSize;
   $scope.begin=(endValue-$scope.pageSize);
    for(var i=1;i<=totalPages;i++){
      $scope.pages.push(i);
    }
    $scope.year=orderByFilter($scope.year, '+year');
  }

  //add data
  $scope.add= function()
  {
    console.log("in Add Function");
    $scope.obj = {};
    $scope.obj.year= $scope.cyear.toString();
    $scope.obj.under500=parseFloat($scope.aunder500);
    $scope.obj.over500=parseFloat($scope.aover500);
    $scope.year.push($scope.obj);
    $scope.original.push($scope.obj);
    $scope.copy=$scope.year;
    console.log($scope.obj);
    $scope.buttonCount(currentPage);

  };

  $scope.reset= function()
  {
    $scope.cyear=$scope.resetValue;
    $scope.aunder500= $scope.resetValue;
    $scope.aover500= $scope.resetValue;
  };
  //search
$scope.search_fn=function(num,orderProp){
  console.log(orderProp);
  console.log($scope.copy);
  $scope.year=$scope.original;
  $scope.data1=[];
  // $scope.temp=$scope.year;
  for(var j=0;j<$scope.year.length;j++)
  {
    if(orderProp=="year" && $scope.num<=$scope.year[j].year){
      $scope.data1.push($scope.year[j]);
    }
    else if (orderProp=="under500" && $scope.num<=$scope.year[j].under500){
      $scope.data1.push($scope.year[j]);
    }
    else if (orderProp=="over500" && $scope.num<=$scope.year[j].over500){
      $scope.data1.push($scope.year[j]);
    }
    else if($scope.num=="All"||$scope.num=="ALL" ||$scope.num=="all" )
  {
      $scope.data1.push($scope.year[j]);
  }
}
  // $scope.year=[];
  $scope.year=$scope.data1;
  console.log($scope.year);
  //console.log($scope.);
  $scope.buttonCount(currentPage);
}

 //delete
  $scope.remove=function (value){
    for(var k=0;k<$scope.original.length;k++){
      if($scope.year[k].year==value){
        for(var j=k;j<(($scope.original.length)-1);j++){
          $scope.original[j].year=$scope.original[j+1].year;
          $scope.original[j].under500=$scope.original[j+1].under500;
          $scope.original[j].over500=$scope.original[j+1].over500;
        }
        $scope.original.pop();
        $scope.year.pop();
        $scope.copy=$scope.year;
        break;
      }
    }
    $scope.buttonCount(currentPage);
  };

 $scope.reverse = false;

 $scope.sortBy = function(propertyName) {
   $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : true;
   $scope.propertyName = propertyName;
 };
});

//directive for table
app.directive('myTable', function() {
  return {
    templateUrl: 'mytable.html'
  }
});
