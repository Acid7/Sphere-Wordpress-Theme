(($, window) => {
	$(() => {

		"use strict";

		let hexToRgb = (hex) => {
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
		};

		// -----------------------
		// Background & Colors
		// ---------------------

		let updateCssVariables = () => {
			if (!$('#css-variables').length) {
				$('head').append('<style type="text/css" id="css-variables"></style>');
			}

			let bgColor = wp.customize('a7x_bg_color').get(),
				textColor = wp.customize('a7x_text_color').get(),
				textRgb = hexToRgb(textColor),

				secondaryColor = wp.customize('a7x_secondary_color').get(),
				secondaryRgb = hexToRgb(secondaryColor),

				sidebarBg = wp.customize('a7x_sidebar_bg').get(),
				sidebarText = wp.customize('a7x_sidebar_text').get(),
				sidebarTextRgb = hexToRgb(sidebarText);

			let cssVars = ':root {';
				cssVars += '--bg-color: '+ bgColor +';';
				cssVars += '--text-color: '+ textColor +';';
				cssVars += '--post-meta-color: rgba('+ textRgb +', 0.6);';

				cssVars += '--secondary-color: '+ secondaryColor +';';
				cssVars += '--secondary-bg: rgba('+ secondaryRgb +', 0.6);';
				cssVars += '--blockquote-bg: linear-gradient(90deg, rgba('+ secondaryRgb +', 0.8) 0%, rgba('+ secondaryRgb +',0) 100%);';

				cssVars += '--sidebar-bg: '+ sidebarBg +';';
				cssVars += '--sidebar-text: '+ sidebarText +';';
				cssVars += '--sidebar-text-rgb: rgba('+ sidebarTextRgb +', 0.6);';

				cssVars += '}';

			$('#css-variables').html(cssVars);
		};

		// Background Color

		wp.customize('a7x_bg_color', (value) => {
			value.bind(() => { updateCssVariables(); });
		});

		// Text Color

		wp.customize('a7x_text_color', (value) => {
			value.bind(() => { updateCssVariables(); });
		});

		// Secondary Color

		wp.customize('a7x_secondary_color', (value) => {
			value.bind(() => { updateCssVariables(); });
		});

		// Sidebar Background

		wp.customize('a7x_sidebar_bg', (value) => {
			value.bind(() => { updateCssVariables(); });
		});

		// Sidebar Text Color

		wp.customize('a7x_sidebar_text', (value) => {
			value.bind(() => { updateCssVariables(); });
		});

	});
})(jQuery, window);
