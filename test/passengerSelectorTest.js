define([
    'angular-mocks',
    'passengerSelector/passengerSelector'
], function (ngMock, passengerSelector) {
    'use strict';

    describe('passengerSelector directive', function () {
        var elem, $rootScope, directiveScope;

        beforeEach(module('app.passengerSelector'));

        beforeEach(inject(function($compile, _$rootScope_) {
            elem = angular.element('<passenger-selector ' +
                'adult-passengers="0"  ' +
                'child-passengers="0"  ' +
                'infant-passengers="0" ' +
                'update-passenger-count-callback="updateCallback(adults, children, infants)"></passenger-selector>');

            $rootScope = _$rootScope_;
            directiveScope = $rootScope.$new();
            $rootScope.updateCallback = sinon.spy();
            $compile(elem)(directiveScope);
            directiveScope.$digest();
        }));

        it('Ensures that at least one passenger is selected', function() {
            directiveScope.$$childTail.updatePassengerCount();
            expect($rootScope.updateCallback.called).to.be.false;
        });

        it('Executes the callback if it enough people are present', function() {
            directiveScope.$$childTail.adultPassengers = 1;
            directiveScope.$$childTail.updatePassengerCount();
            expect($rootScope.updateCallback.called).to.be.true;
        });
    });
});
