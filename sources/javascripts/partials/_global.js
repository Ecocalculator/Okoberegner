var App = App || {};

App.Global = (function($) {
  'use strict';

  var IS_TOUCH = !! ('ontouchstart' in window);

  ////////////////
  // Public API //
  ////////////////

  return {
    IS_TOUCH: IS_TOUCH
  };

})(jQuery);
