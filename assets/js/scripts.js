!function t(n,i,e){function r(a,c){if(!i[a]){if(!n[a]){var u="function"==typeof require&&require;if(!c&&u)return u(a,!0);if(o)return o(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var l=i[a]={exports:{}};n[a][0].call(l.exports,function(t){var i=n[a][1][t];return r(i?i:t)},l,l.exports,t,n,i,e)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<e.length;a++)r(e[a]);return r}({1:[function(t,n,i){"use strict";var e=function(t){var n=function(){i(),e(),r()},i=function(){t(".hamburger").on("click",function(){t(".header").toggleClass("show-navigation"),_gaq.push(["_trackEvent","Navigation","Hamburger"])})},e=function(){t(".navigation a[href*=#]:not([href=#])").on("click",function(n){var i=n.currentTarget;if(location.pathname.replace(/^\//,"")===i.pathname.replace(/^\//,"")&&location.hostname===i.hostname){var e=t(i.hash);if(e=e.length?e:t("[name="+i.hash.slice(1)+"]"),e.length)return t("html,body").animate({scrollTop:e.offset().top},500),!1}})},r=function(){t(".navigation__link").on("click",function(n){_gaq.push(["_trackEvent","Navigation",t(n.currentTarget).attr("href")])})};return{init:n}}(window.jQuery);n.exports=e},{}],2:[function(t,n,i){"use strict";var e=function(t){var n="",i=function(){r()},e=function(){var n=t(".highlight__gallery-slider");n.on("init",function(){c(),t(window).smartresize(function(){return c()})}),n.slick({prevArrow:'<button type="button" class="slick-prev"></button>',nextArrow:'<button type="button" class="slick-next"></button>'})},r=function(){t.getJSON("projects.json").done(function(t){n=t,o(),a()})},o=function(){var i=t("#project-detail-template").html(),r=Handlebars.compile(i);t(".project-item").on("click",function(i){var o=t(i.currentTarget).data("project-id"),a=n[o],c=r(a),u=t(".highlight");u.html(c),e(),t("html,body").animate({scrollTop:u.offset().top},500),_gaq.push(["_trackEvent","Projects",o])})},a=function(){var n=t(".highlight");n.on("click",".highlight__close",function(){n.height(0),setTimeout(function(){n.html("")},350)})},c=function(){var n=t(".highlight__gallery"),i=n.outerHeight()+50;"left"!==n.css("float")&&(i=n.outerHeight()+t(".highlight__copy").outerHeight()+80),n[0]?t(".highlight").height(i):t(".highlight").height(0)};return{init:i}}(window.jQuery);n.exports=e},{}],3:[function(t,n,i){"use strict";var e=function(t){return t&&t.__esModule?t["default"]:t},r=e(t("./app/navigation")),o=e(t("./app/projects"));r.init(),o.init()},{"./app/navigation":1,"./app/projects":2}]},{},[3]);
//# sourceMappingURL=scripts.js.map
