App.controller("stocksController", ['$scope', '$localStorage', 'stocksService',
    function ($scope, $localStorage, stocksService) {
    $scope.flags = {};
    $scope.flags.showChart = false;
    $scope.flags.showCarousal = false;
    $scope.flags.showLoading = true;
    //=========================vars==========================================================
    $scope.data = {};
    $scope.user = {};
    //=========================Carousal vars================================================== 
    $scope.curPage = 0;
    $scope.pageSize = 5;
    $scope.data.stocks = [{}];
    $scope.data.followedStocks = [];
    $scope.data.unfollowedStocks = [];
    //=========================Chart vars====================================================== 
    $scope.chartStocks = [];
    $scope.chartStocksData = [];
    $scope.chartLabels = [];
    //=========================functions=======================================================
    alert('hi"');
    $scope.getFollowedStocks = function () {
        $scope.flags.showLoading = true;
        $scope.flags.showChart = false;
        stocksService.getAllStocks(function (response) {
                if (response.success) {
                    if (response.stocks != null) {
                        for (var i = 0; i < response.stocks.length; i++) {
                            $scope.chartStocks.push(response.stocks[i]);
                            $scope.chartStocksData.push(response.stocks[i].Price);
                            $scope.chartLabels.push(response.stocks[i].Code);
                        }
                        $scope.flags.showLoading = false;
                        $scope.flags.showChart = true;
                    }
                }
                else {
                    $scope.flags.showLoading = false;
                    console.log("Failed to retrieve stocks :")
                    console.log(response.error)
                    swal({ title: "", text: "=", timer: 3000, showConfirmButton: false });
                    swal("Error!Please refresh the page or contact your administrator!", "", "error");
                }
            });
         
    };
	   $scope.getStockPrices = function () {
        if (isLoggedIn == true) {
            stocksService.getStockPrices($scope.chartStocksData.length, function (response) {
                if (response.success) {
                    if (response.prices != null) {
                        for (var i = 0; i < $scope.chartStocksData.length; i++) {
                            $scope.chartStocksData.pop();
                        }
                        for (var i = 0; i < response.prices.length; i++) {
                            $scope.chartStocksData.push(response.prices[i]);
                        }
                    }
                }
                else {
                    console.log("Failed to retrieve prices:")
                    console.log(response.error)
                }
            });
        } 
    };
   
    //=========================excution=========================================================
    $scope.getFollowedStocks(); 
    setInterval($scope.getStockPrices, 10000);
    }]);