App.factory("stocksService", ["$rootScope", "api", function ($rootScope, api) {
    var service = {};
    //=============================Get All Stocks===============================
    service.getStocks = function (callback) {
        api.Get('api/stocks', '', '', '').success(function (response) {
            console.log(response);
            callback({ success: true, stocks: JSON.parse(response) });
        }).error(function (error) {
            callback({ success: false, error: error });
        });
    };
   return service;
}]);
