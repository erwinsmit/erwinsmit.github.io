var Projects = (($) => {
  "use strict";
  
  var projects = '';

  var init = () => {
    fetchProjects();
  };

  var projectSlider = () => {
    var $slider = $('.highlight__gallery-slider');

    $slider.on('init', () => {
      resizeHighlight();
      $(window).smartresize(() => resizeHighlight());
    });

    $slider.slick({
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
  };

  var fetchProjects = () => {
    $.getJSON("projects.json").done((data) => {
      projects = data;
      showProject();
      hideProject();
    });
  };

  var showProject = () => {
    var source = $("#project-detail-template").html(),
      template = Handlebars.compile(source);

    $('.project-item').on('click', (event) => {
      var projectId = $(event.currentTarget).data('project-id'),
        content = projects[projectId],
        html = template(content),
        $highLight = $('.highlight');

      $highLight.html(html);
      projectSlider();

      $('html,body').animate({
        scrollTop: $highLight.offset().top
      }, 500);

      _gaq.push(['_trackEvent', 'Projects', projectId]);
    });
  };

  var hideProject = () => {
    var $highlight = $('.highlight');
    $highlight.on('click', '.highlight__close', () => {
      $highlight.height(0);
      setTimeout(() => {
        $highlight.html('');
      }, 350);
    });
  };

  var resizeHighlight = () => {
    var $hightLightGallery = $('.highlight__gallery'),
      highlightHeight = $hightLightGallery.outerHeight() + 50;

    if ($hightLightGallery.css('float') !== 'left') {
      highlightHeight = $hightLightGallery.outerHeight() + $('.highlight__copy').outerHeight() + 80;
    }

    if ($hightLightGallery[0]) {
      $('.highlight').height(highlightHeight);
    } else {
      $('.highlight').height(0);
    }
  };

  return {
    init: init
  };

})(window.jQuery);

export default Projects;
