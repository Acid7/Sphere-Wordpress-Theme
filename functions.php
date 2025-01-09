<?php

// ****************************
// * * * * Theme Setup * * * *
// **************************

add_action('after_setup_theme', 'a7x_theme_setup');
function a7x_theme_setup() {

	load_theme_textdomain('sphere', get_template_directory_uri() . '/languages');

	add_theme_support('automatic-feed-links');
	add_theme_support('custom-logo', array('flex-width'  => true, 'flex-height' => true));
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
	add_theme_support('customize-selective-refresh-widgets');

	// Gutenberg
	add_theme_support('editor-styles');
	add_theme_support('align-wide');
	add_theme_support('custom-line-height');
}

// Gutenberg CSS

add_action('admin_init', 'a7x_editor_styles');
function a7x_editor_styles() {
	add_editor_style('css/editor-style.css');
	add_editor_style('css/editor-style-override.css');
}



// Theme Typography

add_action('wp_enqueue_scripts', 'a7x_theme_fonts');
add_action('enqueue_block_editor_assets', 'a7x_theme_fonts');
if (!function_exists('a7x_theme_fonts')) {

	function a7x_theme_fonts() {

		$fonts = get_theme_mod('a7x_fonts', 'montserrat-raleway');

		if ($fonts == 'montserrat-raleway') {

			wp_enqueue_style('sphere-typography', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Raleway:ital,wght@0,500;0,800;1,500&display=swap', array(), null);
			$css = '
				:root {
					--heading-font: "Montserrat", sans-serif;
					--heading-font-weight: 800;
					--subheading-font: "Montserrat", sans-serif;
					--subheading-font-weight: 700;

					--buttons-font: "Montserrat", sans-serif;
					--buttons-font-weight: 700;

					--body-font: "Raleway", sans-serif;
					--body-font-weight: 500;
				}
			';

		} elseif ($fonts == 'exo2-opensans') {

			wp_enqueue_style('sphere-typography', 'https://fonts.googleapis.com/css2?family=Exo+2:wght@700;800&family=Open+Sans:ital,wght@0,400;0,700;1,400&display=swap', array(), null);
			$css = '
				:root {
					--heading-font: "Exo 2", sans-serif;
					--heading-font-weight: 800;
					--subheading-font: "Exo 2", sans-serif;
					--subheading-font-weight: 700;

					--buttons-font: "Exo 2", sans-serif;
					--buttons-font-weight: 700;

					--body-font: "Open Sans", sans-serif;
					--body-font-weight: 400;
				}
			';

		} elseif ($fonts == 'orbitron-raleway') {

			wp_enqueue_style('sphere-typography', 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,500;0,800;1,500&family=Orbitron:wght@700;900&display=swap', array(), null);
			$css = '
				:root {
					--heading-font: "Orbitron", sans-serif;
					--heading-font-weight: 900;
					--subheading-font: "Orbitron", sans-serif;
					--subheading-font-weight: 700;

					--buttons-font: "Orbitron", sans-serif;
					--buttons-font-weight: 700;

					--body-font: "Raleway", sans-serif;
					--body-font-weight: 500;
				}
			';

		} elseif ($fonts == 'poppins-opensans') {

			wp_enqueue_style('sphere-typography', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&family=Poppins:wght@700;800&display=swap', array(), null);
			$css = '
				:root {
					--heading-font: "Poppins", sans-serif;
					--heading-font-weight: 800;
					--subheading-font: "Poppins", sans-serif;
					--subheading-font-weight: 700;

					--buttons-font: "Poppins", sans-serif;
					--buttons-font-weight: 700;

					--body-font: "Open Sans", sans-serif;
					--body-font-weight: 400;
				}
			';

		}

		$css .= '
			:root {
				--body-font-size: 1.0625rem;
				--body-line-height: 2.1;

				--xxl-font-size: 7.4375rem;
				--xxl-line-height: 8.5rem;

				--xl-font-size: 5.5625rem;
				--xl-line-height: 6.5rem;

				--h1-font-size: 4.1875rem;
				--h1-line-height: 5rem;

				--h2-font-size: 3.125rem;
				--h2-line-height: 4rem;

				--h3-font-size: 2.3125rem;
				--h3-line-height: 3rem;

				--h4-font-size: 1.75rem;
				--h4-line-height: 2.5rem;

				--h5-font-size: 1.3125rem;
				--h5-line-height: 2rem;

				--h6-font-size: 1rem;
				--h6-line-height: 1.75rem;

				--xs-font-size: 0.75rem;
				--xs-line-height: 1.5rem;

				--subheading-transform: uppercase;
				--subheading-spacing: 0.25em;

				--xxl-subheading: 1.125rem;
				--xl-subheading: 1rem;
				--h123-subheading: .9375rem;
				--h456-subheading: .8125rem;
				--xs-subheading: .75rem;

				--vertical-rim: 3.5rem;
				--horizontal-rim: 5.5rem;
				--button-size: 3rem;

				--wrapper: 1240px;
				--wrapper-narrow: 930px;

				--spacer-xl: 10.5rem;
				--spacer-lg: 8rem;
				--spacer-md: 5.5rem;
				--spacer-sm: 3rem;
			}

			body {
				font-size: 100%;
				font-weight: var(--body-font-weight)
			}
		';

		wp_add_inline_style('sphere-typography', $css);
	}
}



// Theme CSS & JS

add_action('wp_enqueue_scripts', 'a7x_theme_css_js');
function a7x_theme_css_js() {

	// CSS
	wp_enqueue_style('sphere', get_template_directory_uri() . '/style.css', array(), null);

	// JS
	wp_enqueue_script('anime', get_template_directory_uri() . '/js/lib/anime.min.js', array(), '3.2.0', true);
	wp_enqueue_script('jquery-fitvids', get_template_directory_uri() . '/js/lib/jquery.fitvids.min.js', array('jquery'), '1.2.0', true);

	wp_enqueue_script('flickity', get_template_directory_uri() . '/js/lib/flickity.pkgd.min.js', array(), null, true);
	wp_enqueue_script('flickity-fade', get_template_directory_uri() . '/js/lib/flickity-fade.min.js', array(), null, true);

	wp_enqueue_script('scroll-lock', get_template_directory_uri() . '/js/lib/scroll-lock.min.js', array(), null, true);
	wp_enqueue_script('scrollreveal', get_template_directory_uri() . '/js/lib/scrollreveal.min.js', array(), '3.4.0', true);
	wp_enqueue_script('splitting', get_template_directory_uri() . '/js/lib/splitting.min.js', array(), null, true);

	wp_enqueue_script('sphere', get_template_directory_uri() . '/js/app.js', array('jquery', 'imagesloaded'), null, true);

	// Comments JS
	if (get_option('thread_comments')) { wp_enqueue_script('comment-reply'); }

	// Transport Data to JS
	wp_localize_script('sphere', 'sphereSettings', array(
		'home_url'			=> home_url() . '/',
		'cursor_fx'			=> get_theme_mod('a7x_cursor_fx', false),
		'bg_color' 			=> get_theme_mod('a7x_bg_color', '#EFECE6'),
		'text_color'		=> get_theme_mod('a7x_text_color', '#111111'),
		'merge_svg_logo'	=> get_theme_mod('a7x_merge_svg_logo', true),
		'slideshow_autoplay' => get_theme_mod('a7x_slideshow_autoplay', true),
		'slideshow_delay'	=> get_theme_mod('a7x_slideshow_delay', 7000),
	));
}

// Content Width

if (!isset($content_width)) {
	$content_width = 1240;
}

// Thumbnail Sizes

add_image_size('sphere-slideshow', 1400, 1400, true);
add_image_size('sphere-carousel-titles', 600, 600, false);
add_image_size('sphere-film', 1200, 675, true);
add_image_size('sphere-blog', 1920, 975, true);

// Menu

add_action('init', 'a7x_register_menu');
function a7x_register_menu() {
	register_nav_menu('main-menu', esc_html__('Main Menu', 'sphere'));
	register_nav_menu('footer-menu', esc_html__('Footer Menu', 'sphere'));
}

// Widgets

add_action('widgets_init', 'a7x_blog_widgets');
function a7x_blog_widgets() {
	register_sidebar(array(
		'name'          => esc_html__('Blog Widgets', 'sphere'),
		'id'            => 'blog-widgets',
		'description'   => esc_html__('Widgets in this area will be shown on blog page.', 'sphere'),
		'before_widget' => '<div class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h5>',
		'after_title'   => '</h5>',
	));
}




// *******************************
// * * * * Utility Tweaks * * * *
// *****************************

// Add Init Loading Class to HTML

add_filter('language_attributes', 'a7x_add_loading_class');
function a7x_add_loading_class($output) {
	return $output . ' class="init-loading"';
}

// Search Only Certain Posts Types

add_filter('pre_get_posts', 'a7x_search_filter');
function a7x_search_filter($query) {
	if (!$query->is_admin && $query->is_search) {
		$query->set('post_type', array('post', 'portfolio'));
	}
	return $query;
}

// Posts Without Thumbnail Image

add_filter('post_class', 'a7x_post_classes');
function a7x_post_classes($classes) {
	if (!has_post_thumbnail()) {
		$classes[] = 'no-post-thumbnail';
	}
	return $classes;
}




// ******************************
// * * * * Layout Tweaks * * * *
// ****************************

// Remove Prefix from Archive Titles

add_filter( 'get_the_archive_title', 'a7x_remove_archive_prefix');
function a7x_remove_archive_prefix($title) {
	if (is_category()) {
		$title = single_cat_title('', false);
	} elseif (is_date()) {
		$title = get_the_date();
	} elseif (is_author()) {
		$title = esc_html(get_the_author());
	} elseif (is_tax()) { // CPT
		$title = sprintf(esc_html__('%1$s', 'sphere'), single_term_title('', false));
	} elseif (is_post_type_archive()) {
		$title = post_type_archive_title('', false);
	}

	return $title;
}

// Excerpt More

add_filter('excerpt_more', 'a7x_excerpt_more');
function a7x_excerpt_more($more) {
	return '…';
}

// WP Link Pages

function a7x_wp_link_pages() {
	wp_link_pages(array(
		'before'         => '<div class="post-pages">' . esc_html__('Pages:', 'sphere'),
		'after'          => '</div>',
		'next_or_number' => 'number',
		'separator'      => ' ',
		'pagelink'       => '%',
		'echo'           => 1
	));
}

// Custom Comments Layout

function a7x_custom_comment_layout($comment, $args, $depth) { ?>

	<div id="comment-<?php comment_ID(); ?>">
		<article <?php comment_class(); ?>>

			<div class="comment-header">

				<?php echo get_avatar($comment, $args['avatar_size']); ?>

				<div class="comment-meta">
					<time datetime="<?php comment_time('c'); ?>">
						<span><?php comment_date(); ?></span>
						<span><?php comment_time(); ?></span>
					</time>
					<div class="author"><?php comment_author_link(); ?></div>
				</div>
			</div>

			<div class="comment-content">
				<?php comment_text(); ?>
				<?php comment_reply_link(array_merge($args, array(
					'reply_text' => esc_html__('Reply', 'sphere'),
					'depth'      => $depth,
					'max_depth'  => $args['max_depth']
				))); ?>
			</div>

		</article>

	<?php
}

// Use Placeholders Instead Of Labels

add_filter('comment_form_defaults', 'a7x_comment_textarea_placeholder');
function a7x_comment_textarea_placeholder($fields) {
	$comment_placeholder = esc_html__('Comment', 'sphere');
	$fields['comment_field'] = str_replace('<textarea', '<textarea placeholder="' . $comment_placeholder . '*"', $fields['comment_field']);
	return $fields;
}

add_filter('comment_form_default_fields', 'a7x_comment_form_placeholders');
function a7x_comment_form_placeholders($fields) {
	$author_placeholder = esc_html__('Name', 'sphere');
	$email_placeholder = esc_html__('E-mail', 'sphere');
	$url_placeholder = esc_html__('Website', 'sphere');
	foreach($fields as &$field) {
		$field = str_replace('id="author"', 'id="author" placeholder="' . $author_placeholder . '*"', $field);
		$field = str_replace('id="email"', 'id="email" placeholder="' . $email_placeholder . '*"', $field);
		$field = str_replace('id="url"', 'id="url" placeholder="' . $url_placeholder . '"', $field);
	}
	return $fields;
}

// Remove Website Field From Comments

add_filter('comment_form_default_fields', 'a7x_remove_comment_url_field');
function a7x_remove_comment_url_field($fields) {
	if(isset($fields['url'])) {
		unset($fields['url']);
	}
	return $fields;
}





// **************************************
// * * * * Featured Image Column * * * *
// ************************************

// Setup Admin Thumbnail Size

if (function_exists('add_theme_support')) {
	add_image_size('sphere-admin-thumb', 200, 140, true);
}

// Insert Image Column to Pages & Posts

add_filter('manage_posts_columns', 'a7x_insert_image_column', 5);
add_filter('manage_pages_columns', 'a7x_insert_image_column', 5);
function a7x_insert_image_column($columns) {

	$new_columns = array();

	foreach($columns as $key => $title) {
		if ($key == 'title')
			$new_columns['a7x-featured-image'] = esc_html__('Image', 'sphere');

		$new_columns[$key] = $title;
	}

	return $new_columns;
}

// Insert Featured Image to Pages & Posts

add_action('manage_posts_custom_column', 'a7x_insert_featured_image', 5, 2);
add_action('manage_pages_custom_column', 'a7x_insert_featured_image', 5, 2);
function a7x_insert_featured_image($column_name, $post_id) {

	if ($column_name === 'a7x-featured-image') {
		if (get_the_post_thumbnail($post_id, 'sphere-admin-thumb')) {
			echo get_the_post_thumbnail($post_id, 'sphere-admin-thumb');
		} else {
			echo '<img alt="' . esc_html__('No Image', 'sphere') . '" src="' . get_template_directory_uri() . '/images/image-placeholder.png" />';
		}
	}
}

// Insert Extra Admin CSS

add_action('admin_head', 'a7x_featured_image_column_css');
function a7x_featured_image_column_css() {
	echo '
		<style type="text/css">
			.column-a7x-featured-image {
				width: 100px;
			}
			.a7x-featured-image img {
				width: 100px;
				height: 70px;
			}
			img.a7x-header-image {
				max-width: 100%;
				height: auto;
			}
			button.a7x-reset-date {
				margin-bottom: 1rem;
			}
			button.a7x-reset-color {
				margin-left: 1rem;
			}
		</style>
	';
}




// *************************
// * * * * Includes * * * *
// ***********************

// Customizer

require_once get_template_directory() . '/includes/customizer.php';

// Plugin & Activation

require_once get_template_directory() . '/includes/class-tgm-plugin-activation.php';
add_action('tgmpa_register', 'a7x_register_required_plugins');
function a7x_register_required_plugins() {
	$plugins = array(
		array(
			'name'               => 'Sphere Plugin',
			'slug'               => 'sphere-plugin',
			'source'             => get_template_directory() . '/includes/plugin/sphere-plugin.zip',
			'required'           => true,
			'version'            => '1.0.0',
			'force_activation'   => false,
			'force_deactivation' => false,
			'external_url'       => '',
			'is_callable'        => '',
		)
	);
	$config = array(
		'id'           => 'sphere',
		'default_path' => '',
		'menu'         => 'install-sphere-plugin',
		'has_notices'  => true,
		'dismissable'  => false,
		'dismiss_msg'  => '',
		'is_automatic' => true,
		'message'      => '',
	);

	tgmpa($plugins, $config);
}

// One Click Demo Import

add_filter('pt-ocdi/import_files', 'a7x_one_click_demo_import');
function a7x_one_click_demo_import() {
	return array(
		array(
			'import_file_name'             => 'Sphere Demo',
			'categories'                   => array( 'Category 1', 'Category 2' ),
			'local_import_file'            => trailingslashit( get_template_directory() ) . 'includes/demo/content.xml',
			'local_import_customizer_file' => trailingslashit( get_template_directory() ) . 'includes/demo/customizer.dat',
			'import_notice'                => esc_html__('If you wish to have the contact form imported as well, do not forget to install and activate Contact Form 7 plugin before importing.', 'sphere'),
		),
	);
}

add_filter('pt-ocdi/disable_pt_branding', '__return_true');
