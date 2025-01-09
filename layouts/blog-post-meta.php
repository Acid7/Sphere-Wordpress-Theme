<div class="post-meta subheading">
	<time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time>

	<?php if (get_theme_mod('a7x_blog_author', true)): ?>
		<a class="author" href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>"><?php echo esc_html(get_the_author()); ?></a>
	<?php endif; ?>

	<?php $category = get_the_category(get_the_ID());

	foreach($category as $cat): ?>
		<span><a href="<?php echo esc_url(get_category_link($cat->cat_ID)); ?>"><?php echo esc_html($cat->name) ?></a></span>
	<?php endforeach; ?>

	<?php if (comments_open() || get_comments_number()): ?>
		<span><?php comments_number(esc_html__('0 Comments', 'sphere'), esc_html__('1 Comment', 'sphere'), esc_html__('% Comments', 'sphere')); ?></span>
	<?php endif; ?>
</div>
