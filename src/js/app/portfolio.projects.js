var Portfolio = Portfolio || {};
Portfolio.Projects = (function ($) {
    "use strict";

    var projects = '';

    return {
        init: function () {
            this.fetchProjects();
        },
        projectSlider: function () {
            $('.highlight__gallery-slider').slick({
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>'
            });

            $('.highlight__gallery-slider').on('swipe', function () {
                console.log('swipe');
                var highlightHeight = $('.highlight__gallery-slider').outerHeight() + 100;
                $('.highlight').height(highlightHeight);
            });

            $('.highlight__gallery-slider').on('init', function () {
                console.log('init');
                var highlightHeight = $('.highlight__gallery-slider').outerHeight() + 100;
                $('.highlight').height(highlightHeight);
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

            });
        }
    };
})(window.jQuery);