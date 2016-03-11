/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function($){
	
	// Number of seconds in every time division
	var days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60;
	
	// Creating the plugin
	$.fn.countdown = function(prop){
		var $ele = this;
		
		var task = $ele.attr('task');
		task && clearTimeout(task);
		$ele.empty();

		if(Object.prototype.toString.call(prop) === "[object String]" && prop == 'close'){
			return;
		}
		
		var options = $.extend({
			callback	: function(){},
			unit:0,
			flg:[true,true,true,true],
			timestamp	: 0
		},prop);
		
		var left = options.timestamp, d, h, m, s, positions;

		// Initialize the plugin
		init(this, options);
		
		positions = this.find('.position');
		
		(function tick(){
			
			// Time left
			var alltm;
			left = Math.floor((options.timestamp - (new Date())) / 1000);
			
			if(left < 0){
				options.timestamp += options.unit;
				left = Math.floor((options.timestamp - (new Date())) / 1000);
			}else if(left == 0){
				options.callback(d, h, m, s);
			}
			
			// Number of days left
			d = Math.floor(left / days);
			updateDuo(0, 1, d);
			left -= d*days;
			
			// Number of hours left
			h = Math.floor(left / hours);
			updateDuo(2, 3, h);
			left -= h*hours;
			
			// Number of minutes left
			m = Math.floor(left / minutes);
			updateDuo(4, 5, m);
			left -= m*minutes;
			
			// Number of seconds left
			s = left;
			updateDuo(6, 7, s);
			
			// Calling an optional user supplied callback
			
			// Scheduling another call of this function in 1s
			var task = setTimeout(tick, 1000);
			$ele.attr('task',task);
		})();
		
		// This function updates two digit positions at once
		function updateDuo(minor,major,value){
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);
		}
		
		return this;
	};


	function init(elem, options){
		elem.addClass('countdownHolder');

		

		// Creating the markup inside the container
		$.each(['Days','Hours','Minutes','Seconds'],function(i){
			var $ele = $('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
			);
			if(!options.flg[i]){
				$ele.css('display','none');
			}
			$ele.appendTo(elem);
			
			if(this!="Seconds" && options.flg[i]){
				elem.append('<span class="countDiv countDiv'+i+'"></span>');
			}

		});
    $('<span class="count-1"><span style="height: 1.6em;position: relative;width:4em;display:inline-block;"><span style="letter-spacing: 0;display: block;position: absolute;top: 0;color:#5C6786;padding-left:0.5em;">倒计时</span></span></span>').appendTo(elem);
	}

	// Creates an animated transition between the two numbers
	function switchDigit(position,number){
		
		var digit = position.find('.digit')
		
		if(digit.is(':animated')){
			return false;
		}
		
		if(position.data('digit') == number){
			// We are already showing this number
			return false;
		}
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-2.1em',
				opacity:0
			},
			html:number
		});
		
		// The .static class is added when the animation
		// completes. This makes it run smoother.
		
		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:'2.5em',opacity:0},'fast',function(){
				digit.remove();
			})

		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}
})(jQuery);