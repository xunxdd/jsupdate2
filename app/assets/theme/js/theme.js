(function($) {
  "use strict";

  $(document).ready(function() {
    clickEvents();
  });

  function clickEvents() {
    //smooth scroll
    $('.link-innerpage').click(function(e) {
      var target = this.hash, $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 1500, 'easeInOutExpo', function() {
      });
      return false;
    });
    
    //toggle nav mobile 
    $('.btn-nav-toogle').click(function() {
      $('body, .mobile-nav-block').toggleClass('open-mobile-nav');
    });
  }


})(jQuery);









