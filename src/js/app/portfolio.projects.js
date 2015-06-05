var Portfolio = Portfolio || {};
Portfolio.Projects = (function ($) {
    "use strict";

    var projects = '';

    return {
        init: function () {
            this.fetchProjects();
        },
        projectSlider: function () {
            var $slider = $('.highlight__gallery-slider');

            $slider.on('init', function () {
                Portfolio.Projects.resizeHighlight();
            });

            $slider.slick({
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>'
            });
        },
        fetchProjects: function () {
            $.getJSON("projects.json").done(function (data) {
                projects = data;
                Portfolio.Projects.showProjects();
            });
        },
        showProjects: function () {
            var source = $("#project-detail-template").html(),
                template = Handlebars.compile(source);

            $('.project-item').on('click', function () {
                var projectId = $(this).data('project-id'),
                    content = projects[projectId],
                    html = template(content),
                    $highLight = $('.highlight');

                $highLight.html(html);
                Portfolio.Projects.projectSlider();

                $('html,body').animate({
                    scrollTop: $('.highlight').offset().top
                }, 500);
            });

            $(window).smartresize(function () {
                Portfolio.Projects.resizeHighlight();
            });
        },
        resizeHighlight: function () {
            var $hightLightGallery = $('.highlight__gallery'),
                highlightHeight = $hightLightGallery.outerHeight() + 50;

            if ($hightLightGallery.css('float') !== 'left') {
                highlightHeight = $hightLightGallery.outerHeight() + $('.highlight__copy').outerHeight()  + 80;
            }

            $('.highlight').height(highlightHeight);
        }
    };
})(window.jQuery);