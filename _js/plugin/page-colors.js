(() => {

	'use strict';

	let __ = wp.i18n.__,
		el = wp.element.createElement,
		compose = wp.compose.compose,
		Fragment = wp.element.Fragment,
		PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel,
		registerPlugin = wp.plugins.registerPlugin,
		ColorPicker = wp.components.ColorPicker,
		Button = wp.components.Button,
		withSelect = wp.data.withSelect,
		withDispatch = wp.data.withDispatch;




	// ---------------
	// Page Colors
	// -------------

	registerPlugin('a7x-page-bg-color', {
		render: () => {

			return el(PluginDocumentSettingPanel, {
				name: 'page-bg-color',
				icon: 'art',
				title: __('Background Color', 'sphere-plugin'),
			},

			el(MetaColorControl, {
				metaKey: '_a7x_page_bg_color',
			}),

			el(Button, {
				className: 'a7x-reset-color',
				isSecondary: true,
				onClick: () => {
					wp.data.dispatch('core/editor').editPost({meta: {
						_a7x_page_bg_color: '',
					}});
					wp.data.dispatch('core/editor').savePost();
				},
			}, __('Clear Color', 'sphere-plugin'))

		);
	}});

	registerPlugin('a7x-page-text-color', {
		render: () => {

			return el(PluginDocumentSettingPanel, {
				name: 'page-text-color',
				icon: 'admin-customizer',
				title: __('Text Color', 'sphere-plugin'),
			},

			el(MetaColorControl, {
				metaKey: '_a7x_page_text_color',
			}),

			el(Button, {
				className: 'a7x-reset-color',
				isSecondary: true,
				onClick: () => {
					wp.data.dispatch('core/editor').editPost({meta: {
						_a7x_page_text_color: '',
					}});
					wp.data.dispatch('core/editor').savePost();
				},
			}, __('Clear Color', 'sphere-plugin'))

		);
	}});

	// Color Control

	let MetaColorControl = compose(withDispatch((dispatch, props) => {
		return {
			setMetaValue: (metaValue) => {
				let _meta;
				dispatch('core/editor').editPost({
					meta: (_meta = {}, _meta[props.metaKey] = metaValue, _meta)
				});
			}
		};

	}), withSelect((select, props) => {
		return {
			metaValue: select('core/editor').getEditedPostAttribute('meta')[props.metaKey],
		};

	}))((props) => {
		return el(ColorPicker, {
			disableAlpha: true,
			color: props.metaValue,
		    onChangeComplete: (value) => {
				props.setMetaValue(value.hex);
			},
		});
	});


})();
