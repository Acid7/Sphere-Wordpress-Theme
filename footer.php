</main>

<footer>

    <?php
        $audio = get_theme_mod('a7x_audio');
        $footer_left = get_theme_mod('a7x_footer_left', 'Made with ❤ by Acid7 Studio.');
        $footer_right = get_theme_mod('a7x_footer_right', '❦ Anno Domini 2021 - Earth, The Universe.');
    ?>

    <?php if ($audio):
        $audio_src = wp_get_attachment_url($audio); ?>

        <div id="audio" class="cursor-fx-hover" data-audio="<?php echo esc_url($audio_src); ?>" data-sound-off="<?php esc_html_e('Sound Off', 'sphere'); ?>"></div>

    <?php elseif ($footer_left): ?>
        <div class="footer-text"><?php echo wp_kses($footer_left, array('a' => array('href' => array(), 'target' => array()))); ?></div>
    <?php endif; ?>


    <?php if (has_nav_menu('footer-menu')):
		wp_nav_menu(array(
			'theme_location' => 'footer-menu',
			'menu_id'        => 'footer-menu',
			'container'      => false,
		));

    elseif ($footer_right): ?>
        <div class="footer-text"><?php echo wp_kses($footer_right, array('a' => array('href' => array(), 'target' => array()))); ?></div>
	<?php endif; ?>

</footer>

<?php wp_footer(); ?>
</body>
</html>
