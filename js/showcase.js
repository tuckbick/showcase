(function ( document, window ) {
    'use strict';

    var showcase = window.showcase = function ( theme ) { var

        stepData = {}, css, toNumber, translate, rotate, scale,

        // checks to see if dom el.dataset has any of these properties.
        //    if not, then it's probably just a blank step and is using the plugin
        isDatasetEmpty = function ( d ) {
            return !(d.x || d.y || d.z || d.rotateX || d.rotateY || d.rotateZ || d.rotate || d.scale)
        },

        // bring in some impress.js functions
        library = function ( _css, _toNumber, _translate, _rotate, _scale ) {
            css = _css;
            toNumber = _toNumber;
            translate = _translate;
            rotate = _rotate;
            scale = _scale;
        },

        // create a given some data, and element, and whether or not is uses the plugin
        createStep = function ( data, el, usesPlugin ) {
            return {
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
                el: el,
                usesPlugin: usesPlugin
            }
        },

        // used every time we kick off the page and we do a resize of the window
        applyStyles = function () {
            theme.restart();
            for ( var step_name in stepData ) {
                var step = stepData[step_name];
                if (!step.usesPlugin) continue;
                stepData[step_name] = step = createStep( theme.nextData(), step.el, step.usesPlugin );
                css( step.el, getStepStyles( step ));
            }
            return stepData;
        },

        // returns an object containing styles for the given step
        getStepStyles = function ( step ) {
            var style = {
                position: "absolute",
                transform: "translate(-50%,-50%)" +
                           translate(step.translate) +
                           rotate(step.rotate) +
                           scale(step.scale),
                transformStyle: "preserve-3d",
            }
            if (step.usesPlugin) {
                // bring in any custom styles from the theme and overwrite if necessary
                var more_style = theme.getStepStyles( step );
                for ( var key in more_style ) {
                    style[key] = more_style[key];
                }
            }
            return style;
        },

        setup = function ( steps ) {
            theme.restart();

            steps.forEach(function ( el, idx ) {
                var data = el.dataset,
                    usesPlugin = isDatasetEmpty(data);
                
                // ask our theme for the next set of step data
                if (usesPlugin) { data = theme.nextData() }

                // build a step object 
                var step = createStep( data, el, usesPlugin );
                
                // give element an id if it doesn't have one
                if ( !el.id ) {
                    el.id = "step-" + (idx + 1);
                }
                // save our step object
                stepData["impress-" + el.id] = step;

                // give step element some style!
                css( el, getStepStyles( step ));
            });

            return stepData
        }

        return {
            library: library,
            setup: setup,
            onResize: applyStyles
        }

    };

})(document, window);