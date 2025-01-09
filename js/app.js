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


((window) => {

	'use strict';

	// --------------------
	// Portfolio Titles
	// ------------------

	class SphereTitles {

		constructor() {
			spherePortfolio.initialIndex = 0;

			if (sphereApp.isTouchDevice) { return; }

			this.portfolioItems = document.querySelectorAll('article.type-portfolio');
			this.renderedStyles = {
				tx: { previous: 0, current: 0, ease: 0.1 },
				ty: { previous: 0, current: 0, ease: 0.1 },
			};
			this.itemsArray = [];
			[...this.portfolioItems].forEach((item) => this.itemsArray.push(new PortfolioItem(item, this.renderedStyles)));
		}

	}

	spherePortfolio.titles = () => {
		new SphereTitles();
	};



	// -------------------
	// Portfolio Items
	// -----------------

	class PortfolioItem {
		constructor(el, renderedStyles) {
			this.item = el;
			this.renderedStyles = renderedStyles;
			this.layout();
			this.initEvents();
		}

		// Layout

		layout() {
			this.item.wrapper = this.item.querySelector('.image-wrapper');
			this.item.image = this.item.querySelector('.image-wrapper img');
		}

		calcBounds() {
			this.bounds = {
				item: this.item.getBoundingClientRect(),
				wrapper: this.item.wrapper.getBoundingClientRect()
			};
		}

		// Events

		initEvents() {
			this.mouseEnter = (event) => {
				event.target.classList.add('is-selected');
				sphereColors.update();

				this.showImage();
				this.firstRAFCycle = true;
				this.loopRender();
			};
			this.mouseLeave = (event) => {
				event.target.classList.remove('is-selected');
				this.stopRendering();
				this.hideImage();
			};

			this.item.addEventListener('mouseenter', this.mouseEnter);
			this.item.addEventListener('mouseleave', this.mouseLeave);
		}

		// Show

		showImage() {
			anime.remove(this.item.image);
			anime({
				targets: this.item.image,
				scale: [0.5, 1],
				duration: 1000,
				easing: 'cubicBezier(0.16, 1, 0.3, 1)',
				begin: () => {
					this.item.wrapper.style.opacity = this.item.image.style.opacity = 1;
				}
			});
		}

		// Hide

		hideImage() {
			anime.remove(this.item.image);
			anime({
				targets: this.item.image,
				scale: 0.5,
				opacity: 0,
				duration: 1000,
				easing: 'cubicBezier(0.16, 1, 0.3, 1)',
			});
		}

		// Render

		loopRender() {
			if (!this.requestId) {
				this.requestId = requestAnimationFrame(() => this.render());
			}
		}
		stopRendering() {
			if (this.requestId) {
				window.cancelAnimationFrame(this.requestId);
				this.requestId = undefined;
			}
		}
		render() {
			this.requestId = undefined;

			if (this.firstRAFCycle) {
				this.calcBounds();
			}

			this.renderedStyles.tx.current = Math.abs(sphereApp.mouse.x - this.bounds.item.left) - this.bounds.wrapper.width / 2;
			this.renderedStyles.ty.current = Math.abs(sphereApp.mouse.y - this.bounds.item.top) - this.bounds.wrapper.height / 2;

			this.renderedStyles.tx.previous = this.firstRAFCycle ? this.renderedStyles.tx.current : sphereApp.lerp(this.renderedStyles.tx.previous, this.renderedStyles.tx.current, this.renderedStyles.tx.ease);
			this.renderedStyles.ty.previous = this.firstRAFCycle ? this.renderedStyles.ty.current : sphereApp.lerp(this.renderedStyles.ty.previous, this.renderedStyles.ty.current, this.renderedStyles.ty.ease);

			anime.set(this.item.wrapper, {
			  translateX: this.renderedStyles.tx.previous,
			  translateY: this.renderedStyles.ty.previous,
			});

			this.firstRAFCycle = false;
			this.loopRender();
		}
	}

})(window);


