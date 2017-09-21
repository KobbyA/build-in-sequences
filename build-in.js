/**
* This is build as a jQuery plugin so it requres jQuery
* It uses requestAnimationFrame to avoid listening to both resize and scroll events.
* Fires on window load to make sure everything is fully loaded and taking up the right space in the document
*/
(function($){
    $.fn.isOnScreen = function() {
        var $win = $(window);
        var $elProps = {
            top: $win.scrollTop(),
            left: $win.scrollLeft()
        };

        $elProps.right = $elProps.left + $win.width();
        $elProps.bottom = $elProps.top + $win.height();

        var offset = this.offset();
        return offset.right = offset.left + this.outerWidth(),
            offset.bottom = offset.top + this.outerHeight(),
            !($elProps.right < offset.left || $elProps.left > offset.right || $elProps.bottom < offset.top || $elProps.top > offset.bottom)
    };

    $(window).load(function(){
        (function animLoop(){
            requestAnimationFrame(animLoop);

            $('[data-animate-in]').each(function(){
                var item = $(this);
                item.toggleClass('in-view', item.isOnScreen());
            });
        })();
    })

})(jQuery);
