<?php

	get_header();

	if ('page' != get_option('show_on_front')):
		get_template_part('blog');
	else: ?>

		<?php
	    	$bg_color = get_post_meta($post->ID, '_a7x_page_bg_color', true);
	    	$text_color = get_post_meta($post->ID, '_a7x_page_text_color', true);
	    ?>

		<!-- Front Page -->

		<?php while (have_posts()) : the_post(); ?>

			<article class="post-content" data-bg-color="<?php echo esc_attr($bg_color); ?>" data-text-color="<?php echo esc_attr($text_color); ?>">
				<div class="entry-content">
					<?php the_content(); ?>
				</div>
			</article>

		<?php endwhile; ?>

	<?php endif;

	get_footer();

?>
