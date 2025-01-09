wp.domReady(() => {

	'use strict';

	let __ = wp.i18n.__;

	// ----------
	// Styles
	// --------

	// Headings
	wp.blocks.registerBlockStyle('core/heading', { name: 'underlined', label: __('Underlined', 'sphere-plugin') });
	wp.blocks.registerBlockStyle('core/heading', { name: 'underlined-xl', label: __('Underlined XL', 'sphere-plugin') });

	// Paragraphs
	wp.blocks.registerBlockStyle('core/paragraph', { name: 'excerpt', label: __('Excerpt', 'sphere-plugin') });
	wp.blocks.registerBlockStyle('core/paragraph', { name: 'excerpt-big', label: __('Excerpt Big', 'sphere-plugin') });
	wp.blocks.registerBlockStyle('core/paragraph', { name: 'info-box', label: __('Info Box', 'sphere-plugin') });

	// Images
	wp.blocks.registerBlockStyle('core/image', { name: 'parallax', label: __('Parallax', 'sphere-plugin') });

	// Buttons
	wp.blocks.unregisterBlockStyle('core/button', 'fill');
	wp.blocks.unregisterBlockStyle('core/button', 'squared');
	wp.blocks.unregisterBlockStyle('core/button', 'outline');
	wp.blocks.registerBlockStyle('core/button', { name: 'fill', label: __('Fill', 'sphere-plugin') });

	// Blockquotes
	wp.blocks.unregisterBlockStyle('core/quote', 'large');
	wp.blocks.unregisterBlockStyle('core/pullquote', 'solid-color');

	// Tables
	wp.blocks.registerBlockStyle('core/table', { name: 'regular', label: __('Default', 'sphere-plugin'), isDefault: true });

});



