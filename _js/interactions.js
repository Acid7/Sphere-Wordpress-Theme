(($, window) => {

	'use strict';

    const $window = $(window);
	const $html = $(document.documentElement);
	const $body = $(document.body);




        // ----------------
		// Interactions
        // --------------

		// Widgets Sidebar

		$body.on('click', '#widgets-opener', () => {
			scrollLock.disablePageScroll(document.querySelector('#blog-widgets .widgets-wrapper'));
			$body.addClass('widgets-opened');
		});

		$body.on('click', '#widgets-close', () => {
			scrollLock.enablePageScroll();
			$body.removeClass('widgets-opened');
		});


		// --------------------------
		// Enter & Escape / Close
		// ------------------------

		$html.on('keyup', (e) => {
			if (e.keyCode == 27) {
				if ($body.hasClass('widgets-opened')) { $body.removeClass('widgets-opened'); }
				if ($body.hasClass('single')) { sphereApp.goBack(); return; }
				scrollLock.enablePageScroll();
			}
			if (e.keyCode == 13 ) { $('html:not(.is-loading) body:not(.menu-opened) #content article.is-selected a.title-link').trigger('click'); }
		});


		// ----------------------
		// Hash Smooth Scroll
		// --------------------

		$body.on('click', 'a[href^="#"]', (e) => {
			e.preventDefault();

			let target = $(e.currentTarget).attr('href');
				if (target == '#') { return true; }

			let scrollTop = $(target).position().top;
			anime({
				targets: document.documentElement,
				scrollTop: scrollTop,
				duration: 1500,
				easing: 'easeOutCubic',
			});
		});

		// Scrolled & At the bottom

		$window.on('scroll', () => {
			if ($window.scrollTop() >= 50) { $body.addClass('scrolled'); }
			else { $body.removeClass('scrolled'); }
		});

		$window.on('scroll resize', () => {
			if ($window.scrollTop() + $window.height() > $(document).height() - 100) {
				$body.addClass('at-the-bottom');
			} else {
				$body.removeClass('at-the-bottom');
			}
		});

		// Back To Top

		$body.on('click', '#back-to-top', (e) => {
			anime({
				targets: document.documentElement,
				scrollTop: 0,
				duration: 1000,
				easing: 'easeOutCubic',
			});
		});

		// Portfolio Scroll

		$body.on('click', '#scroll-down', () => {
			anime({
				targets: document.documentElement,
				scrollTop: $('#scroll-down-anchor').position().top,
				duration: 1000,
				easing: 'easeOutCubic',
			});
		});


		// -------------------
		// Comments Toggle
		// -----------------

		$body.on('click', '#comments-opener', (e) => {
			$(e.currentTarget).toggleClass('opened');

			let $comments = $('#comments');

			if (!$comments.hasClass('opened')) {
				sphereApp.toggleHeight($comments[0]);

				let timeline = anime.timeline({ easing: 'easeOutCubic' });
				timeline.add({
					targets: document.documentElement,
					scrollTop: $('.post-content').height() - $comments.height(),
					duration: 1000,
					delay: 700,
					complete: () => {
						anime({
							targets: $comments[0],
							opacity: 1,
							duration: 1500,
							easing: 'easeOutCubic',
						});
					}
				});

			} else {
				anime({
					targets: $comments[0],
					opacity: 0,
					duration: 500,
					easing: 'easeOutCubic',
					complete: () => {
						$comments.height(0);
					}
				});
			}

			$comments.toggleClass('opened');
		});

    //

})(jQuery, window);
