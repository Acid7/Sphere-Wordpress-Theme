<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

	<article class="post-content">

		<div class="post-header">
			<div class="post-title-wrapper size-xl">
				<?php get_template_part('layouts/blog-post-meta'); ?>
				<h1 class="post-title is-style-underlined"><?php the_title(); ?></h1>
			</div>
		</div>


		<?php if (has_post_thumbnail()): ?>
			<div class="image-wrapper">
				<?php the_post_thumbnail('sphere-blog', array('class' => 'featured-image')); ?>
			</div>
		<?php endif; ?>

		<div class="entry-content">
			<?php if(has_excerpt()): ?>
				<p class="is-style-excerpt"><?php echo get_the_excerpt(); ?></p>
			<?php endif; ?>

			<?php the_content(); ?>
		</div>

		<?php a7x_wp_link_pages(); ?>


		<?php if (!post_password_required()): ?>
			<div class="post-bottom">
				<?php if(get_the_tags()): ?>
					<div class="tags">
						<span class="tags-title">
							<?php esc_html_e('Tags:', 'sphere'); ?>
						</span>
						<?php the_tags('',''); ?>
					</div>
				<?php endif; ?>

				<?php if (comments_open() || get_comments_number()): ?>
					<div id="comments-opener" class="cursor-fx-hover"><?php comments_number(esc_html__('0 Comments', 'sphere'), esc_html__('1 Comment', 'sphere'), esc_html__('% Comments', 'sphere')); ?></div>
				<?php endif; ?>
			</div>

			<?php if (comments_open() || get_comments_number()): ?>
				<?php comments_template(); ?>
			<?php endif; ?>

		<?php endif; ?>


		<?php if (get_theme_mod('a7x_blog_share', true) && function_exists('a7x_share_links')):
			echo a7x_share_links();
		endif; ?>

	</article>

<?php endwhile;

get_footer(); ?>