(() => {

	'use strict';

	let __ = wp.i18n.__,
		el = wp.element.createElement,
		compose = wp.compose.compose,
		registerBlockType = wp.blocks.registerBlockType,
		ServerSideRender = wp.serverSideRender,
		TextControl = wp.components.TextControl,
		RangeControl = wp.components.RangeControl,
		SelectControl = wp.components.SelectControl,
		CheckboxControl = wp.components.CheckboxControl,
		InspectorControls = wp.blockEditor.InspectorControls,
		PanelBody =  wp.components.PanelBody;



	// ---------------------
	// Subheading Button
	// -------------------

    let SubheadingButton = (props) => {
		return el(
			wp.element.Fragment, null, el(
				wp.blockEditor.BlockControls, null, el(
					wp.components.ToolbarGroup, null, el(
						wp.components.ToolbarButton, {
						    icon: 'heading',
						    label: __('Subheading', 'sphere-plugin'),
							onClick: () => {
								props.onChange(wp.richText.toggleFormat(props.value, {
									type: 'a7x/subheading'
								}));
							},
							isPressed: props.isActive,
						}
					)
				)
			)
		);
    };

    let SubheadingButtonCondition = compose(
        wp.data.withSelect((select) => {
            return {
                selectedBlock: wp.data.select('core/block-editor').getSelectedBlock()
            };
        }),
        wp.compose.ifCondition((props) => {
            return (
                props.selectedBlock &&
                props.selectedBlock.name === 'core/heading'
            );
        } )
    )(SubheadingButton);

    wp.richText.registerFormatType(
        'a7x/subheading', {
            title: __('Subheading', 'sphere-plugin'),
            tagName: 'small',
            className: null,
            edit: SubheadingButtonCondition,
        }
    );




	// ----------
	// Blocks
	// --------

	// Portfolio Archive

	registerBlockType('a7x/portfolio-archive', {
		title: __('Portfolio Archive', 'sphere-plugin'),
		icon: 'format-gallery',
		category: 'sphere-blocks',
		edit: (props) => {
			let attributes = props.attributes,
				setAttributes = props.setAttributes;

			return [
				el(ServerSideRender, {
					block: 'a7x/portfolio-archive',
					attributes: attributes,
				}),
				el(InspectorControls, {},
					el(PanelBody, { title: __('Settings', 'sphere-plugin'), initialOpen: true },
						el(SelectControl, {
							label: __('Layout', 'sphere-plugin'),
							value: attributes.layout,
							options: [
								{ label: 'Slideshow', value: 'portfolio-slideshow' },
								{ label: 'Carousel', value: 'portfolio-carousel' },
								{ label: 'Titles', value: 'portfolio-titles' },
								{ label: 'Film', value: 'portfolio-film' },
							],
							onChange: (value) => {
								setAttributes({ layout: value });
							},
						}),
						el(TextControl, {
							label: __('Number Of Posts', 'sphere-plugin'),
							help: __('Use (-1) for all posts.', 'sphere-plugin'),
							value: attributes.posts,
							onChange: (value) => {
								setAttributes({ posts: value });
							},
						}),
						el(TextControl, {
							label: __('Category Slug (optional)', 'sphere-plugin'),
							value: attributes.category,
							onChange: (value) => {
								setAttributes({ category: value });
							},
						}),
						el(SelectControl, {
							label: __('Order By', 'sphere-plugin'),
							value: attributes.orderby,
							options: [
								{ label: 'Date', value: 'date' },
								{ label: 'Title', value: 'title' },
							],
							onChange: (value) => {
								setAttributes({ orderby: value });
							},
						}),
						el(SelectControl, {
							label: __('Order', 'sphere-plugin'),
							value: attributes.order,
							options: [
								{ label: 'Descending', value: 'DESC' },
								{ label: 'Ascending', value: 'ASC' },
							],
							onChange: (value) => {
								setAttributes({ order: value });
							},
						})
					)
				),
			];
		},
		save: () => {
			return null;
		},
	});




	// Testimonials Slider

	registerBlockType('a7x/testimonials-slider', {
		title: __('Testimonials Slider', 'sphere-plugin'),
		icon: 'editor-quote',
		category: 'sphere-blocks',
		edit: (props) => {
			return [
				el(ServerSideRender, {
					block: 'a7x/testimonials-slider',
				}),
			];
		},
		save: () => {
			return null;
		},
	});




	// Counter

	let PlainText = wp.blockEditor.PlainText;

	registerBlockType('a7x/counter', {
		title: __('Counter', 'sphere-plugin'),
		icon: 'performance',
		category: 'sphere-blocks',
		supports: { align: ['wide', 'full'], default: '' },
		attributes: {
			counter1: { source: 'text', selector: '#counter-1' },
			text1: { source: 'text', selector: '#counter-text-1' },
			counter2: { source: 'text', selector: '#counter-2' },
			text2: { source: 'text', selector: '#counter-text-2' },
			counter3: { source: 'text', selector: '#counter-3' },
			text3: { source: 'text', selector: '#counter-text-3' },
			counter4: { source: 'text', selector: '#counter-4' },
			text4: { source: 'text', selector: '#counter-text-4' },
		},

		edit: (props) => {
			let attributes = props.attributes,
				setAttributes = props.setAttributes;

			return el('div', { className: 'wp-block-a7x-counter' },

				el('div', { className: 'counter-item' },
					el(PlainText, { placeholder: '123', id: 'counter-1', className: 'counter-number', value: attributes.counter1,
						onChange: (value) => { setAttributes({ counter1: value }); }
					}),
					el(PlainText, { placeholder: 'Lorem Ipsum', id: 'counter-text-1', className: 'counter-text', value: attributes.text1,
						onChange: (value) => { setAttributes({ text1: value }); }
					})
				),
				el('div', { className: 'counter-item' },
					el(PlainText, { placeholder: '123', id: 'counter-2', className: 'counter-number', value: attributes.counter2,
						onChange: (value) => { setAttributes({ counter2: value }); }
					}),
					el(PlainText, { placeholder: 'Lorem Ipsum', id: 'counter-text-2', className: 'counter-text', value: attributes.text2,
						onChange: (value) => { setAttributes({ text2: value }); }
					})
				),
				el('div', { className: 'counter-item' },
					el(PlainText, { placeholder: '123', id: 'counter-3', className: 'counter-number', value: attributes.counter3,
						onChange: (value) => { setAttributes({ counter3: value }); }
					}),
					el(PlainText, { placeholder: 'Lorem Ipsum', id: 'counter-text-3', className: 'counter-text', value: attributes.text3,
						onChange: (value) => { setAttributes({ text3: value }); }
					})
				),
				el('div', { className: 'counter-item' },
					el(PlainText, { placeholder: '123', id: 'counter-4', className: 'counter-number', value: attributes.counter4,
						onChange: (value) => { setAttributes({ counter4: value }); }
					}),
					el(PlainText, { placeholder: 'Lorem Ipsum', id: 'counter-text-4', className: 'counter-text', value: attributes.text4,
						onChange: (value) => { setAttributes({ text4: value }); }
					})
				)
			);
		},

		save: (props) => {
			let attributes = props.attributes;

			return el('div', { className: 'wp-block-a7x-counter' },
				el('div', { className: 'counter-item' },
					attributes.counter1 && el('div', { id: 'counter-1', className: 'counter-number'}, attributes.counter1),
					attributes.text1 && el('div', { id: 'counter-text-1', className: 'counter-text'}, attributes.text1)
				),
				el('div', { className: 'counter-item' },
					attributes.counter2 && el('div', { id: 'counter-2', className: 'counter-number'}, attributes.counter2),
					attributes.text2 && el('div', { id: 'counter-text-2', className: 'counter-text'}, attributes.text2)
				),
				el('div', { className: 'counter-item' },
					attributes.counter3 && el('div', { id: 'counter-3', className: 'counter-number'}, attributes.counter3),
					attributes.text3 && el('div', { id: 'counter-text-3', className: 'counter-text'}, attributes.text3)
				),
				el('div', { className: 'counter-item' },
					attributes.counter4 && el('div', { id: 'counter-4', className: 'counter-number'}, attributes.counter4),
					attributes.text4 && el('div', { id: 'counter-text-4', className: 'counter-text'}, attributes.text4)
				)
			);
		}
	});




	// -------------
	// Reveal FX
	// -----------

	let addFilter = wp.hooks.addFilter,
		Fragment = wp.element.Fragment,
		createHigherOrderComponent = wp.compose.createHigherOrderComponent;

	let excludedRevealBlocks = ['a7x/portfolio-archive', 'core/shortcode', 'core/spacer'];

	// Extend Core Blocks Attributes

	let extendAttributes = (settings, name) => {

		// Reveal Effect
		if (typeof settings.attributes !== 'undefined') {
			settings.attributes = Object.assign(settings.attributes,
				{ revealFx: { type: 'string', default: '' } },
				{ revealDelay: { type: 'string', default: '' } }
			);
		}

		return settings;

	}; addFilter('blocks.registerBlockType', 'a7x/extend-attributes', extendAttributes);

	// Remove From Array Helper

	let removeFromArray = (original, remove) => {
		return original.filter((value) => {
			return !remove.includes(value);
		});
	};

	// Refresh String Of Classes

	let refreshClasses = (original, remove, add) => {
		let classesArray, newArray;
		if (original) {
			classesArray = original.split(' ');
			newArray = removeFromArray(classesArray, remove);
		} else { newArray = []; }
		if (add) { newArray.push(add); }
		return newArray.join(' ');
	};



	// ------------------------
	// Reveal Effect Control
	// -----------------------

	let revealFxControl = createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (excludedRevealBlocks.includes(props.name)) {
				return el(BlockEdit, props);
			}

			let attributes = props.attributes,
				fxArray = ['reveal-zoom-in', 'reveal-zoom-out', 'reveal-fade-in', 'reveal-fade-up', 'reveal-fade-left', 'reveal-fade-right', 'reveal-text-fx'],
				delayArray = ['delay-500', 'delay-1000', 'delay-1500', 'delay-2000', 'delay-2500', 'delay-3000', 'delay-3500', 'delay-4000', 'delay-4500', 'delay-5000'];

			return el(Fragment, null, el(BlockEdit, props), el(InspectorControls, null, el(PanelBody, {
				title: __('Reveal Effect', 'sphere-plugin'),
				initialOpen: false
				}, el(SelectControl, {
					label: __('Effect', 'sphere-plugin'),
					value: attributes.revealFx,
					options: [
						{ label: __('None', 'sphere-plugin'), value: '' },
						{ label: __('Zoom In', 'sphere-plugin'), value: 'reveal-zoom-in' },
						{ label: __('Zoom Out', 'sphere-plugin'), value: 'reveal-zoom-out' },
						{ label: __('Fade In', 'sphere-plugin'), value: 'reveal-fade-in' },
						{ label: __('Fade In Up', 'sphere-plugin'), value: 'reveal-fade-up' },
						{ label: __('Fade In Left', 'sphere-plugin'), value: 'reveal-fade-left' },
						{ label: __('Fade In Right', 'sphere-plugin'), value: 'reveal-fade-right' },
						{ label: __('Reveal Text', 'sphere-plugin'), value: 'reveal-text-fx' },
					],
					onChange: (value) => {
						let newValue = refreshClasses(attributes.className, fxArray, value);
						props.setAttributes({
							revealFx: value,
							className: newValue,
						});
					}
				}), el(SelectControl, {
					label: __('Delay', 'sphere-plugin'),
					value: attributes.revealDelay,
					options: [
						{ label: __('None', 'sphere-plugin'), value: '' },
						{ label: __('500ms', 'sphere-plugin'), value: 'delay-500' },
						{ label: __('1000ms', 'sphere-plugin'), value: 'delay-1000' },
						{ label: __('1500ms', 'sphere-plugin'), value: 'delay-1500' },
						{ label: __('2000ms', 'sphere-plugin'), value: 'delay-2000' },
						{ label: __('2500ms', 'sphere-plugin'), value: 'delay-2500' },
						{ label: __('3000ms', 'sphere-plugin'), value: 'delay-3000' },
						{ label: __('3500ms', 'sphere-plugin'), value: 'delay-3500' },
						{ label: __('4000ms', 'sphere-plugin'), value: 'delay-4000' },
						{ label: __('4500ms', 'sphere-plugin'), value: 'delay-4500' },
						{ label: __('5000ms', 'sphere-plugin'), value: 'delay-5000' },
					],
					onChange: (value) => {
						let newValue = refreshClasses(attributes.className, delayArray, value);
						props.setAttributes({
							revealDelay: value,
							className: newValue,
						});
					}
				})
			)));

		};
	}, 'revealFxControl');

	addFilter('editor.BlockEdit', 'a7x/reveal-fx-control', revealFxControl);



})();
