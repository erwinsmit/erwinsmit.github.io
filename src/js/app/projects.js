var Portfolio = Portfolio || {};
Portfolio.Projects = (function ($) {
    "use strict";
    return {
        init: function () {
            this.projectSlider();
            this.toggleProjectDetail();
        },
        projectSlider: function () {
        	$('.highlight__gallery-slider').slick({
        		prevArrow: '<button type="button" class="slick-prev"></button>',
        		nextArrow: '<button type="button" class="slick-next"></button>'
        	});
        },
        toggleProjectDetail: function () {
        	$('.project-item').on('click', function() {
        		$('.highlight').toggleClass('open'); 
        	});
        }
    };
})(window.jQuery);