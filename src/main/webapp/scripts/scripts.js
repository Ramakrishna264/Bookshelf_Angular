var myApp = angular
       .module("myModule", ["ngRoute"])
       .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.html",
                controller: "booksController"
            })
            .when("/search", {
                templateUrl: "search.html",
                controller: "booksController"
            })
    })
    .controller("booksController",function($scope,$http){
    $http.get("http://localhost:8080/testapp/test4/getBooks")
    .then(function (response) {
      $scope.books = response.data;
       });
  $scope.updateStatus = function(book) {
          $http.post("http://localhost:8080/testapp/test4/updateBook",book);
  }
})

