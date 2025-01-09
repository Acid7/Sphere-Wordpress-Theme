<article <?php post_class(); ?>>

	<div class="post-title-wrapper">

		<?php $date = get_post_meta($post->ID, '_a7x_portfolio_item_date', true); ?>

		<?php if ($date): ?>
			<time class="post-year subheading" datetime="<?php echo esc_attr(get_the_date('Y')); ?>">
				<?php
					$post_year = strtok($date, '-');
					echo esc_html($post_year);
				?>
			</time>
		<?php endif; ?>

		<div class="image-wrapper">
			<?php if (has_post_thumbnail()):
				the_post_thumbnail('sphere-carousel-titles', array('class' => 'featured-image'));
			endif; ?>
		</div>

		<a class="title-link" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
			<h2 class="post-title"><?php the_title(); ?></h2>
		</a>

		<a class="subheading view-project-wrapper" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
			<span class="post-category"><?php $terms = get_the_terms($post->ID , 'portfolio-category');

				if ($terms):
					foreach ($terms as $term):
						echo '<span>' . esc_html($term->name) . '</span> ';
					endforeach;
				endif; ?>
			</span>
			<div class="view-project"><?php esc_html_e('View Project', 'sphere') ?></div>
		</a>
	</div>

</article>
