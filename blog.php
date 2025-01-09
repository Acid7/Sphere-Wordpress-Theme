
<div id="blog">

	<?php $is_sidebar = is_active_sidebar('blog-widgets'); ?>

	<?php if ($is_sidebar): ?>
		<aside id="blog-widgets">
			<div id="widgets-close" class="close-button cursor-fx-hover"></div>
			<div class="widgets-wrapper">
				<?php get_sidebar('blog-widgets'); ?>
			</div>
		</aside>
	<?php endif; ?>


	<div class="page-header">
		<h1 class="is-style-underlined">
			<?php if (is_search()):
				printf(esc_html__('Search: %s', 'sphere'), esc_html(get_search_query()));

			elseif (is_home() && get_option('page_for_posts', true)):
				echo esc_html(get_the_title(get_option('page_for_posts', true)));

			elseif (is_home() && !get_option('page_for_posts', true)):
				esc_html_e('Latest Posts', 'sphere');

			else:
				the_archive_title();
			endif; ?>
		</h1>
		<?php if ($is_sidebar): ?>
			<div id="widgets-opener" class="cursor-fx-hover"></div>
		<?php endif; ?>
	</div>


	<div class="blog-items blog-layout">
		<?php if ($wp_query->have_posts()):

			while ($wp_query->have_posts()) : $wp_query->the_post();
				get_template_part('layouts/blog-layout');
			endwhile;

		else: ?>
			<p class="is-style-info-box"><?php esc_html_e('No posts found...', 'sphere'); ?></p>
		<?php endif; ?>
	</div>


	<?php if (get_previous_posts_link() || get_next_posts_link()): ?>
		<div class="pagination-wrapper">
			<div class="pagination-title"><?php esc_html_e('Pages:', 'sphere'); ?></div>
			<?php the_posts_pagination(array(
				'mid_size' => 2,
				'prev_next' => false,
			)); ?>
		</div>
	<?php endif; ?>

</div>
