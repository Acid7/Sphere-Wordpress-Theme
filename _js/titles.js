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
