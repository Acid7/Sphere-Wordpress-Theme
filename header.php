<!DOCTYPE html><html <?php language_attributes(); ?> itemscope itemtype="http://schema.org/WebPage">

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php if (function_exists('wp_body_open')) {
	wp_body_open();
} ?>

<?php if (get_theme_mod('a7x_cursor_fx', false)): ?>
	<div id="cursor"></div>
<?php endif; ?>

<div id="preloader-container">
	<div id="preloader"><?php echo esc_html(get_theme_mod('a7x_loading_text', 'Loading')); ?>
		<div class="indicator"><span></span></div>
	</div>
</div>


<header>

	<?php if (get_custom_logo()): ?>
		<?php the_custom_logo(); ?>
	<?php else: ?>
		<a href="<?php echo esc_url(home_url('/')); ?>" class="site-title">
			<h1><span><?php bloginfo('name'); ?></span></h1>
			<p><?php bloginfo('description'); ?></p>
		</a>
	<?php endif; ?>

	<?php if (has_nav_menu('main-menu')): ?>
		<nav>
			<?php wp_nav_menu(array(
				'theme_location' => 'main-menu',
				'menu_id'        => 'main-menu',
				'container'      => false,
			)); ?>
		</nav>
	<?php endif; ?>

	<div id="menu-opener" class="cursor-fx-hover"><span></span></div>
	<div id="back-to-top" class="cursor-fx-hover"></div>
</header>


<main id="content">
