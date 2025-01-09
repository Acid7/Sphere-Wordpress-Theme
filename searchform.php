
<form id="search-form" method="get" action="<?php echo esc_url(home_url('/')); ?>">
	<input type="search" placeholder="<?php echo esc_attr_x('Search&hellip;', 'placeholder', 'sphere'); ?>" value="<?php echo get_search_query(); ?>" name="s" />
	<button type="submit"><?php echo esc_html_x('Search', 'submit button', 'sphere'); ?></button>
</form>
