    (function($) {
        $(document).ready(function() {
            $("#flexiselDemo1").flexisel({
                visibleItems: 4,
                itemsToScroll: 1,
                animationSpeed: 400,
                enableResponsiveBreakpoints: true,
                responsiveBreakpoints: {
                    portrait: {
                        changePoint: 480,
                        visibleItems: 3
                    },
                    landscape: {
                        changePoint: 640,
                        visibleItems: 3
                    },
                    tablet: {
                        changePoint: 768,
                        visibleItems: 3
                    }
                },
                loaded: function(object) {
                    console.log('Slider loaded...');
                },
                before: function(object){
                    console.log('Before transition...');
                },
                after: function(object) {
                    console.log('After transition...');
                },
                resize: function(object){
                    console.log('After resize...');
                }
            });
        });
    })(jQuery);