((window) => {

	'use strict';

	let animation;

	// --------------------
    // Portfolio Detail
    // ------------------

	class PortfolioDetail {
		constructor() {

			this.intro = document.querySelector('.portfolio-item-intro');
			this.title = document.querySelector('.post-title-wrapper');
			this.innerWidth = 0;
			this.innerHeight = '';
			this.fadeEnd = window.innerHeight * 0.7;

			this.renderedStyles = {
	            opacity: { previous: 1, current: 1, ease: 0.2 },
				ty: { previous: 0, current: 0, ease: 0.2 },
	        };

			if (sphereApp.isTouchDevice) { anime({ targets: document.documentElement, scrollTop: -1 }); } // iOS address bar fix
			if (animation) { window.cancelAnimationFrame(animation); }

			this.initEvents();
		}

		initEvents() {
			window.addEventListener('resize', () => { this.refreshDimensions(); });
			setTimeout(() => { this.refreshDimensions(); }, 500);

			this.render();
		}

		refreshDimensions() {
			if (this.innerWidth != window.innerWidth) {
				this.innerWidth = window.innerWidth;
				this.innerHeight = window.innerHeight;
				this.intro.style.height = this.innerHeight + 'px';
				this.title.style.height = this.innerHeight + 'px';
				this.fadeEnd = this.innerHeight * 0.7;
			}
		}

		render() {
			let scrollTop = window.scrollY;

			if (scrollTop <= this.fadeEnd) {
		        this.renderedStyles.ty.current = scrollTop / 2;
				this.renderedStyles.opacity.current = 1 - scrollTop / this.fadeEnd;

				for (const key in this.renderedStyles ) {
		            this.renderedStyles[key].previous = sphereApp.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
		        }

		        this.title.style.transform = `translate3d(0,-${this.renderedStyles.ty.previous}px,0)`;
				this.title.style.opacity = this.renderedStyles.opacity.previous;

			} else {
				this.title.style.opacity = 0;
				this.title.style.transform = `translate3d(0,-${this.fadeEnd / 2}px,0)`;
			}

			animation = window.requestAnimationFrame(() => this.render());
		}

	}

	spherePortfolio.detail = () => {
		new PortfolioDetail();
	};

})(window);



