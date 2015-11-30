var Navigation = (($) => {
  "use strict";
  
  var init = () => {
    toggleNavigation();
    scrollTo();
    trackNavigation();
  };

  var toggleNavigation = () => {
    $('.hamburger').on('click', () => {
      $('.header').toggleClass('show-navigation');
      _gaq.push(['_trackEvent', 'Navigation', 'Hamburger']);
    });
  };

  var scrollTo = () => {
    $('.navigation a[href*=#]:not([href=#])').on('click', (event) =>  {
      var clickedElement = event.currentTarget;
      if (location.pathname.replace(/^\//, '') === clickedElement.pathname.replace(/^\//, '') && location.hostname === clickedElement.hostname) {
        var target = $(clickedElement.hash);
        target = target.length ? target : $('[name=' + clickedElement.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  };

  var trackNavigation = () => {
    $('.navigation__link').on('click', (event) => {
      _gaq.push(['_trackEvent', 'Navigation', $(event.currentTarget).attr('href')]);
    });
  };

  return {
    init: init
  };

})(window.jQuery);

export default Navigation;
