var app = angular.module('CalculatorChallengeApp', []);
var socket = io();

app.controller('CalculatorChallengeController', ['$http', function ($http) {

    var self = this;

    self.operatorSelected = '';
    self.newCalculation = {
        first_number: '',
        second_number: '',
        operator: ''
    };
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
        console.log('self.newCalculation', self.newCalculation);

        if (self.newCalculation.first_number === '' || self.newCalculation.second_number == '' || self.newCalculation.operator == '') {
            self.errorMessage = 'Please try again. Make sure to enter in both numbers and select an operator.'
        } else {
            $http({
                method: 'POST',
                url: '/calculations',
                data: self.newCalculation
            }).then(function (response) {
                socket.emit('requestAllCalculations', "update all calculations across connections");
                self.newCalculation = {
                    first_number: '',
                    second_number: '',
                    operator: ''
                };
                self.errorMessage = '';
            });
        }
    };

    socket.on('sendAllCalculations', function (message) {
        self.getCalculations();
    });

    self.getCalculations();


}]);

