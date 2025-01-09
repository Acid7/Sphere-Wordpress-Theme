<?php
/**
 * Template Name: With Image Header
 */

 get_header(); ?>

 <?php
 	$bg_color = get_post_meta($post->ID, '_a7x_page_bg_color', true);
 	$text_color = get_post_meta($post->ID, '_a7x_page_text_color', true);
 ?>

 <?php while (have_posts()) : the_post(); ?>

 	<article class="post-content" data-bg-color="<?php echo esc_attr($bg_color); ?>" data-text-color="<?php echo esc_attr($text_color); ?>">

        <?php if (has_post_thumbnail()): ?>
			<div class="image-wrapper">
				<?php the_post_thumbnail('sphere-blog', array('class' => 'featured-image')); ?>
			</div>
		<?php endif; ?>

        <div class="page-header">
            <h1 class="is-style-underlined reveal-text-fx">
                <?php the_title(); ?>
            </h1>
        </div>

        <div class="entry-content">
            <?php the_content(); ?>
        </div>

        <?php a7x_wp_link_pages(); ?>

 	</article>

 <?php endwhile;

 get_footer(); ?>
