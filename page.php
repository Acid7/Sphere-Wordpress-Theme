<?php get_header(); ?>

<?php
	$bg_color = get_post_meta($post->ID, '_a7x_page_bg_color', true);
	$text_color = get_post_meta($post->ID, '_a7x_page_text_color', true);
?>

<?php while (have_posts()) : the_post(); ?>

	<article class="post-content" data-bg-color="<?php echo esc_attr($bg_color); ?>" data-text-color="<?php echo esc_attr($text_color); ?>">

		<?php $post_template = get_page_template_slug(); ?>
		<?php if ($post_template != 'templates/without-page-header.php'): ?>

			<div class="page-header">
				<h1 class="is-style-underlined">
					<?php the_title(); ?>
				</h1>
			</div>

		<?php endif; ?>

		<div class="entry-content">
			<?php the_content(); ?>
		</div>

		<?php a7x_wp_link_pages(); ?>

		<?php if (comments_open() || get_comments_number()): ?>
			<?php comments_template(); ?>
		<?php endif; ?>

	</article>

<?php endwhile;

get_footer(); ?>
