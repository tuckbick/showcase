(function ( document, window ) {
    'use strict';

    var qbert = window.qbert = (function () { var

        // width and height of our cubes
        width,
        height,

        level = 0,

        cube = 0,
        rowCubes = 0,

        step = 0,

        // we need the dimensions of each step so we can configure our pyramid cubes
        onResize = function () {
            width =  window.innerWidth;
            height = window.innerHeight;
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
        upData = function () {
            step += 1;
            return {
                rotateX: 90, rotateY: 0, rotateZ: 0,
                x: -1 * (level - rowCubes) * width,
                y: level * height,
                z: rowCubes * width
            }
        },
        leftData = function () {
            step += 1;
            return {
                rotateX: 0, rotateY: -90, rotateZ: 0,
                x: -1 * (width/2) - (level - rowCubes) * width ,
                y: (height/2) + level * height,
                z: rowCubes * width,
            }
        },
        rightData = function () {
            step += 1;
            var coords = {
                rotateX: 0, rotateY: 0, rotateZ: 0,
                x: -1 * (level - rowCubes) * width,
                y: (height/2) + level * height,
                z: (width/2) + rowCubes * width,
            };

            rowCubes += 1;
            if (rowCubes > level) {
                rowCubes = 0;
                level += 1;
            }

            return coords;
        },
        reset = function () {

        };

        return {
              nextData: nextData
            , reset: reset
            , width: function() { return width }
            , height: function() { return height }
            , onResize: onResize
        }
    })();

})(document, window);