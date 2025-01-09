(($, window) => {

	'use strict';

	// --------------------
    // Sphere Portfolio
    // ------------------

	class SpherePortfolio {
		constructor() {
			const $body = $(document.body);

			this.initialIndex = 0;
			this.layout = '';
			this.rtl = $body.hasClass('rtl') ? true : false;

			$body.on('click', '.custom-logo-link', () => { this.initialIndex = 0; });
			$body.on('click', 'article.type-portfolio a', () => {
				if ($('.flickity-slider').length) {
					let isSelected = $('article.is-selected');
					let classesArray = ['portfolio-slideshow', 'portfolio-carousel', 'portfolio-film'];

					for (const layout of classesArray) {
						if ($('.portfolio-items').hasClass(layout)) {
							this.layout = layout;
						}
					}

					this.initialIndex = $('.flickity-slider article').index(isSelected);
				}
			});
		}

		// -------------------
		// Script Resolver
		// -----------------

		layouts($content) {

				 if ($content.find('.portfolio-slideshow').length) { this.slideshow(); }
			else if ($content.find('.portfolio-carousel').length) { this.carousel(); }
			else if ($content.find('.portfolio-titles').length) { this.titles(); }
			else if ($content.find('.portfolio-film').length) { this.film(); }
			else if ($content.find('.portfolio-item-intro').length) { this.detail(); }
				 if ($content.find('.testimonials-slider').length) { this.testimonials(); }

		}

		// -------------
		// Slideshow
		// -----------

		slideshow() {

			if (this.layout !== 'portfolio-slideshow') { this.initialIndex = 0; }

			let autoPlay = false;
			if (sphereSettings.slideshow_autoplay) { autoPlay = parseInt(sphereSettings.slideshow_delay); }

			let $slideshow = $('.portfolio-slideshow');
			$slideshow.flickity({
				fade: true,
				imagesLoaded: true,
				setGallerySize: false,
				wrapAround: true,
				pageDots: false,
				lineIndicator: true,
				autoPlay: autoPlay,
				pauseAutoPlayOnHover: false,
				initialIndex: this.initialIndex,
				rightToLeft: this.rtl,
			});

			$slideshow.on('change.flickity', () => {
				sphereColors.update();
			});

			$('#menu-opener').on('click', () => {
				if (document.contains($slideshow[0])) {
					let flkty = Flickity.data($('.portfolio-slideshow')[0]);
					if (flkty.player.state === 'playing') { $slideshow.flickity('pausePlayer'); }
					else { $slideshow.flickity('unpausePlayer'); }
				}
			});

		}

		// ------------
		// Carousel
		// ----------

		carousel() {

			if (this.layout !== 'portfolio-carousel') { this.initialIndex = 0; }

			let $carousel = $('.portfolio-carousel'),
				cellAlign = this.rtl ? 'right' : 'left';
			$carousel.flickity({
				imagesLoaded: true,
				pageDots: false,
				freeScroll: true,
				cellAlign: cellAlign,
				contain: true,
				lineIndicator: true,
				setGallerySize: false,
				initialIndex: this.initialIndex,
				rightToLeft: this.rtl,
			});

			document.querySelector('.portfolio-carousel').addEventListener('touchmove', (e) => {
				e.preventDefault();
			}, { passive: false });

		}

		// --------
		// Film
		// ------

		film() {

			if (this.layout !== 'portfolio-film') { this.initialIndex = 0; }

			let $film = $('.portfolio-film');
			$film.flickity({
				imagesLoaded: true,
				pageDots: false,
				initialIndex: this.initialIndex,
				lineIndicator: true,
				rightToLeft: this.rtl,
			});

			$film.on('change.flickity', () => {
				sphereColors.update();
			});

			document.querySelector('.portfolio-film').addEventListener('touchmove', (e) => {
				e.preventDefault();
			}, { passive: false });

		}

		// ----------------
		// Testimonials
		// --------------

		testimonials() {
			let $slider = $('.testimonials-slider');
			$slider.flickity({
				adaptiveHeight: true,
				imagesLoaded: true,
				pageDots: true,
				lineIndicator: false,
				prevNextButtons: false,
				autoPlay: 7000,
				fade: true,
			});

		}

		//

	}

	const spherePortfolio = new SpherePortfolio();
	window.spherePortfolio = spherePortfolio;

})(jQuery, window);
