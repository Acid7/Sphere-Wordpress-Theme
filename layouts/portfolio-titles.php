<?php
	$bg_color = get_post_meta($post->ID, '_a7x_portfolio_item_bg_color', true);
	$text_color = get_post_meta($post->ID, '_a7x_portfolio_item_text_color', true);
?>

<article <?php post_class(); ?> data-bg-color="<?php echo esc_attr($bg_color); ?>" data-text-color="<?php echo esc_attr($text_color); ?>">
	<div class="post-title-wrapper size-xl">

		<div class="image-wrapper">
			<?php if (has_post_thumbnail()):
				the_post_thumbnail('sphere-carousel-titles', array('class' => 'featured-image'));
			endif; ?>
		</div>

		<a class="title-link" href="<?php the_permalink(); ?>">

			<?php $date = get_post_meta($post->ID, '_a7x_portfolio_item_date', true); ?>

			<?php if ($date): ?>
				<time class="post-year subheading" datetime="<?php echo esc_attr(get_the_date('Y')); ?>">
					<?php
						$post_year = strtok($date, '-');
						echo esc_html($post_year);
					?>
				</time>
			<?php endif; ?>

			<?php $terms = get_the_terms($post->ID , 'portfolio-category'); ?>

			<?php if ($terms): ?>
				<div class="subheading post-category">
					<?php foreach ($terms as $term):
						echo '<span>' . esc_html($term->name) . '</span> ';
					endforeach; ?>
				</div>
			<?php endif; ?>

			<h1 class="post-title"><?php the_title(); ?></h1>
		</a>

	</div>
</article>
