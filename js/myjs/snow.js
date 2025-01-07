if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded');
} else {
    let flakes = [];

    function generateFlakeSize(minSize, maxSize) {
        return Math.random() * (maxSize - minSize) + minSize;
    }

    (function ($) {
        $.fn.snow = function (options) {
            var defaults = {
                minSize: 1,    // now in vw units
                maxSize: 4,    // now in vw units
                flakeColors: ["#AFDAEF", "#FFFFFF", "#D0E9FF", "#F1F8FF"]
            };
            options = $.extend({}, defaults, options);

            let documentHeight = $(document).height();
            let documentWidth = $(document).width();
            
            let viewportArea = documentHeight * documentWidth;
            let flakeCount = Math.round(viewportArea / 120000);  // Adjusted the divisor to reduce flake density

            function animateFlakes() {
                flakes.forEach(function (flake, index) {
                    if (flake.y >= documentHeight - 20) {
                        flake.y = -10;
                    }
                    flake.y += flake.speed;
                    flake.x += flake.drift;
                    flake.el.css({
                        top: flake.y,
                        left: flake.x,
                        transform: 'rotate(' + flake.rotate + 'deg)'
                    });
                });
                requestAnimationFrame(animateFlakes);
            }

            for (let i = 0; i < flakeCount; i++) {
                let sizeFlake = generateFlakeSize(options.minSize, options.maxSize);
                let startPositionLeft = Math.random() * documentWidth - 100;
                let startPositionTop = Math.random() * documentHeight - 100;
                let flakeColor = options.flakeColors[Math.floor(Math.random() * options.flakeColors.length)];
                let flakeOpacity = Math.random() * 0.5 + 0.5;  // set opacity when generating the flake

                let flake = $('<div class="snowflake" />').css({
                    position: 'fixed',
                    'z-index': '9999',
                    'pointer-events': 'none',
                    left: startPositionLeft,
                    top: startPositionTop,
                    'font-size': sizeFlake + 'vw',   // using vw units
                    color: flakeColor,
                    opacity: flakeOpacity   // using fixed opacity
                }).html('&#10052;');

                $('body').append(flake);

                flakes.push({
                    speed: Math.random() * 3 + 1,
                    drift: Math.random() * 0.5 - 0.25,
                    el: flake,
                    x: startPositionLeft,
                    y: startPositionTop,
                    rotate: Math.random() * 360
                });
            }

            animateFlakes();
        };
    })(jQuery);

    $(function () {
        $.fn.snow();
    });
}
