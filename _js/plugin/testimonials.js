(() => {

	'use strict';

	let __ = wp.i18n.__,
		el = wp.element.createElement,
		compose = wp.compose.compose,
		TextControl = wp.components.TextControl,
		PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel,
		registerPlugin = wp.plugins.registerPlugin,
		withSelect = wp.data.withSelect,
		withDispatch = wp.data.withDispatch;

	registerPlugin('a7x-testimonials-meta', {
		render: () => {

			return el(PluginDocumentSettingPanel, {
				name: 'a7x-testimonials-meta',
				icon: 'editor-quote',
				title: __('Citation Fields', 'sphere-plugin'),
			},

			el(MetaTextControl, {
				metaKey: '_a7x_testimonials_author',
				title: __('Author', 'sphere-plugin'),
			}),

			el(MetaTextControl, {
				metaKey: '_a7x_testimonials_author_subtitle',
				title: __('Author Subtitle', 'sphere-plugin'),
			})

		);
	}});

	// Text Control

	let MetaTextControl = compose(withDispatch((dispatch, props) => {
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
		return el(TextControl, {
			label: props.title,
			value: props.metaValue,
			onChange: (value) => {
				props.setMetaValue(value);
			}
		});
	});

})();
