(function ( document, window ) {
    'use strict';

    var showcase = window.showcase = function ( theme ) { var

        stepData = {}, css, toNumber, translate, rotate, scale,

        isDatasetEmpty = function ( d ) {
            return !(d.x || d.y || d.z || d.rotateX || d.rotateY || d.rotateZ || d.rotate || d.scale)
        },

        library = function ( _css, _toNumber, _translate, _rotate, _scale ) {
            css = _css;
            toNumber = _toNumber;
            translate = _translate;
            rotate = _rotate;
            scale = _scale;
        },

        setup = function ( steps ) {

            theme.onResize();

            // steps.forEach(function ( el, idx ) {
            //     var data = el.dataset;
            //     stepData["impress-" + el.id] = 
            // });
            // resizeSteps();
            console.log(steps);
            steps.forEach(function ( el, idx ) {
                var data = el.dataset,
                    usesPlugin = isDatasetEmpty(data);
                
                if (usesPlugin) { data = theme.nextData() }

                var step = {
                    translate: {
                        x: toNumber(data.x),
                        y: toNumber(data.y),
                        z: toNumber(data.z)
                    },
                    rotate: {
                        x: toNumber(data.rotateX),
                        y: toNumber(data.rotateY),
                        z: toNumber(data.rotateZ || data.rotate)
                    },
                    scale: toNumber(data.scale, 1),
                    el: el
                }
                
                if ( !el.id ) {
                    el.id = "step-" + (idx + 1);
                }
                stepData["impress-" + el.id] = step;

                var styles = {
                    position: "absolute",
                    transform: "translate(-50%,-50%)" +
                               translate(step.translate) +
                               rotate(step.rotate) +
                               scale(step.scale),
                    transformStyle: "preserve-3d",
                };
                if (usesPlugin) {
                    styles.width = styles.height = theme.width() + 'px';
                    styles.padding = theme.margin() + 'px 0';
                }
                css(el, styles);
            });

            return stepData;
        }

        return {
            library: library,
            setup: setup,
            onResize: theme.onResize
        }

    };

})(document, window);