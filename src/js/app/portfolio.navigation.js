var Portfolio = Portfolio || {};
Portfolio.Navigation = (function ($) {
    "use strict";

    return {
        init: function () {
            this.toggleNavigation();
            this.scrollTo();
            this.trackNavigation();
        },
        toggleNavigation: function () {
            $('.hamburger').on('click', function () {
                $('.header').toggleClass('show-navigation');
                _gaq.push(['_trackEvent', 'Navigation', 'Hamburger']);
            });
        },
        scrollTo: function () {
            $('.navigation a[href*=#]:not([href=#])').on('click', function () {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
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
        },
        trackNavigation: function () {
            $('.navigation__link').on('click', function () {
                _gaq.push(['_trackEvent', 'Navigation', $(this).attr('href')]);
            });
        }
    };
})(window.jQuery);