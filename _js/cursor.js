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
