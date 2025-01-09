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
