<article <?php post_class(); ?>>

	<?php if (has_post_thumbnail()): ?>
		<a class="image-wrapper" href="<?php the_permalink(); ?>">
			<?php the_post_thumbnail('sphere-blog', array('class' => 'featured-image')); ?>
		</a>
	<?php endif; ?>

	<div class="post-title-wrapper">

		<?php get_template_part('layouts/blog-post-meta'); ?>

		<a class="title-link" href="<?php the_permalink(); ?>">
			<h2 class="post-title is-style-underlined"><?php the_title(); ?></h2>
		</a>

		<?php the_excerpt(); ?>

		<a href="<?php the_permalink(); ?>" class="button"><?php esc_html_e('Read More', 'sphere') ?></a>

	</div>

</article>
