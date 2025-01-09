<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>

	<div class="portfolio-item-intro">

		<?php
			$header_image = get_post_meta($post->ID, '_a7x_portfolio_item_header_image', true);
			$header_image = json_decode($header_image, true);
			$overlay_color = get_post_meta($post->ID, '_a7x_portfolio_item_overlay', true);
		?>

		<?php if (has_post_thumbnail() || !empty($header_image['id'])): ?>
			<div class="image-wrapper"><?php
				if ($header_image['id']):
					echo wp_get_attachment_image($header_image['id'], 'full');
				else:
					the_post_thumbnail('full', array('class' => 'featured-image'));
				endif; ?>
			</div>
		<?php endif; ?>

		<?php if ($overlay_color): ?>
			<div class="portfolio-item-overlay" style="background-color: <?php echo esc_attr($overlay_color); ?>;"></div>
		<?php endif; ?>

		<div class="post-title-wrapper">
			<h1 class="post-title is-style-underlined"><?php the_title(); ?></h1>

			<div class="post-category is-style-excerpt-big">
				<?php $terms = get_the_terms($post->ID , 'portfolio-category');

				if ($terms):
					foreach ($terms as $term):
						echo '<span>' . esc_html($term->name) . '</span> ';
					endforeach;
				endif; ?>
			</div>
		</div>

		<?php
			$item_date = get_post_meta($post->ID, '_a7x_portfolio_item_date', true);
			$item_client = get_post_meta($post->ID, '_a7x_portfolio_item_client', true);
			$item_services = get_post_meta($post->ID, '_a7x_portfolio_item_role', true);
			$item_link = get_post_meta($post->ID, '_a7x_portfolio_item_link', true);
			$bg_color = get_post_meta($post->ID, '_a7x_portfolio_item_bg_color', true);
			$text_color = get_post_meta($post->ID, '_a7x_portfolio_item_text_color', true);
		?>

		<div class="portfolio-item-meta">
			<div class="portfolio-item-fields">
				<?php if ($item_date): ?>
					<div class="field"><span><?php esc_html_e('Date:', 'sphere'); ?></span><time datetime="<?php echo esc_attr(get_the_date('Y-m')); ?>"><?php echo esc_html(date('F Y', strtotime($item_date))); ?></time></div>
				<?php endif; ?>
				<?php if ($item_client): ?>
					<div class="field"><span><?php esc_html_e('Client:', 'sphere'); ?></span><?php echo esc_html($item_client); ?></div>
				<?php endif; ?>
				<?php if ($item_services): ?>
					<div class="field"><span><?php esc_html_e('Role:', 'sphere'); ?></span><?php echo esc_html($item_services); ?></div>
				<?php endif; ?>
			</div>

			<?php if ($item_link): ?>
				<a class="portfolio-item-link" href="<?php echo esc_url($item_link); ?>" target="_blank" data-text="<?php esc_html_e('View Link', 'sphere'); ?>"><span><?php esc_html_e('View Link', 'sphere'); ?></span></a>
			<?php endif; ?>
		</div>

		<div id="scroll-down" class="cursor-fx-hover"></div>
	</div>

	<article id="scroll-down-anchor" class="post-content" data-bg-color="<?php echo esc_attr($bg_color); ?>" data-text-color="<?php echo esc_attr($text_color); ?>">

		<div class="entry-content">
			<?php the_content(); ?>
		</div>

		<?php a7x_wp_link_pages(); ?>

		<?php if (get_theme_mod('a7x_portfolio_share', true) && function_exists('a7x_share_links')):
			echo a7x_share_links();
		endif; ?>
	</article>

<?php endwhile;

get_footer(); ?>
