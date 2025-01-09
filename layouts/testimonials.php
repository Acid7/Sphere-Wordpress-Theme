
<?php
    $author = get_post_meta($post->ID, '_a7x_testimonials_author', true);
    $author_subtitle = get_post_meta($post->ID, '_a7x_testimonials_author_subtitle', true);
?>

<div class="testimonials-item">
    <blockquote class="wp-block-quote">
        <?php the_content(); ?>
        <cite>
            <?php if (has_post_thumbnail()):
				the_post_thumbnail('thumbnail', array('class' => 'testimonials-image'));
    		endif; ?>
            <span class="testimonials-author">
                <?php echo esc_html($author); ?><small><?php echo esc_html($author_subtitle); ?></small>
            </span>
        </cite>
    </blockquote>
</div>
