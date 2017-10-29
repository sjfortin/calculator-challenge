var app = angular.module('SezzleChallengeApp', []);
var socket = io();

app.controller('SezzleChallengeController', ['$http', function ($http) {

    var self = this;

    self.allCalculations = {
        list: []
    }

    // All Calculations GET request
    self.getCalculations = function () {
        $http({
            method: 'GET',
            url: '/calculations'
        }).then(function (response) {
            self.allCalculations.list = response.data;
            self.allCalculations.list.forEach(function (calc) {
                calc.result = eval(calc.first_number + calc.operator + calc.second_number)
            })
        });
    }

    // Add Calculation POST request
    self.addCalculation = function () {
        $http({
            method: 'POST',
            url: '/calculations',
            data: self.newCalculation
        }).then(function (response) {
            socket.emit('requestAllCalculations', "update all calculations across connections");
            self.newCalculation = {}
        });
    };

    socket.on('sendAllCalculations', function (message) {
        self.getCalculations();
    });

    self.getCalculations();


}]);

