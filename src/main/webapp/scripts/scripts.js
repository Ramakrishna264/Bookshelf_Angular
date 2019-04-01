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
    $http.get("http://localhost:8080/testapp/test/getBooks")
    .then(function (response) {
        $scope.books = response.data;
       
       count = response.data.length;
       $scope.cur_read = 0;
       $scope.want_read = 0;
       $scope.read = 0;
      for(var i=0;i<count;i++) {
            if($scope.books[i].status== 'CURRENTLY_READING') {
                $scope.cur_read++;
            } else if($scope.books[i].status== 'WANT_TO_READ') {
                $scope.want_read++;
            } else if($scope.books[i].status== 'READ') {
                $scope.read++;
            }
      }
    });
  $scope.updateStatus = function(book) {
          $http.post("http://localhost:8080/testapp/test/updateBook",book).then(function (response) {
            window.location.reload();
        })
  }
  $scope.deleteBook = function(book) {
         var message = "Are you sure?";
         if( confirm( message ) ) {
            book.status  = 'NONE';
            $http.post("http://localhost:8080/testapp/test/updateBook",book);
           }
  }
})
