var _gaq = _gaq || [];

var Portfolio = (function ($) {
    "use strict";
    return {
        init: function (initModules) {
            $.each(initModules, function (key, value) {
                if (value === true) {
                    Portfolio[key].init();
                }
            });
        }
    };
})(window.jQuery);

jQuery(function () {

    "use strict";
    var initModules = {
        Projects: true,
        Navigation: true
    };

    Portfolio.init(initModules);
});