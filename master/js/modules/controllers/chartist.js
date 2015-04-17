/**=========================================================
 * Module: chartist.js
 =========================================================*/

function dayOfWeekAsString(dayIndex) {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex];
}

App.controller('ChartistController', ['$scope', function ($scope) {
    'use strict';

    // Smil Animations
    // -----------------------------------

    // Let's put a sequence number aside so we can use it in the event callbacks
    var seq = 0,
        delays = 80,
        weeklabels = [],
        duration_per_step = [];

    var steps = [9218, 7583, 7564, 7055, 4646, 3305, 6047, 2178];
    var durations = [7603, 5588, 5683, 5445, 3648, 3139, 5290, 1777];
    var knee_measurements = [44.2, 44.22, 44.3, 44.35, 44.4, 44.45, 44.5];

    for (var i = 0; i < 7; i++) {
        var today = new Date();
        var weekday = new Date(today.getTime() + 24 * 60 * 60 * 1000 * i);
        weeklabels[i] = dayOfWeekAsString(weekday.getDay());
    }

    for (var i = 0; i < durations.length; i++) {
        duration_per_step[i] = steps[i] / durations[i] * 10;
    }

    $scope.smilData = {
        labels: weeklabels,
        series: [
            {
                data: steps,
                className: 'ct-series-a'
            }
        ]
    };

    $scope.smilData2 = {
        labels: weeklabels,
        series: [
            {
                data: duration_per_step,
                className: 'ct-series-c'
            }
        ]
    };

    $scope.smilData3 = {
        labels: weeklabels,
        series: [
            {
                data: knee_measurements,
                className: 'ct-series-d'
            }
        ]
    };

    $scope.smilOptions = {
        height: 260
    };
    $scope.smilOptions2 = {
        height: 260,
        low: 35
    };

    $scope.smilEvents = {
        created: function () {
            seq = 0;
        },
        draw: function (data) {
            seq++;

            if (data.type === 'line') {
                // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                data.element.animate({
                    opacity: {
                        // The delay when we like to start the animation
                        begin: seq * delays + 1000,
                        // Duration of the animation
                        dur: durations,
                        // The value where the animation should start
                        from: 0,
                        // The value where it should end
                        to: 1
                    }
                });
            } else if (data.type === 'label' && data.axis === 'x') {
                data.element.animate({
                    y: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.y + 100,
                        to: data.y,
                        // We can specify an easing function from Chartist.Svg.Easing
                        easing: 'easeOutQuart'
                    }
                });
            } else if (data.type === 'label' && data.axis === 'y') {
                data.element.animate({
                    x: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.x - 100,
                        to: data.x,
                        easing: 'easeOutQuart'
                    }
                });
            } else if (data.type === 'point') {
                data.element.animate({
                    x1: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.x - 10,
                        to: data.x,
                        easing: 'easeOutQuart'
                    },
                    x2: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.x - 10,
                        to: data.x,
                        easing: 'easeOutQuart'
                    },
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'easeOutQuart'
                    }
                });
            } else if (data.type === 'grid') {

                // Using data.axis we get x or y which we can use to construct our animation definition objects
                var pos1Animation = {
                    begin: seq * delays,
                    dur: durations,
                    from: data[data.axis + '1'] - 30,
                    to: data[data.axis + '1'],
                    easing: 'easeOutQuart'
                };

                var pos2Animation = {
                    begin: seq * delays,
                    dur: durations,
                    from: data[data.axis + '2'] - 100,
                    to: data[data.axis + '2'],
                    easing: 'easeOutQuart'
                };

                var animations = {};
                animations[data.axis + '1'] = pos1Animation;
                animations[data.axis + '2'] = pos2Animation;
                animations['opacity'] = {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                };

                data.element.animate(animations);
            }
        }
    };


    // SVG PATH animation
    // -----------------------------------

    $scope.pathOptions = {
        low: 0,
        showArea: true,
        showPoint: false,
        fullWidth: true,
        height: 260
    };

}]);
