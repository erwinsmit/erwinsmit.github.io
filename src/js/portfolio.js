var Portfolio = (function ($) {
    "use strict";
    return {
        init: function (initModules) {
            $.each(initModules, function(key, value) {
                if (value === true) {
                    Portfolio[key].init();
                }
            });
        },

        test: function () {}

    };



})(window.jQuery);

jQuery(function ($) {

    "use strict";
    var initModules = {
        Projects: true
    };

    Portfolio.init(initModules);
});