
<?php if (post_password_required()):
	return;
endif; ?>


<div id="comments">

	<?php if (have_comments() && function_exists('a7x_custom_comment_layout')): ?>
		<div class="comments-wrapper">

			<h3 class="is-style-underlined"><?php esc_html_e('Comments', 'sphere'); ?></h3>

			<?php wp_list_comments(array(
				'avatar_size' 	=> 80,
				'style'			=> 'div',
				'callback'		=> 'a7x_custom_comment_layout',
			));

			the_comments_navigation(); ?>
		</div>
	<?php endif; ?>

	<?php if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')): ?>
		<p class="is-style-info-box"><?php esc_html_e('Comments are closed.', 'sphere'); ?></p>
	<?php endif; ?>

	<?php comment_form(array(
		'title_reply_before' => '<h4>',
		'title_reply_after'  => '</h4>',
	)); ?>

</div>
