(function($) {
	
	var methods = {
			init 	: function( options ) {
				
				if( this.length ) {
					
					var settings = {
						boxAnimSpeed		: 280,
                        delay               : 0
					};
					
					return this.each(function() {
						if ( options ) {
							$.extend( settings, options );
						}
						
						var $el 			= $(this),
							$menuItems		= $el.children('li'),
						maxdelay	= Math.max( settings.animMouseleave['mText'].speed + settings.delay),
							t_mouseenter;
						$menuItems.find('.sti-item').each(function() {
							var $el	= $(this);
							$el.data('deftop', $el.position().top);
						});
						$menuItems.bind('mouseenter', function(e) {
							clearTimeout(t_mouseenter);
							
							var $item		= $(this),
								$wrapper	= $item.children('a'),
								wrapper_h	= $wrapper.height(),
								$movingItems= $wrapper.find('.sti-item')
							
							t_mouseenter	= setTimeout(function() {
								$item.addClass('sti-current');
								
								$movingItems.each(function(i) {
									var $item			= $(this),
										item_sti_type	= $item.data('type'),
										speed			= settings.animMouseenter[item_sti_type].speed,
										easing			= settings.animMouseenter[item_sti_type].easing,
										delay			= settings.delay,
										dir				= settings.animMouseenter[item_sti_type].dir,
										style			= {'top' : -dir * wrapper_h + 'px'};
									

										style.color					= settings.animationTextColor;
									$item.hide().css(style).show();
									clearTimeout($item.data('time_anim'));
									$item.data('time_anim',
										setTimeout(function() {
											$item.stop(true)
												 .animate({top : $item.data('deftop') + 'px'}, speed, easing);
										}, delay)
									);
								});
                                $($item.children('div')).css("background", "#3F7377");
								$wrapper.stop(true).animate({
									backgroundColor: settings.animationBgColor
								}, settings.boxAnimSpeed );
							
							}, 100);
						})
						.bind('mouseleave', function(e) {
							clearTimeout(t_mouseenter);
							
							var $item		= $(this),
								$wrapper	= $item.children('a'),
								wrapper_h	= $wrapper.height(),
								$movingItems= $wrapper.find('.sti-item');

                                $($item.children('div')).css("background", "#57A1A7");

                                $wrapper.stop(true).animate({
                                    backgroundColor: settings.defaultBgColor
                                }, settings.boxAnimSpeed );

							if(!$item.hasClass('sti-current')) 
								return false;		
							
							$item.removeClass('sti-current');
							
							$movingItems.each(function(i) {
								var $item			= $(this),
									item_sti_type	= $item.data('type'),
									speed			= settings.animMouseleave[item_sti_type].speed,
									easing			= settings.animMouseleave[item_sti_type].easing,
									delay			= settings.delay,
									dir				= settings.animMouseleave[item_sti_type].dir;
								
								clearTimeout($item.data('time_anim'));

								setTimeout(function() {

									$item.stop(true).animate({'top' : -dir * wrapper_h + 'px'}, speed, easing, function() {
										if( delay + speed === maxdelay ) {
											$movingItems.each(function(i) {
												var $el				= $(this),
													style			= {'top' : $el.data('deftop') + 'px'};
													style.color					= settings.defaultTextColor;
												$el.hide().css(style).show();
											});
										}
									});
								}, delay);
							});
						});
						
					});
				}
			}
		};
	$.fn.iconmenu = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.iconmenu' );
		}
	};
})(jQuery);