(($, window) => {

	'use strict';

	// Globals Variables

	const $window = $(window);
	const $html = $(document.documentElement);
	const $body = $(document.body);

		// Scrollbar Gap

		scrollLock.addFillGapSelector('header, footer, body.fullscreen-menu header nav, #blog-widgets');




		// -------------
		// Sphere API
		// -----------

		class SphereApp {

			constructor() {
				this.backButtonReady = false;
				this.isTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
				this.isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);

				this.$widestFooter = Math.max.apply(Math, $('#audio, #footer-menu, .footer-text').map(function() {
					return $(this).width();
				}).get());

				$window.on('resize', () => { this.footerOverflow(); });

				this.mouse = { x: 0, y: 0 };
				window.addEventListener('mousemove', (event) => {
					this.mouse.x = event.clientX;
					this.mouse.y = event.clientY;
				});
			}

			// Go Back

			goBack() {
				if (sphereApp.backButtonReady) {
					window.history.back();
				} else {
					history.pushState({ checkIn: true }, document.title, sphereSettings.home_url);
					ajax.changePage(sphereSettings.home_url);
				}
			}

			// Flickity

			flickityFocus() {
				if ($('.flickity-enabled:not(.testimonials-slider)').length) {
					$('.flickity-enabled').focus();
				}
			}

			// Toggle Height

			toggleHeight(element) {
				let elementHeight = element.scrollHeight;
				if (element.style.height != elementHeight + 'px') { element.style.height = elementHeight + 'px'; }
				else { element.style.height = '0'; }
			}

			// Footer Overflow

			footerOverflow() {
				let $flickityProgressWidth = $('#flickity-progress').width() || 0;
					$body.removeClass('hide-footer');

				if ($body.hasClass('menu-opened') && (($window.width() - 208) / 2) > this.$widestFooter) {
					$body.removeClass('hide-footer');

				} else if ((($window.width() - $flickityProgressWidth - 208) / 2) < this.$widestFooter) {
					$body.addClass('hide-footer');
				}
			}

			// Safari Ajax Loaded Images Fix

			safariAjaxImagesFix() {
				if (this.isSafari) {
					$('#content img').each((index, img) => {
						img.outerHTML = img.outerHTML;
					});
				}
			}

			// Math Utils

			lerp(a, b, n) { return (1 - n) * a + n * b; }
			map(x, a, b, c, d) { return (x - a) * (d - c) / (b - a) + c; }

		} const sphereApp = new SphereApp();
		  window.sphereApp = sphereApp;




		// ----------------
		// Sphere Audio
		// --------------

		class SphereAudio {

			constructor() {
				this.audioEl = document.getElementById('audio');
				this.audio = null;
				this.url = '';

				if (this.audioEl) {
					this.audioEl.classList.add('sound-off');
					this.url = this.audioEl.getAttribute('data-audio');
					this.audio = new Audio(this.url);

					this.audioEl.addEventListener('click', () => {
						this.toggleAudio();
					});

					this.audio.addEventListener('ended', () => {
						this.audio.currentTime = 0;
						this.audio.play();
					}, false);
				}
			}

			// Toggle Audio

			toggleAudio() {
				if (this.audio.paused) {
					this.audio.play();
					this.audioEl.classList.remove('sound-off');
				} else {
					this.audio.pause();
					this.audioEl.classList.add('sound-off');
				}
			}

		} const sphereAudio = new SphereAudio();




		// -----------------
		// Sphere Colors
		// ---------------

		class SphereColors {
			constructor() {

				this.root = document.documentElement;

				this.root.style.setProperty('--header-height', $('header').height() + 'px');
				this.root.style.setProperty('--footer-height', $('footer').height() + 'px');
				this.root.style.setProperty('--viewport-height', window.innerHeight + 'px');
				this.root.style.setProperty('--text-shadow-color', 'rgba(' + this.hexToRgb(sphereSettings.bg_color) + ', .5)');
				this.root.style.setProperty('--box-shadow-color', 'rgba(' + this.hexToRgb(sphereSettings.text_color) + ', .12)');

				$window.on('load resize', () => {
					 this.root.style.setProperty('--viewport-height', window.innerHeight + 'px');
				});

				if (sphereSettings.merge_svg_logo) {
					this.mergeSvgLogo();
				}
			}

			// Merge SVG Logo

			mergeSvgLogo() {
				let $img = $('img.custom-logo');
				let imgClass = $img.attr('class');
				let imgURL = $img.attr('src');

				$.get(imgURL, (data) => {
					let $svg = $(data).find('svg');

					if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
			            $svg.attr(`viewBox 0 0  ${$svg.attr('height')} ${$svg.attr('width')}`);
			        }

					if (typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass + ' replaced-svg');
					}

					$svg = $svg.removeAttr('xmlns:a');
					$img.replaceWith($svg);
				}, 'xml');
			}

			// Hex to RGB helper

			hexToRgb(hex) {
				let r,g,b;
				if (hex.charAt(0) == '#') {
					hex = hex.substr(1);
				}
				if (hex.length == 3) {
					hex = hex.substr(0,1) + hex.substr(0,1) + hex.substr(1,2) + hex.substr(1,2) + hex.substr(2,3) + hex.substr(2,3);
				}
				r = hex.charAt(0) + '' + hex.charAt(1);
				g = hex.charAt(2) + '' + hex.charAt(3);
				b = hex.charAt(4) + '' + hex.charAt(5);
				r = parseInt(r,16);
				g = parseInt(g,16);
				b = parseInt(b,16);
				return r +','+ g +','+ b;
			}

			// Update Colors

			update() {
				if ($body.hasClass('click-to-enter')) { return; }

				let bgColor = $body.find('article.is-selected[data-bg-color]').attr('data-bg-color') || $body.find('article[data-bg-color]').attr('data-bg-color');
				let textColor = $body.find('article.is-selected[data-text-color]').attr('data-text-color') || $body.find('article[data-text-color]').attr('data-text-color');

				this.root.style.removeProperty('--bg-color');
				this.root.style.removeProperty('--text-color');
				this.root.style.setProperty('--text-shadow-color', 'rgba(' + this.hexToRgb(sphereSettings.bg_color) + ', .5)');
				this.root.style.setProperty('--box-shadow-color', 'rgba(' + this.hexToRgb(sphereSettings.text_color) + ', .12)');

				if (bgColor) {
					this.root.style.setProperty('--bg-color', bgColor);
					this.root.style.setProperty('--text-shadow-color', 'rgba(' + this.hexToRgb(bgColor) + ', .5)');
				}
				if (textColor) {
					this.root.style.setProperty('--text-color', textColor);
					this.root.style.setProperty('--box-shadow-color', 'rgba(' + this.hexToRgb(textColor) + ', .12)');
				}
			}

		} const sphereColors = new SphereColors();
		  window.sphereColors = sphereColors;




		// -------------
		// Main Menu
		// -----------

		class MainMenu {
			constructor() {

				this.$mainMenu = $('#main-menu');
				this.header = document.querySelector('header');
				this.nav = document.querySelector('header nav');

				$window.on('load resize', () => {
					 this.fullscreenMenu();
				});

				// Fullscreen Menu Toggle

				$body.on('click', '#menu-opener, .menu-opened #main-menu .menu-item:not(.menu-item-has-children) > a', () => {
					$body.toggleClass('menu-opened');
					sphereApp.footerOverflow();

					if ($body.hasClass('menu-opened')) {
						scrollLock.disablePageScroll(this.nav);

						anime.timeline({ easing: 'cubicBezier(0.13, 0.28, 0, 0.91)' }).add({
							duration: 600,
						}).add({
							targets: document.querySelectorAll('#main-menu > .menu-item'),
							opacity: [0,1],
							translateY: ['75%','0'],
							translateZ: 0,
							duration: 1000,
							delay: (el, i, l) => {
								return i * 200;
							}
						});

					} else { scrollLock.enablePageScroll(); }
				});

				// Fullscreen Submenu Toggle

				$body.on('click', '#main-menu > .menu-item-has-children', (event) => {
					if (!$body.hasClass('fullscreen-menu')) { return; }

					let $parentItem = $(event.currentTarget),
						submenu = event.currentTarget.querySelector('.sub-menu'),
						submenuItems = submenu.querySelectorAll('.menu-item'),
						animeSubmenu = {
							targets: submenuItems,
							opacity: [0,1],
							translateY: [30,0],
							translateZ: 0,
							duration: 700,
							easing: 'cubicBezier(0.13, 0.28, 0, 0.91)',
							delay: (el, i, l) => {
								return i * 150;
							},
							complete: () => {
								this.$mainMenu.removeClass('is-animating');
							}
						};

					if (this.$mainMenu.hasClass('is-animating')) { return; }
						this.$mainMenu.addClass('is-animating');

					if ($parentItem.hasClass('submenu-toggled')) { // Close
						$parentItem.removeClass('submenu-toggled');
						this.$mainMenu.removeClass('is-animating');
						sphereApp.toggleHeight(submenu);

					} else if (!$('#main-menu .menu-item-has-children.submenu-toggled').length) { // Open
						$parentItem.addClass('submenu-toggled');
						sphereApp.toggleHeight(submenu);
						setTimeout(() => {
							anime(animeSubmenu);
						}, 400);

					} else {
						$('#main-menu .menu-item-has-children.submenu-toggled').removeClass('submenu-toggled'); // Switch
						$('#main-menu > .menu-item > .sub-menu').height('0');
						setTimeout(() => {
							$parentItem.addClass('submenu-toggled');
							sphereApp.toggleHeight(submenu);
							setTimeout(() => {
								anime(animeSubmenu);
							}, 400);
						}, 400);
					}
				});

			}

			// Update Main Menu

			updateMenu($ajaxResponse) {
				this.$mainMenu.html($ajaxResponse.find('#main-menu').html());
				this.fullscreenMenu();
			}

			// Fullscreen Menu Toggle

			fullscreenMenu() {
				$body.removeClass('fullscreen-menu');

				if ((this.header.scrollWidth > this.header.clientWidth) || sphereApp.isTouchDevice) {
					$body.addClass('fullscreen-menu');

				} else {
					$('#main-menu .menu-item').removeClass('submenu-toggled');
					$('#main-menu .sub-menu').removeAttr('style');
					$body.removeClass('menu-opened');
					scrollLock.enablePageScroll();
				}
			}

		} const mainMenu = new MainMenu();




		// -------------
		// Preloader
		// -----------

		class Preloader {

			constructor() {
				this.initLoad = true;
				this.$preloader = $('#preloader .indicator span');
			}

			// Show

			show() { $html.addClass('is-loading'); }

			// Trigger

			trigger() {
				$html.scrollTop('0');

				let imagesTotal = $body.find('img').length, imageCount = 0;
				$body.imagesLoaded().progress(() => {
					imageCount++;
					this.$preloader.css('width', imageCount / imagesTotal * 100 + '%');
				});

				$body.imagesLoaded().always(() => {
					this.$preloader.css('width', '100%');
					setTimeout(() => { this.hide(); }, 500);
				});
			}

			// Hide

			hide() {
				if (this.initLoad) {
					$html.removeClass('init-loading');
					this.initLoad = false;
				} else {
					$html.removeClass('is-loading');
				}
				afterPageLoad();
				setTimeout(() => { this.$preloader.css('width', '0%'); }, 500);
			}

		} const preloader = new Preloader();




		// -------------------
		// After Page Load
		// -----------------

		let afterPageLoad = () => {

			// Update Colors
			sphereColors.update();

			// Underlined Headings
			$('.is-style-underlined, .is-style-underlined-xl').wrapInner('<span></span>');

			// Responsive Table
			$('.entry-content table').wrap('<div class="responsive-table"></div>');

			// Styled Select
			$('select:not([multiple])').wrap('<div class="styled-select"></div>');
			if ($('select#cat').length) { // Select category dropdown fix
				let dropdown = document.getElementById("cat");
				dropdown.onchange = () => {
					if (dropdown.options[ dropdown.selectedIndex ].value > 0) {
						dropdown.parentNode.parentNode.submit();
					}
				};
			}

			// Buttons
			$('a.button, form button, .wp-block-button__link').each((i ,el) => {
				$(el).attr('data-hover', $(el).html());
				$(el).wrapInner('<span></span>');
			});

			// FitVids
			$("#content").fitVids();

			// Bottom Check
			if ($window.scrollTop() + $window.height() > $(document).height() - 100) {
				$body.addClass('at-the-bottom');
			}

			// Contact Form 7
			if ($('.wpcf7-form').length) {
				if (typeof wpcf7.initForm !== "undefined") { wpcf7.initForm($('.wpcf7-form')); }
				if (typeof wpcf7.init !== "undefined") { wpcf7.init($('.wpcf7-form')[0]); }
			}

			// Sharer
			if (typeof Sharer !== 'undefined') { Sharer.init(); }

			sphereApp.flickityFocus();
			sphereApp.parallaxImages();
			sphereApp.footerOverflow();
			scrollLock.enablePageScroll();
			setTimeout(() => { sphereApp.revealEffects(); }, 250);
		};




		// -------------------
		// Ajax Controller
		// -----------------

		class Ajax {
			constructor() {

				this.homeUrl = sphereSettings.home_url;
				this.$content = $('#content');

				// Initial Load
				spherePortfolio.layouts(this.$content);
				preloader.trigger();

				// Extend jQuery selector for internal links
				$.expr[':'].internal = (obj) => {
					let $this = $(obj),
						url = $this.attr('href') || '',
						isInternalLink = window.location.hostname === 'imac.local' || url.substring(0, this.homeUrl.length) === this.homeUrl || url.indexOf(':') === -1;

					return isInternalLink;
				};

				// Ajaxify Links & Exclude selectors for own business
				$body.on('click', 'a:internal:not(.no-ajax, .comment-reply-link, #cancel-comment-reply-link, [href*="wp-content/uploads/"], [href*="wp-login"], [href*="wp-admin"], [target="_blank"])', (event) => {

					// Continue as normal for cmd + clicks, no-ajax & wp-customizer
					if (event.which === 2 || event.metaKey || $body.hasClass('customize-partial-edit-shortcuts-shown')|| $body.hasClass('customize-partial-edit-shortcuts-hidden')) { return true; }

					// Check if first menu item separator is clicked
					if ($body.hasClass('fullscreen-menu') && $(event.currentTarget).is('#main-menu > .menu-item-has-children > a')) {
						event.preventDefault();
						return true;
					}

					event.preventDefault();

					// Can go back in history
					sphereApp.backButtonReady = true;

					// Push browser state & change page
					let url = $(event.currentTarget).attr('href');
					if (!url.match('^#')) {
						history.pushState({ checkIn: true }, document.title, url);

						// Loading...
						this.changePage(url);
					}
				});

				// Ajaxed Search
				$body.on('submit', '#search-form', (event) => {
					event.preventDefault();
					let searchUrl = this.homeUrl + '?' + $(event.currentTarget).serialize();

					history.pushState({ checkIn: true }, document.title, searchUrl);
					this.changePage(searchUrl);
				});

				// Scroll Position Restoration
				if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }

				// Using History / Browser's Buttons
				history.replaceState({ checkIn: true }, null);
				$window.on('popstate', (event) => {

					// Avoid initial popstate @Safari
					if (!event.originalEvent.state.checkIn) { return; }

					// Loading...
					this.changePage(window.location.href);
				});

			}




			// ---------------
			// Change Page
			// -------------

			changePage(url) {

				// Start page transition
				preloader.show();

				// Ajax call - Load new page
				setTimeout(() => { // Avoid flash of loaded content
					this.$content.load(url + ' #content > *', (ajaxResponse, status) => {

						// Prepare ajax response
						let $ajaxResponse = $(ajaxResponse.replace(/<(body)([\s\>])/gi, '<div id="$1"$2').replace(/<\/(body)\>/gi, '</div>'));

						// 404
						if (status == "error") { $('#content').html($ajaxResponse.find('#content').html()); }

						// Change page title
						let newTitle = $ajaxResponse.filter('title').text();
						document.title = newTitle;

						// Update body classes
						let bodyClasses = $ajaxResponse.filter('#body').attr('class');
						$body.attr('class', bodyClasses);

						// Update menu & navigation
						mainMenu.updateMenu($ajaxResponse);

						// Update admin bar
						if ($body.hasClass('admin-bar')) { $('#wpadminbar').html($ajaxResponse.find('#wpadminbar').html()); }

						// Add & execute scripts
						let $scripts = $ajaxResponse.find('#content script');

						$scripts.each((i, script) => {
							let scriptText = $(script).html();
							if ('' !== scriptText) {
								let script = document.createElement('script'),
									textNode = document.createTextNode(scriptText);
								script.appendChild(textNode);
								this.$content[0].appendChild(script);
							} else {
								$.getScript($(script).attr('src'));
							}
						});

						// Safari Object-Fit Fix
						sphereApp.safariAjaxImagesFix();

						// Sphere Portfolio
						spherePortfolio.layouts($ajaxResponse);

						// Trigger preloader
						preloader.trigger();

						// Inform Google Analytics of the page load
						let relativeUrl = url.replace(this.homeUrl, '');
						if (typeof _gaq !== 'undefined') {
							_gaq.push(['_trackPageview', relativeUrl]);
						} else if (typeof ga !== 'undefined') {
							ga('send', 'pageview', {
								'page': relativeUrl,
								'title': newTitle
							});
						}

					});

				}, 500); // End of ajax call

			} // End of changePage

		}
		
	$(document).ready(function () {
		const ajax = new Ajax();
	}); 

	//

})(jQuery, window);


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


