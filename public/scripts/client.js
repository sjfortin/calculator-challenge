var app = angular.module('SezzleChallengeApp', []);

app.controller('SezzleChallengeController', ['$http', function ($http) {

    var self = this;

    self.allCalculations = {
        list: []
    }

    // Employee GET request
    self.getCalculations = function () {
        $http({
            method: 'GET',
            url: '/calculations'
        }).then(function (response) {
            self.allCalculations.list = response.data;

            self.allCalculations.list.forEach(function (calc) {
                calc.result = eval(calc.first_number + calc.operator + calc.second_number)
            })
            console.log('self.allCalculations', self.allCalculations);
        });
    }

    // Employee POST request
    self.addCalculation = function () {

        $http({
            method: 'POST',
            url: '/calculations',
            data: self.newCalculation
        }).then(function (response) {
            self.getCalculations();
            self.newCalculation = {}
        });
    };

    self.getCalculations();


}]);