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
