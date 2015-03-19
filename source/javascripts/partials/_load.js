var App = App || {};

/**
 * [description]
 * @return {[type]} [description]
 */
App.Load = (function($) {
  'use strict';

  // Selectors for DOM elements
  var selectors = {
        button : '.js-load',
        target : '.js-load-target'
      },

      // Class names to toggle with js
      classNames = {
        active  : 'is-active',
        loading : 'is-loading'
      },

      // Store cached references to DOM elements
      // that will be used over and over again
      dom = {};

  /**
   * Initialize function
   * @return {void}
   */
  function initialize() {
    // Set up DOM and cache references
    _setupDOM();

    // Add event listeners
    _addEventListeners();

    if( location.hash !== '' ) {
      _onHashChange();
    }
  }

  /**
   * Set up DOM (create?) elements and cache references for future use
   * @return {void}
   */
  function _setupDOM() {
    // Button element(s)
    dom.$button = $( selectors.button );
    dom.$target = $( selectors.target );
    dom.$window = $( window );
  }

  /**
   * Attach event listeners to DOM elements
   */
  function _addEventListeners() {
    dom.$button.on( 'click', _onButtonClick );
    dom.$window.on( 'hashchange', _onHashChange );
  }

  function _onHashChange( event ) {
    if( App.Global.IS_TOUCH ) {
      
    }
    else {
      var url = location.hash.replace( '#!', '' );

      dom.$target.addClass( selectors.loading );

      $.ajax({
        url: url,
        cache: false,
        success: function( html ) {
          dom.$target.html( html );
          dom.$target.removeClass( selectors.loading );
        }
      });
    }
  }

  function _onButtonClick() {
    dom.$button.removeClass( classNames.active );
    $( this ).addClass( classNames.active );
  }

  ////////////////
  // Public API //
  ////////////////

  return {
    initialize: initialize
  };

})(jQuery);
