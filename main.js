'use strict';

var app = angular.module('routingTest', ['ui.router', 'ngStorage']); 

app.config(function($stateProvider, $urlRouterProvider, $localStorageProvider) {
  $stateProvider
    .state('home', {url: '/', templateUrl: './partials/home.html', controller: 'homeCtrl' })
    .state('add', {url: '/add', templateUrl: './partials/add.html', controller: 'addCtrl' })
    .state('list', {url: '/list', templateUrl: './partials/list.html', controller: 'listCtrl' })
  
  $urlRouterProvider.otherwise('/'); 
});

app.controller('homeCtrl', function($scope, $state, $localStorage, Stock) {
  // $scope.$storage = $localStorage; 
  // if (!$scope.$storage.stocks || !$scope.$storage.symbols) {
  //   $scope.$storage = $localStorage.$default({
  //     symbols: [],
  //     stocks: []
  //   });
  // };

  // Stock.symbols = $scope.$storage.symbols; 
  // Stock.list = $scope.$storage.stocks; 
});

app.controller('listCtrl', function($scope, $state, $localStorage, Stock) {
  $scope.stocks = Stock.list; 
  $scope.removeStock = function(symbol) {
    Stock.remove(symbol);
    // $scope.$storage.symbols = Stock.symbols;
    // $scope.$storage.stocks = Stock.list;
  }
});

app.controller('addCtrl', function($scope, $http, $localStorage, Stock){
  $scope.addStock = function() {
    var cleanSymbol = $scope.newSymbol.toUpperCase().replace(/\W/, '')
    $scope.newSymbol = ''; 
    Stock.addSymbol(cleanSymbol); 
    // $scope.$storage.symbols = Stock.symbols;
    // $scope.$storage.stocks = Stock.list;
  }

  $scope.search = function() {
    Stock.lookUp($scope.input.replace(/\W/, '')); 
    $scope.lookResults = Stock.lookResults; 
  }

  $scope.quickAdd = function(symbol, $localStorage) {    
    Stock.addSymbol(symbol); 
    // $scope.$storage.symbols = Stock.symbols;
    // $scope.$storage.stocks = Stock.list;
  }

});

app.service('Stock', function($http, $localStorage){
  
  if (!$localStorage.stocks || !$localStorage.symbols) {
    $localStorage.$default({
      symbols: [],
      stocks: []
    });
  };



  this.list = $localStorage.stocks; 
  this.symbols = $localStorage.symbols; 
  this.lookResults = []; 

  this.addSymbol = function(symbol) {
    if (this.symbols.indexOf(symbol)!==-1) {
      sweetAlert("You already have " + symbol, "error");
      return; 
    };
    this.symbols.push(symbol); 
    var apiSymbol = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=';
    var jsonp = '&jsoncallback=JSON_CALLBACK'; 
    
    $http.jsonp(apiSymbol + symbol + jsonp)
    .then(res => {      
      this.list.push(res.data);
      $localStorage.stocks = this.list; 
      $localStorage.symbols = this.symbols; 
      swal(symbol + " successfully added!", "success")
    }, function(res) {
      console.log('error:', res);
    });
  }; 

  this.remove = function(symbol) {
    var index = this.symbols.indexOf(symbol);
    this.symbols.splice(index, 1);
    this.list.splice(index, 1);
    $localStorage.stocks = this.list; 
    $localStorage.symbols = this.symbols; 
    swal(symbol + " successfully removed!", "success")
  };

  this.lookUp = function(input){
    if (this.lookResults.length !== 0) {
      this.lookResults = []; 
    };
    var apiLookup = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=';
    var jsonp = '&jsoncallback=JSON_CALLBACK'; 
    
    $http.jsonp(apiLookup + input + jsonp)
    .then(res => {
      console.log('success:', res);
      res.data.forEach(entry => {
        this.lookResults.push(entry);
      })
    }, function(res) {
      console.log('error:', res);
    }); 
  }

});











