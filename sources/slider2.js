 /*
 *
 * Usage:
 *  The item to be 'slidable' must have the class 'slider',
 *  inside a '.slide-container'. *  That '.slider' element
 *  must have two siblings (same level html):
 *
 *  '.drag.left' to slide left and '.drag.right' to slide right.
 *
 *  example:
 *  <div class="slider-container">
 *      <ul class="slider">
 *          <li class="slide-item"></li>
 *          <li class="slide-item"></li>
 *          <li class="slide-item"></li>
 *      </ul>
 *      <i class="drag left"></i>
 *      <i class="drag right"></i>
 *  </div>
 *
 * Happy sliding!
 *
 */

 (function ($) {
    'use strict';

    $('.slider').each(function(){
        var $item = $(this).find('.slide-item').first();
        var itemLength = $item.first().outerWidth(true);
        var realMargin = (itemLength - $item.width());
        var margin = (realMargin > 0 ? realMargin : 0);
        var length = $(this).find('.slide-item').length * itemLength + margin;
        $(this).css('width', length);
        $(this).attr('data-length', length);
        $(this).attr('data-minposition', -(length - $(this).parent().outerWidth(true)));
        $(this).attr('data-itemlength', itemLength);
        if(length < $(this).parent().width()){
            $(this).siblings('.drag').addClass('hidden');
        }
    });

    $(window).resize(function(){
        $('.slider').each(function(){
            $(this).css('left', 0);
            $(this).attr('data-minposition', -($(this).data('length') - $(this).parent().outerWidth(true)));
            if($(this).data('length') < $(this).parent().width()){
                $(this).siblings('.drag').addClass('hidden');
            }
            else{
                $(this).siblings('.drag').removeClass('hidden');
            }
        });
    });

    $('.drag.right').click(function(){
        var $that = $(this);
        var $slider = $that.siblings('.slider');
        var minPosition = $slider.data('minposition');
        var itemLength = $slider.data('itemlength');
        $that.css('pointer-events', 'none');
        $('.slide-item').css('pointer-events', 'none');
        var actual = parseInt($slider.css('left'));
        var offset = actual - itemLength * 3;
        if (offset > minPosition){
            $slider.css('left', offset);
        }
        else{
            $slider.css('left', minPosition);
        }
        setTimeout(function(){
            $that.css('pointer-events', 'all');
            $('.slide-item').css('pointer-events', 'all');
        }, 300)
    });

    $('.drag.left').click(function(){
        var $that = $(this);
        var $slider = $that.siblings('.slider');
        var itemLength = $slider.data('itemlength');
        $that.css('pointer-events', 'none');
        $('.slide-item').css('pointer-events', 'none');
        var actual = parseInt($slider.css('left'));
        var offset = actual + itemLength * 3;
        if (offset <= 0){
            $slider.css('left', offset);
        }
        else{
            $slider.css('left', 0);
        }
        setTimeout(function(){
            $that.css('pointer-events', 'all');
            $('.slide-item').css('pointer-events', 'all');
        }, 300)
    });

    $('.drag').hover(function(e){
        e.stopPropagation();
    });

}(jQuery));
