(function ( document, window ) {
    'use strict';

    var qbert = window.qbert = (function () { var

        // width of our cubes and the top and bottom margin caused by our screen dimensions
        width, padding, level, cube, rowCubes, step,

        css,
        library = function ( _css ) {
            css = _css;
        },

        // API FUNCTIONS TO BE FILLED OUT
        getStepStyles = function ( step ) {
            return {
                width: width + 'px',
                height: width + 'px',
                padding: padding + 'px 0'
            }
        },

        restart = function ( ) {
            width = window.innerWidth;
            padding = (width - window.innerHeight)/2;
            level = 0;
            cube = 0;
            rowCubes = 0;
            step = 0;
        },

        nextData = function () {
            switch (step % 3) {
                case 0:
                    return upData();
                case 1:
                    return leftData();
                case 2:
                    return rightData();
            }
        },

        // HELPER FUNCTIONS
        upData = function () {
            step += 1;
            return {
                rotateX: 90, rotateY: 0, rotateZ: 0,
                x: -1 * (level - rowCubes) * width,
                y: level * width,
                z: rowCubes * width
            }
        },
        leftData = function () {
            step += 1;
            return {
                rotateX: 0, rotateY: -90, rotateZ: 0,
                x: -1 * (width/2) - (level - rowCubes) * width ,
                y: (width/2) + level * width,
                z: rowCubes * width,
            }
        },
        rightData = function () {
            step += 1;
            var coords = {
                rotateX: 0, rotateY: 0, rotateZ: 0,
                x: -1 * (level - rowCubes) * width,
                y: (width/2) + level * width,
                z: (width/2) + rowCubes * width,
            };

            rowCubes += 1;
            if (rowCubes > level) {
                rowCubes = 0;
                level += 1;
            }

            return coords;
        }

        // Kick it off by initializing some of our variables
        restart();

        return {
              library: library
            , getStepStyles: getStepStyles
            , restart: restart
            , nextData: nextData
        }
    })();

})(document, window);