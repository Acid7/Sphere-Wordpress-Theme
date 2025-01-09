// @codekit-prepend "portfolio.js";
// @codekit-prepend "titles.js";
// @codekit-prepend "portfolio-detail.js";
// @codekit-append "interactions.js";
// @codekit-append "reveal-fx.js";
// @codekit-append "cursor.js";
// @codekit-append "parallax-images.js"

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

		} const ajax = new Ajax();

	//

})(jQuery, window);
