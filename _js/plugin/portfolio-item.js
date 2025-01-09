(() => {

	'use strict';

	let __ = wp.i18n.__,
		el = wp.element.createElement,
		compose = wp.compose.compose,
		Fragment = wp.element.Fragment,
		TextControl = wp.components.TextControl,
		PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel,
		registerPlugin = wp.plugins.registerPlugin,
		DatePicker = wp.components.DatePicker,
		ColorPicker = wp.components.ColorPicker,
		Button = wp.components.Button,
		ResponsiveWrapper = wp.components.ResponsiveWrapper,
		MediaUpload = wp.blockEditor.MediaUpload,
		MediaUploadCheck = wp.blockEditor.MediaUploadCheck,
		withSelect = wp.data.withSelect,
		withDispatch = wp.data.withDispatch;




	// ---------------
	// Item Fields
	// -------------

	registerPlugin('a7x-portfolio-item-meta', {
		render: () => {

			return el(PluginDocumentSettingPanel, {
				name: 'portfolio-item-meta',
				icon: 'index-card',
				title: __('Item Fields', 'sphere-plugin'),
			},

			el(MetaDateControl, {
				metaKey: '_a7x_portfolio_item_date',
				title: __('Date', 'sphere-plugin'),
			}),

			el(Button, {
				className: 'a7x-reset-date',
				isSecondary: true,
				onClick: () => {
					wp.data.dispatch('core/editor').editPost({meta: {
						_a7x_portfolio_item_date: '',
					}});
					wp.data.dispatch('core/editor').savePost();
				},
			}, __('Reset Date', 'sphere-plugin')),

			el(MetaTextControl, {
				metaKey: '_a7x_portfolio_item_client',
				title: __('Client', 'sphere-plugin'),
			}),

			el(MetaTextControl, {
				metaKey: '_a7x_portfolio_item_role',
				title: __('Role', 'sphere-plugin'),
			}),

			el(MetaTextControl, {
				metaKey: '_a7x_portfolio_item_link',
				title: __('Link', 'sphere-plugin'),
			})

		);
	}});

	// Date Control

	let MetaDateControl = compose(
		withDispatch((dispatch, props) => {
			return {
				setMetaValue: (metaValue) => {
					let _meta;
					dispatch('core/editor').editPost({
						meta: (_meta = {}, _meta[props.metaKey] = metaValue, _meta)
					});
				}
			};
		}),

		withSelect((select, props) => {
			return {
				metaValue: select('core/editor').getEditedPostAttribute('meta')[props.metaKey],
			};

		}))((props) => {
			return el(DatePicker, {
				label: props.label,
				is12Hour: true,
				currentDate: props.metaValue,
				options: props.options,
				onChange: (value) => {
					props.setMetaValue(value);
				},
			});
		}
	);

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




	// ---------------
	// Item Colors
	// -------------

	registerPlugin('a7x-portfolio-item-bg-color', {
		render: () => {

			return el(PluginDocumentSettingPanel, {
				name: 'portfolio-item-bg-color',
				icon: 'art',
				title: __('Background Color', 'sphere-plugin'),
			},

			el(MetaColorControl, {
				metaKey: '_a7x_portfolio_item_bg_color',
			}),

			el(Button, {
				className: 'a7x-reset-color',
				isSecondary: true,
				onClick: () => {
					wp.data.dispatch('core/editor').editPost({meta: {
						_a7x_portfolio_item_bg_color: '',
					}});
					wp.data.dispatch('core/editor').savePost();
				},
			}, __('Clear Color', 'sphere-plugin'))

		);
	}});

	registerPlugin('a7x-portfolio-item-text-color', {
		render: () => {

			return el(PluginDocumentSettingPanel, {
				name: 'portfolio-item-text-color',
				icon: 'admin-customizer',
				title: __('Text Color', 'sphere-plugin'),
			},

			el(MetaColorControl, {
				metaKey: '_a7x_portfolio_item_text_color',
			}),

			el(Button, {
				className: 'a7x-reset-color',
				isSecondary: true,
				onClick: () => {
					wp.data.dispatch('core/editor').editPost({meta: {
						_a7x_portfolio_item_text_color: '',
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




	// ----------------
	// Header Image
	// --------------

	registerPlugin('a7x-portfolio-item-header-image', {
		render: () => {

			return el(PluginDocumentSettingPanel, {
				name: 'portfolio-item-header-image',
				icon: 'format-image',
				title: __('Header Image', 'sphere-plugin'),
			},

			el(MetaImageControl, {
				metaKey: '_a7x_portfolio_item_header_image',
			})

		);
	}});

	// Image Control

	let MetaImageControl = compose(withDispatch((dispatch, props) => {
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

	    let removeMedia = () => {
			let newValue = JSON.stringify({
				id: '',
				url: '',
				width: 0,
				height: 0,
			});
	        props.setMetaValue(newValue);
			jQuery('#a7x-header-image .components-responsive-wrapper').hide();
	    };

	    let onSelectMedia = (media) => {
			let newValue = JSON.stringify({
				id: media.id,
				url: media.url,
				width: media.width,
				height: media.height,
			});
	        props.setMetaValue(newValue);
			jQuery('#a7x-header-image .components-responsive-wrapper').show();
	    };

		let data = props.metaValue;
		if (data !== null && data !== '') {
			data = JSON.parse(props.metaValue);
		}

	    return el(Fragment, null, el('div', {
			id: 'a7x-header-image',
	        className: 'editor-post-featured-image',

	    }, el(MediaUploadCheck, null, el(MediaUpload, {
	        onSelect: onSelectMedia,
	        value: props.metaValue,
	        allowedTypes: ['image'],
	        render: (props) => {
	            let open = props.open;
	            return el(Button, {
	                className: data.width == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview',
	                onClick: open
	            }, data.width == 0 && __('Choose an image', 'sphere-plugin'), data.width != undefined && el(ResponsiveWrapper, {
	                naturalWidth: data.width,
	                naturalHeight: data.height
	            }, el('img', {
	                src: data.url
	            })));
	        }

	    })), data.width != 0 && el(MediaUploadCheck, null, el(MediaUpload, {
	        title: __('Replace image', 'sphere-plugin'),
	        value: props.metaValue,
	        onSelect: onSelectMedia,
	        allowedTypes: ['image'],
	        render: (props) => {
	            let open = props.open;
	            return el(Button, {
	                onClick: open,
	                isSecondary: true,
	                isLarge: true
	            }, __('Replace image', 'sphere-plugin'));
	        }

	    })), data.width != 0 && el(MediaUploadCheck, null, el(Button, {
	        onClick: removeMedia,
	        isLink: true,
	        isDestructive: true
	    }, __('Remove image', 'sphere-plugin')))));
	});




	// -----------------
	// Overlay Color
	// ---------------

	registerPlugin('a7x-portfolio-item-overlay', {
		render: () => {

			return el(PluginDocumentSettingPanel, {
				name: 'portfolio-item-overlay',
				icon: 'art',
				title: __('Overlay Color', 'sphere-plugin'),
			},

			el(MetaOverlayControl, {
				metaKey: '_a7x_portfolio_item_overlay',
			}),

			el(Button, {
				className: 'a7x-reset-color',
				isSecondary: true,
				onClick: () => {
					wp.data.dispatch('core/editor').editPost({meta: {
						_a7x_portfolio_item_overlay: '',
					}});
					wp.data.dispatch('core/editor').savePost();
				},
			}, __('Clear Color', 'sphere-plugin'))

		);
	}});

	// Overlay Control

	let MetaOverlayControl = compose(withDispatch((dispatch, props) => {
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
			color: props.metaValue,
		    onChangeComplete: (value) => {
				let overlayRgb = 'rgba('+ value.rgb.r +','+ value.rgb.g +','+ value.rgb.b +','+ value.rgb.a +')';
				props.setMetaValue(overlayRgb);
			},
		});
	});



})();
