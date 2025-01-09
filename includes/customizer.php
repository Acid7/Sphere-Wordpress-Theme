<?php

// ***************************************************
// * * * * Add Customizer Settings to WP Head * * * *
// *************************************************

// Convert HEX to RGB Helper

function a7x_hex_to_rgb($hex) {
	$r = hexdec(substr($hex, 1, 2));
	$g = hexdec(substr($hex, 3, 2));
	$b = hexdec(substr($hex, 5, 2));
	$rgb = $r .",". $g .",". $b;
	return $rgb;
}

add_action('wp_enqueue_scripts', 'a7x_add_customizer_css');
function a7x_add_customizer_css() {

	$bg_color = get_theme_mod('a7x_bg_color', '#EFECE6');
	$text_color = get_theme_mod('a7x_text_color', '#111111');
	$text_rgb = a7x_hex_to_rgb($text_color);

	$secondary_color = get_theme_mod('a7x_secondary_color', '#E9BA00');
	$secondary_rgb = a7x_hex_to_rgb($secondary_color);

	$sidebar_bg = get_theme_mod('a7x_sidebar_bg', '#201e23');
	$sidebar_text = get_theme_mod('a7x_sidebar_text', '#EFECE6');
	$sidebar_text_rgb = a7x_hex_to_rgb($sidebar_text);

	$customizer_css = '

		:root {
			--bg-color: '. $bg_color .';
			--text-color: '. $text_color .';
			--post-meta-color: rgba(' . $text_rgb . ', 0.6);

			--secondary-color: '. $secondary_color .';
			--secondary-bg: rgba(' . $secondary_rgb . ', 0.6);
			--blockquote-bg: linear-gradient(90deg, rgba(' . $secondary_rgb . ',0.8) 0%, rgba(' . $secondary_rgb . ',0) 100%);
			--blockquote-bg-rtl: linear-gradient(270deg, rgba(' . $secondary_rgb . ',0.8) 0%, rgba(' . $secondary_rgb . ',0) 100%);

			--sidebar-bg: '. $sidebar_bg .';
			--sidebar-text: '. $sidebar_text .';
			--sidebar-text-rgb: rgba(' . $sidebar_text_rgb . ', 0.6);
		}

	';

	$customizer_css = wp_strip_all_tags($customizer_css);
	wp_add_inline_style('sphere', $customizer_css);
}




// ******************************************
// * * * * Customizer JavaScript * * * * * *
// ****************************************

add_action('customize_preview_init', 'a7x_customizer_js');
function a7x_customizer_js() {
	wp_enqueue_script('sphere-customizer', get_template_directory_uri() . '/js/customizer.js', array('jquery', 'customize-preview'), '', true);
}

// Add Typography CSS Class to Body

add_filter('body_class', 'a7x_body_classes');
function a7x_body_classes($classes) {
	$classes[] = get_theme_mod('a7x_fonts', 'montserrat-raleway');
	return $classes;
}

// ****************************************
// * * * * Customizer Settings * * * * * *
// **************************************

