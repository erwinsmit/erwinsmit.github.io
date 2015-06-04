var Portfolio = Portfolio || {};
Portfolio.Navigation = (function ($) {
    "use strict";

    return {
        init: function () {
            this.toggleNavigation();
        },
        toggleNavigation: function () {
            $('.hamburger').on('click', function () {
                $('.header').toggleClass('show-navigation');
            });
        }
    };
})(window.jQuery);