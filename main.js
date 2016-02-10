'use strict';

var app = angular.module('routingTest', ['ui.router']); 

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {url: '/', templateUrl: './partials/home.html' })
    .state('add', {url: '/add', templateUrl: './partials/add.html', controller: 'addCtrl' })
    .state('list', {url: '/list', templateUrl: './partials/list.html', controller: 'listCtrl' })
  
  $urlRouterProvider.otherwise('/'); 
});

app.controller('listCtrl', function($scope, $state, Stock) {
  $scope.stocks = Stock.list; 
});

app.controller('addCtrl', function($scope, $http, Stock){
  $scope.addStock = function() {
    var cleanSymbol = $scope.newSymbol.toUpperCase().replace(/\W/, '')
    $scope.newSymbol = ''; 
    Stock.addSymbol(cleanSymbol); 
  }

  $scope.search = function() {
    Stock.lookUp($scope.input.replace(/\W/, '')); 
    $scope.lookResults = Stock.lookResults; 
  }

  $scope.quickAdd = function(symbol) {
    console.log("result", symbol);
    Stock.addSymbol(symbol); 
  }

});

app.service('Stock', function($http){
  this.list = []; 
  this.symbols = []; 
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
      swal(symbol + " successfully added!", "success")
    }, function(res) {
      console.log('error:', res);
    });
  }; 

  // this.remove = function(stock) {
  //   var index = this.list.indexOf(stock);
  //   this.list.splice(index, 1);
  // };

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











