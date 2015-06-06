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

                $(window).smartresize(function () {
                    Portfolio.Projects.resizeHighlight();
                });
            });

            $slider.slick({
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>'
            });
        },
        fetchProjects: function () {
            $.getJSON("projects.json").done(function (data) {
                projects = data;
                Portfolio.Projects.showProject();
                Portfolio.Projects.hideProject();
            });
        },
        showProject: function () {
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
                    scrollTop: $highLight.offset().top
                }, 500);
            });
        },
        hideProject: function () {
            $('.highlight').on('click', '.highlight__close', function () {
                $('.highlight').height(0);
            });
        },
        resizeHighlight: function () {
            var $hightLightGallery = $('.highlight__gallery'),
                highlightHeight = $hightLightGallery.outerHeight() + 50;

            if ($hightLightGallery.css('float') !== 'left') {
                highlightHeight = $hightLightGallery.outerHeight() + $('.highlight__copy').outerHeight()  + 80;
            }


            if ($hightLightGallery[0]) {
                $('.highlight').height(highlightHeight);
            } else {
                $('.highlight').height(0);
            }
        }
    };
})(window.jQuery);