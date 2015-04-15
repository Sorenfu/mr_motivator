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
        durations = 300,
        weeklabels = [];
    for (var i = 0; i < 7; i++) {
        var today = new Date();
        var weekday = new Date(today.getTime() + 24*60*60*1000*i);
        weeklabels[i] = dayOfWeekAsString(weekday.getDay());
    }

    $scope.smilData = {
        labels: weeklabels,
        series: [
            {
                data: [3, 4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3],
                className: 'ct-series-a'
            }
        ]
    };

    $scope.smilData2 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        series: [
            {
                data: [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
                className: 'ct-series-c'
            }
        ]
    };

    $scope.smilOptions = {
        low: 0,
        height: 260
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

    new Chartist.Line('.ct-chart', {
        labels: weeklabels,
        series: [
            [12, 9, 7, 8, 5],
            [2, 1, 3.5, 7, 3],
            [1, 3, 4, 5, 6]
        ]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        }
    });

}]);
