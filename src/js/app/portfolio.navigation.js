var Portfolio = Portfolio || {};
Portfolio.Navigation = (function ($) {
    "use strict";

    return {
        init: function () {
            this.toggleNavigation();
            this.scrollTo();
        },
        toggleNavigation: function () {
            $('.hamburger').on('click', function () {
                $('.header').toggleClass('show-navigation');
            });
        },
        scrollTo: function () {
            $('.navigation a[href*=#]:not([href=#])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 500);
                        return false;
                    }
                }
            });
        }
    };
})(window.jQuery);