add_action('customize_register', 'a7x_customizer_setup');
function a7x_customizer_setup($wp_customize) {

	$wp_customize->get_setting('blogname')->transport = 'postMessage';
	$wp_customize->get_setting('blogdescription')->transport = 'postMessage';

	// ********** Merge SVG Logo **********

	$wp_customize->add_setting('a7x_merge_svg_logo', array(
		'default'           => 1,
		'transport'         => 'refresh',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_merge_svg_logo', array(
		'section' => 'title_tagline',
		'label'   => esc_html__('Merge SVG Logo', 'sphere'),
		'type'    => 'checkbox',
	));




	// **********************************
	// ******** Main Settings **********
	// ********************************

	$wp_customize->add_section('a7x_main_settings', array(
		'title' => esc_html__('Main Settings', 'sphere'),
	));

	// ******** Font Pairs ***********

	$wp_customize->add_setting('a7x_fonts', array(
		'default'           => 'montserrat-raleway',
		'transport'         => 'refresh',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_fonts', array(
		'section' => 'a7x_main_settings',
		'label'   => esc_html__('Fonts', 'sphere'),
		'type'    => 'select',
		'choices' => array(
			'montserrat-raleway'	=> esc_html__('Montserrat / Raleway', 'sphere'),
			'exo2-opensans'			=> esc_html__('Exo 2 / Open Sans', 'sphere'),
			'orbitron-raleway'		=> esc_html__('Orbitron / Raleway', 'sphere'),
			'poppins-opensans'		=> esc_html__('Poppins / Open Sans', 'sphere'),
		)
	));

	// ******** Background Color ***********

	$wp_customize->add_setting('a7x_bg_color', array(
		'default'           => '#EFECE6',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_hex_color',
	));

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'a7x_bg_color', array(
		'label'    => esc_html__('Background Color', 'sphere'),
		'settings' => 'a7x_bg_color',
		'section'  => 'a7x_main_settings',
	)));

	// ******** Text Color ***********

	$wp_customize->add_setting('a7x_text_color', array(
		'default'           => '#111111',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_hex_color',
	));

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'a7x_text_color', array(
		'label'    => esc_html__('Text Color', 'sphere'),
		'settings' => 'a7x_text_color',
		'section'  => 'a7x_main_settings',
	)));

	// ******** Secondary Color ***********

	$wp_customize->add_setting('a7x_secondary_color', array(
		'default'           => '#E9BA00',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_hex_color',
	));

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'a7x_secondary_color', array(
		'label'    => esc_html__('Secondary Color', 'sphere'),
		'settings' => 'a7x_secondary_color',
		'section'  => 'a7x_main_settings',
	)));

	// ********** Cursor Effect **********

	$wp_customize->add_setting('a7x_cursor_fx', array(
		'default'           => 0,
		'transport'         => 'refresh',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_cursor_fx', array(
		'section' => 'a7x_main_settings',
		'label'   => esc_html__('Cursor Effect', 'sphere'),
		'type'    => 'checkbox',
	));

	// ********** Loading Text **********

	$wp_customize->add_setting('a7x_loading_text', array(
		'default'           => 'Loading',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_loading_text', array(
		'section' => 'a7x_main_settings',
		'label'   => esc_html__('Loading Text', 'sphere'),
		'type'    => 'text',
	));

	// ********** Audio File **********

	$wp_customize->add_setting('a7x_audio', array(
	    'type' 		 		=> 'theme_mod',
	    'capability' 		=> 'edit_theme_options',
	    'sanitize_callback' => 'absint',
	));

	$wp_customize->add_control(new WP_Customize_Media_Control($wp_customize, 'a7x_audio', array(
	    'section' 	=> 'a7x_main_settings',
	    'label' 	=> esc_html__('Audio', 'sphere'),
	    'mime_type' => 'audio',
	)));

	// ********** Footer Text Left **********

	$wp_customize->add_setting('a7x_footer_left', array(
		'default'           => 'Made with ❤ by Acid7 Studio.',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'a7x_sanitize_footer_text',
	));

	$wp_customize->add_control('a7x_footer_left', array(
		'section' 		=> 'a7x_main_settings',
		'label'   		=> esc_html__('Footer Left', 'sphere'),
		'description'	=> esc_html__('Displayed when no Audio is selected.', 'sphere'),
		'type'    		=> 'text',
	));

	// ********** Footer Text Right **********

	$wp_customize->add_setting('a7x_footer_right', array(
		'default'           => '❦ Anno Domini 2021 - Earth, The Universe.',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'a7x_sanitize_footer_text',
	));

	$wp_customize->add_control('a7x_footer_right', array(
		'section' 		=> 'a7x_main_settings',
		'label'   		=> esc_html__('Footer Right', 'sphere'),
		'description'	=> esc_html__('Displayed when no Footer Menu is selected.', 'sphere'),
		'type'    		=> 'text',
	));

	function a7x_sanitize_footer_text($text) {
		return wp_kses($text, array('a' => array('href' => array(), 'target' => array())));
	}




	// **************************************
	// ******** Slideshow Section **********
	// ************************************

	$wp_customize->add_section('a7x_slideshow_settings', array(
		'title' => esc_html__('Slideshow', 'sphere'),
	));

	// ******** Autoplay ***********

	$wp_customize->add_setting('a7x_slideshow_autoplay', array(
		'default'           => 1,
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_slideshow_autoplay', array(
		'section' => 'a7x_slideshow_settings',
		'label'   => esc_html__('Slideshow Autoplay', 'sphere'),
		'type'    => 'checkbox',
	));

	// ********** Autoplay Delay **********

	$wp_customize->add_setting('a7x_slideshow_delay', array(
		'default'           => '7000',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_slideshow_delay', array(
		'section' => 'a7x_slideshow_settings',
		'label'   => esc_html__('Autoplay Delay (ms)', 'sphere'),
		'type'    => 'number',
	));




	// **************************************
	// ******** Portfolio Detail **********
	// ************************************

	$wp_customize->add_section('a7x_portfolio_settings', array(
		'title' => esc_html__('Portfolio', 'sphere'),
	));

	// ******** Share Links ***********

	$wp_customize->add_setting('a7x_portfolio_share', array(
		'default'           => 1,
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_portfolio_share', array(
		'section' => 'a7x_portfolio_settings',
		'label'   => esc_html__('Share Links', 'sphere'),
		'type'    => 'checkbox',
	));




	// *********************************
	// ******** Blog Section **********
	// *******************************

	$wp_customize->add_section('a7x_blog_settings', array(
		'title' => esc_html__('Blog', 'sphere'),
	));

	// ******** Sidebar Background Color ***********

	$wp_customize->add_setting('a7x_sidebar_bg', array(
		'default'           => '#201e23',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_hex_color',
	));

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'a7x_sidebar_bg', array(
		'label'    => esc_html__('Sidebar Background Color', 'sphere'),
		'settings' => 'a7x_sidebar_bg',
		'section'  => 'a7x_blog_settings',
	)));

	// ******** Sidebar Text Color ***********

	$wp_customize->add_setting('a7x_sidebar_text', array(
		'default'           => '#EFECE6',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_hex_color',
	));

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'a7x_sidebar_text', array(
		'label'    => esc_html__('Sidebar Text Color', 'sphere'),
		'settings' => 'a7x_sidebar_text',
		'section'  => 'a7x_blog_settings',
	)));

	// ******** Blog Author ***********

	$wp_customize->add_setting('a7x_blog_author', array(
		'default'           => 1,
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_blog_author', array(
		'section' => 'a7x_blog_settings',
		'label'   => esc_html__('Show Author', 'sphere'),
		'type'    => 'checkbox',
	));

	// ******** Share Links ***********

	$wp_customize->add_setting('a7x_blog_share', array(
		'default'           => 1,
		'transport'         => 'postMessage',
		'sanitize_callback' => 'sanitize_text_field',
	));

	$wp_customize->add_control('a7x_blog_share', array(
		'section' => 'a7x_blog_settings',
		'label'   => esc_html__('Share Links', 'sphere'),
		'type'    => 'checkbox',
	));

}
