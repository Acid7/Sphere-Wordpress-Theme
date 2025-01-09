<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

	<article class="post-content">
		<div class="post-header">
			<div class="post-title-wrapper size-xl">

				<div class="post-meta subheading">
					<time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time>

					<?php if (get_theme_mod('a7x_blog_author', true)): ?>
						<a class="author" href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>"><?php echo esc_html(get_the_author()); ?></a>
					<?php endif; ?>
				</div>

				<h1 class="post-title is-style-underlined"><?php the_title(); ?></h1>

			</div>
		</div>

		<div class="entry-content">
			<?php echo wp_get_attachment_image(get_the_ID(), 'full'); ?>
		</div>
	</article>

<?php endwhile; ?>

<?php get_footer(); ?>
