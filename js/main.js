jQuery(function () {

	var siteSticky = function () {
		jQuery(".js-sticky-header").sticky({ topSpacing: 0 });
	};
	siteSticky();

	var siteMenuClone = function () {

		jQuery('.js-clone-nav').each(function () {
			var jQuerythis = jQuery(this);
			jQuerythis.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function () {

			var counter = 0;
			jQuery('.site-mobile-menu .has-children').each(function () {
				var jQuerythis = jQuery(this);

				jQuerythis.prepend('<span class="arrow-collapse collapsed">');

				jQuerythis.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});

				jQuerythis.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});

				counter++;

			});

		}, 1000);

		jQuery('.dropdown-mobile').on('click', function () {
			jQuery(this).toggleClass('light-nav').find('.mobile-menu').toggle();
			jQuery(this).find('.down-caret').toggleClass('open-caret');

		})

		// jQuery('.dropdown').hover(function () {
		// 	jQuery(this).find('.dropdown-menu').delay(1000).fadeIn(500);
		// })

		// $('.dropdown').click(function () {
		// 	$(this).find('.dropdown-menu').slideToggle(500);
		// });

		$('.dropdown').hover(function () {
			$(this).find('.drop-nav').delay(100).fadeIn(300);

		}, function () {
			$(this).find('.drop-nav').stop(true, true).delay(100).fadeOut(300);
		});

		jQuery('body').on('click', '.arrow-collapse', function (e) {
			var jQuerythis = jQuery(this);
			if (jQuerythis.closest('li').find('.collapse').hasClass('show')) {
				jQuerythis.removeClass('active');
			} else {
				jQuerythis.addClass('active');
			}
			e.preventDefault();

		});

		jQuery(window).resize(function () {
			var jQuerythis = jQuery(this),
				w = jQuerythis.width();

			if (w > 768) {
				if (jQuery('body').hasClass('offcanvas-menu')) {
					jQuery('body').removeClass('offcanvas-menu');
				}
			}
		})

		jQuery('body').on('click', '.js-menu-toggle', function (e) {
			var jQuerythis = jQuery(this);
			e.preventDefault();

			if (jQuery('body').hasClass('offcanvas-menu')) {
				jQuery('body').removeClass('offcanvas-menu');
				jQuerythis.removeClass('active');
			} else {
				jQuery('body').addClass('offcanvas-menu');
				jQuerythis.addClass('active');
			}
		})

		// click outisde offcanvas
		jQuery(document).mouseup(function (e) {
			var container = jQuery(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if (jQuery('body').hasClass('offcanvas-menu')) {
					jQuery('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	siteMenuClone();

});