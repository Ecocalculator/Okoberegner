var App=App||{};$(function(){App.Load.initialize()});var App=App||{};App.Global=function(){"use strict";var t=!!("ontouchstart"in window);return{IS_TOUCH:t}}(jQuery);var App=App||{};App.Load=function(t){"use strict";function a(){n(),i(),""!==location.hash&&o()}function n(){s.$button=t(c.button),s.$target=t(c.target),s.$window=t(window)}function i(){s.$button.on("click",e),s.$window.on("hashchange",o)}function o(){if(App.Global.IS_TOUCH);else{var a=location.hash.replace("#!","");s.$target.addClass(c.loading),t.ajax({url:a,cache:!1,success:function(t){s.$target.html(t),s.$target.removeClass(c.loading)}})}}function e(){s.$button.removeClass(r.active),t(this).addClass(r.active)}var c={button:".js-load",target:".js-load-target"},r={active:"is-active",loading:"is-loading"},s={};return{initialize:a}}(jQuery);