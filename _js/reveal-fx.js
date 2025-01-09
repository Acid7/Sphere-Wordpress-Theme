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
