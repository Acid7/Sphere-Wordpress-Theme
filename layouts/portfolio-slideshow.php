<?php
	$bg_color = get_post_meta($post->ID, '_a7x_portfolio_item_bg_color', true);
	$text_color = get_post_meta($post->ID, '_a7x_portfolio_item_text_color', true);
?>

<article <?php post_class(); ?> data-bg-color="<?php echo esc_attr($bg_color); ?>" data-text-color="<?php echo esc_attr($text_color); ?>">

	<div class="image-wrapper">
		<?php if (has_post_thumbnail()):
			the_post_thumbnail('sphere-slideshow', array('class' => 'featured-image'));
		endif; ?>
	</div>

	<div class="post-title-wrapper">

		<?php $date = get_post_meta($post->ID, '_a7x_portfolio_item_date', true); ?>

		<?php if ($date): ?>
			<time class="subheading" datetime="<?php echo esc_attr(get_the_date('Y')); ?>">
				<?php
					$post_year = strtok($date, '-');
					echo esc_html($post_year);
				?>
			</time>
		<?php endif; ?>

		<a class="title-link" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
			<h1 class="post-title is-style-underlined"><?php the_title(); ?></h1>
		</a>

		<a class="post-category is-style-excerpt-big view-project-wrapper" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
			<span><?php $terms = get_the_terms($post->ID , 'portfolio-category');
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
