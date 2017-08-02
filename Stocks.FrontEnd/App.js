var App = angular.module('App', []);
App.factory("api", ["$http", "$rootScope", "$q", function ($http, $rootScope, $q) {

    function send(method, url, params, data,headers) {
        return $http({
            method: method,
            url: "localhost:8080/" + url,
            params: params,
            data: data,
            headers: headers
        });
    }

    function Get(url, params, data, headers) { return send("GET", url, params, data, headers); }

    function Put(url, params, data, headers) { return send("PUT", url, params, data, headers); }

    function Post(url, params, data, headers) { return send("POST", url, params, data, headers); }

    function Delete(url, params, data, headers) { return send("DELETE", url, params, data, headers); }


    return {
        Get: Get,
        Post: Post,
        Put: Put,
        Delete: Delete
    };
}]); 
App.controller('stocksController', function ($scope,stocksService) {
    $scope.chartStocks = [];
    $scope.chartStocksData = [];
    $scope.chartLabels = [];
    $scope.getStocks = function () {
        stocksService.getStocks(function (response) {
            console.log(response);

            if (response.success) {
                if (response.stocks != null) {
                    for (var i = 0; i < response.stocks.length; i++) {
                        $scope.chartStocks.push(response.stocks[i]);
                        $scope.chartStocksData.push(response.stocks[i].price);
                        $scope.chartLabels.push(response.stocks[i].name);
                    }
                }
            }
        });
    };
    $scope.getStocks();

});