((window) => {

	'use strict';

	window.sr = ScrollReveal({ container: document.documentElement, viewFactor: 0.05 });

	// ------------------
	// Reveal Effects
	// ----------------

	let revealEffects = () => {

		// Reveal Effects

		sr.reveal('.reveal-zoom-in', { duration: 2000 });
		sr.reveal('.reveal-zoom-out', { duration: 2000, scale: 1.1 });
		sr.reveal('.reveal-fade-in', { duration: 1500, delay: 200, scale: 1, distance: '0', easing: 'linear' });
		sr.reveal('.reveal-fade-up', { duration: 2000, scale: 1, distance: '10%', origin: 'bottom' });
		sr.reveal('.reveal-fade-left', { duration: 2000, scale: 1, distance: '10%', origin: 'right' });
		sr.reveal('.reveal-fade-right', { duration: 2000, scale: 1, distance: '10%', origin: 'left' });

		// Reveal Defaults

		sr.reveal('.delay-500', { delay: 500 });
		sr.reveal('.delay-1000', { delay: 1000 });
		sr.reveal('.delay-1500', { delay: 1500 });
		sr.reveal('.delay-2000', { delay: 2000 });
		sr.reveal('.delay-2500', { delay: 2500 });
		sr.reveal('.delay-3000', { delay: 3000 });
		sr.reveal('.delay-3500', { delay: 3500 });
		sr.reveal('.delay-4000', { delay: 4000 });
		sr.reveal('.delay-4500', { delay: 4500 });
		sr.reveal('.delay-5000', { delay: 5000 });

		// Portfolio Titles

		sr.reveal('.portfolio-titles article', {
			duration: 3000, scale: 1.1, distance: '0%', easing: 'cubic-bezier(0.13, 0.28, 0, 0.91)'
		}, 200);



		// Reveal Text

		sr.reveal('.reveal-text-fx', {
			duration: 500, distance: 0, opacity: 0, scale: 1,

			beforeReveal: (textElement) => {
				const splittingText = Splitting({
					target: textElement,
					by: 'lines'
				});

				splittingText.forEach(splitResult => {
					Splitting({ target: splitResult.el, by: 'chars', force: true });
				});

				splittingText.forEach((splitResult) => {
					if (splitResult.lines.length != 0) {
						const wrappedLines = splitResult.lines.map((wordsArr) => `
							<span class="line">
								${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace">
							</span>`).join('')}
						</span>`).join('');
						splitResult.el.innerHTML = wrappedLines;
					}
				});

				textElement.querySelectorAll('.word .word').forEach((item) => {
					item.outerHTML = item.innerHTML;
				});
			},

		    afterReveal: (textElement) => {
		        anime({
		            targets: textElement.querySelectorAll('.reveal-text-fx .char'),
		            opacity: 1,
		            duration: 1000,
		            easing: 'easeOutCirc',
					translateY: [100,0],
		            delay: (el,i) => { return i * 15; },
		        });
		    }
		});



		// Counter

		sr.reveal('.counter-number', {
			duration: 20, distance: 0, opacity: 0, scale: 1,
			afterReveal: (counterElement) => {
				let num = counterElement.innerHTML, complete = num;
				if (isNaN(num)) { num = 999; complete = 'X'; }
				anime({
					targets: counterElement,
					duration: 4000,
					innerHTML: [0, num],
					round: 1,
					easing: 'easeOutCubic',
					complete: () => {
						counterElement.innerHTML = complete;
					}
				});
			}

		}, 200);

		//

	}; sphereApp.revealEffects = revealEffects;

})(window);


(($, window) => {

	'use strict';

	// -------------
	// Cursor FX
	// -----------

	class Cursor {
	    constructor() {

	        this.el = document.getElementById('cursor');
	        this.el.style.opacity = 0;

	        this.bounds = this.el.getBoundingClientRect();

	        this.renderedStyles = {
	            tx: { previous: 0, current: 0, ease: 0.2 },
	            ty: { previous: 0, current: 0, ease: 0.2 },
	            scale: { previous: 1, current: 1, ease: 0.2 },
	            opacity: { previous: 1, current: 1, ease: 0.2 }
	        };

	        this.onMouseMoveEv = () => {
	            this.renderedStyles.tx.previous = this.renderedStyles.tx.current = sphereApp.mouse.x - this.bounds.width / 2;
	            this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = sphereApp.mouse.y - this.bounds.height / 2;

				anime({
					targets: this.el,
					duration: 0.9,
					easing: 'easeInOutElastic',
					opacity: 1,
				});

	            window.removeEventListener('mousemove', this.onMouseMoveEv);
				this.render();
	        };
	        window.addEventListener('mousemove', this.onMouseMoveEv);
	    }

	    enter() {
	        this.renderedStyles.scale.current = 2;
			this.el.style.opacity = 0.001;
	    }

	    leave() {
	        this.renderedStyles.scale.current = 1;
			this.el.style.opacity = 1;
	    }

	    render() {
	        this.renderedStyles.tx.current = sphereApp.mouse.x - this.bounds.width / 2;
	        this.renderedStyles.ty.current = sphereApp.mouse.y - this.bounds.height / 2;

	        for (const key in this.renderedStyles ) {
	            this.renderedStyles[key].previous = sphereApp.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
	        }

	        this.el.style.transform = `translateX(${(this.renderedStyles.tx.previous)}px) translateY(${this.renderedStyles.ty.previous}px) scale(${this.renderedStyles.scale.previous})`;

	        requestAnimationFrame(() => this.render());
	    }
	}

	// Init & Events

	if (sphereSettings.cursor_fx && document.getElementById('cursor')) {

		const cursor = new Cursor();
		const $html = $(document.documentElement);
		const $body = $(document.body);

		$body.on('mouseenter', '.cursor-fx-hover, a, button, input, select, textarea, input[type="checkbox"] + label, input[type="radio"] + label, pre, .flickity-page-dots .dot', () => {
			cursor.enter();
		});

		$body.on('mouseleave', '.cursor-fx-hover, a, button, input, select, textarea, input[type="checkbox"] + label, input[type="radio"] + label, pre, .flickity-page-dots .dot', () => {
			cursor.leave();
		});

		$(document).ajaxComplete(() => {
			setTimeout(() => { cursor.renderedStyles.scale.current = 1; }, 150);
			if (!$html.hasClass('init-loading')) { setTimeout(() => { cursor.el.style.opacity = 1; }, 300); }
		});

	}

})(jQuery, window);


((window) => {

	'use strict';

    // Viewport Size

    let winsize;
    const calcWinsize = () => {
        winsize = { width: window.innerWidth, height: window.innerHeight };
    };

    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    // Get Scroll Position

    let docScroll = 0;
    const getPageYScroll = () => {
        docScroll = window.pageYOffset || document.documentElement.scrollTop;
    };

    window.addEventListener('scroll', getPageYScroll);



    // -----------------
    // Parallax Item
    // ---------------

    class Item {
        constructor(el) {

            this.DOM = {el: el};
            this.DOM.image = this.DOM.el.querySelector('.is-style-parallax img');

            this.renderedStyles = {
                imageScale: {
                    previous: 0,
                    current: 0,
                    ease: 0.1,
                    setValue: () => {
                        const toValue = 10;
                        const fromValue = -10;
                        const val = sphereApp.map(this.props.top - docScroll, winsize.height, -1 * this.props.height, fromValue, toValue);
                        return Math.max(Math.min(val, toValue), fromValue);
                    }
                }
            };

            this.getSize();
            this.update();

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => this.isVisible = entry.isIntersecting);
            });
            this.observer.observe(this.DOM.el);

            window.addEventListener('resize', () => this.resize());
        }

        update() {
            for (const key in this.renderedStyles ) {
                this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
            }
            this.layout();
        }

        getSize() {
            const rect = this.DOM.el.getBoundingClientRect();
            this.props = {
                height: rect.height,
                top: docScroll + rect.top
            };
        }

        resize() {
            this.getSize();
            this.update();
        }

        render() {
            for (const key in this.renderedStyles ) {
                this.renderedStyles[key].current = this.renderedStyles[key].setValue();
                this.renderedStyles[key].previous = sphereApp.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
            }

            this.layout();
        }

        layout() {
            this.DOM.image.style.transform = `translateY(${this.renderedStyles.imageScale.previous}%) scale(1.1)`;
        }
    }

    // ------------------
    // Parallax Images
    // ----------------

    class ParallaxImages {

        constructor() {
            this.items = [];
            this.content = document.querySelector('#content');
            [...this.content.querySelectorAll('.is-style-parallax')].forEach(item => this.items.push(new Item(item)));

            requestAnimationFrame(() => this.render());
        }

        render() {

            for (const item of this.items) {
                if (item.isVisible) {
                    if (item.insideViewport) {
                        item.render();
                    }
                    else {
                        item.insideViewport = true;
                        item.update();
                    }
                }
                else {
                    item.insideViewport = false;
                }
            }

            requestAnimationFrame(() => this.render());
        }
    }

    sphereApp.parallaxImages = () => {
        new ParallaxImages();
    };

})(window);
