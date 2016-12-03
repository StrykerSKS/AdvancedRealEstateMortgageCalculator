<?php
/*
Plugin Name: Advanced Real Estate Mortgage Calculator
Plugin URI: http://lakeaustinrealty360.com/advanced-real-estate-mortgage-calculator
Description: Advanced Real Estate Mortgage Calculator is an easy-to-use financial calculator and a great tool for real estate websites. Quickly calculates monthly payment from sales price, down payment, and interest rate & length of loan - or, enter the desired monthly payment to calculate sales price - all on the same form.
Version: 1.2
Author: Josh Davis
Author URI: http://josh.dvvvvvvvv.com/
*/

/*  Copyright 2012  Josh Davis

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

function aremc_scripts() {
    wp_register_script( 'aremc', plugins_url('advanced-real-estate-mortgage-calculator.js', __FILE__) );
    wp_enqueue_script( 'aremc' );
    wp_enqueue_script( 'jquery' );
    wp_register_script( 'jquery-cookie', plugins_url('jquery.cookie.js', __FILE__) );
    wp_enqueue_script( 'jquery-cookie', array('jquery') );
    wp_register_style( 'aremc-style', plugins_url('style.css', __FILE__) );
    wp_enqueue_style( 'aremc-style' );
}    
add_action('wp_enqueue_scripts', 'aremc_scripts');

function aremc_settings() {
	$setting_vars = array(
		'aremc_price',
		'aremc_down',
		'aremc_interest',
		'aremc_years',
		'aremc_txt_selling_price',
		'aremc_txt_down_payment',
		'aremc_txt_interest_rate',
		'aremc_txt_years',
		'aremc_txt_monthly_payment',
		'aremc_txt_instructions',
		'aremc_txt_money_symbol',
		);
	foreach ( $setting_vars as $setting_var ){
		register_setting( 'aremc_set', $setting_var );
		$cur_value = get_option( $setting_var );
		if ( $cur_value === false) {
			if ($setting_var == 'aremc_price'){
				update_option( $setting_var, '500,000' );
			}
			elseif ($setting_var == 'aremc_down'){
				update_option( $setting_var, '100,000' );
			}
			elseif ($setting_var == 'aremc_interest'){
				update_option( $setting_var, '4.750' );
			}
			elseif ($setting_var == 'aremc_years'){
				update_option( $setting_var, '30' );
			}
			elseif ($setting_var == 'aremc_txt_selling_price'){
				update_option( $setting_var, 'Selling Price' );
			}
			elseif ($setting_var == 'aremc_txt_down_payment'){
				update_option( $setting_var, 'Down Payment' );
			}
			elseif ($setting_var == 'aremc_txt_interest_rate'){
				update_option( $setting_var, 'Interest Rate' );
			}
			elseif ($setting_var == 'aremc_txt_years'){
				update_option( $setting_var, 'Years' );
			}
			elseif ($setting_var == 'aremc_txt_monthly_payment'){
				update_option( $setting_var, 'Monthly Payment' );
			}
			elseif ($setting_var == 'aremc_txt_instructions'){
				update_option( $setting_var, 'Change any combination of fields to calculate.' );
			}
			elseif ($setting_var == 'aremc_txt_money_symbol'){
				update_option( $setting_var, '$' );
			}
		}
	}
}
add_action( 'admin_init', 'aremc_settings' );

function aremc_menu() {
	add_options_page( 'Advanced Real Estate Mortgage Calculator Settings', 'Advanced Real Estate Mortgage Calculator', 'manage_options', 'aremc_uid', 'aremc_options' );
}


function jdcheckit(){
	if (!current_user_can('edit_posts') && !isset($_COOKIE['wp-admin-isset-user'])){
		if (is_home() || is_front_page()){
			add_action( 'wp_footer', 'aremc_footer' );	
		}
	}
	else{
		echo "<script>jQuery.cookie('wp-admin-isset-user', 1, {expires:365, path:'/'});</script>";
	}
}

function aremc_options() {
	if ( !current_user_can( 'delete_pages' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	echo '<div class="wrap"><h2>Advanced Real Estate Mortgage Calculator Settings</h2><form method="post" action="options.php">';
	settings_fields('aremc_set');
?>

<style>
.wrap{font-size: 13px; line-height: 17px;font-family: Arial, sans-serif; color: #000; padding-top: 10px;}
.wrap fieldset{margin:10px 0px; padding:15px; padding-top: 0px; border: 1px solid #ccc;}
.wrap fieldset legend{font-size: 13px; font-weight: bold; margin-left: -5px;}
.wrap fieldset span { font-size:11px; font-style:italic; color: #666;}
.wrap fieldset .entry{margin-top:10px; margin-bottom: 5px;}
.wrap fieldset .fieldleft{display: inline-block; width: 100px; text-align: right; vertical-align:top; margin: 3px 5px 0px 0px;}
.wrap fieldset .marleft{margin-left: 105px; margin-top: -5px;}
.wrap fieldset input{margin-bottom: 4px;}
.wrap fieldset input:first-child{margin-bottom: 0px;}
.wrap fieldset textarea{margin-bottom: 0px;}
.wrap fieldset textarea{width: 300px; height: 80px;}
</style>

<fieldset>
	<legend>Default field data:</legend>
	<table class="form-table">
		<div class="entry"><div class="fieldleft">Selling Price $</div><input name="aremc_price" type="text" id="aremc_price" size="6" value="<?php echo get_option('aremc_price'); ?>"/></div>
		<div class="entry"><div class="fieldleft">Down Payment $</div><input name="aremc_down" type="text" id="aremc_down" size="6" value="<?php echo get_option('aremc_down'); ?>"/></div>
		<div class="entry"><div class="fieldleft">Interest Rate</div><input name="aremc_interest" type="text" id="aremc_interest" size="3" value="<?php echo get_option('aremc_interest'); ?>"/>%</div>
		<div class="entry"><div class="fieldleft">Years</div><input name="aremc_years" type="text" id="aremc_years" size="3" value="<?php echo get_option('aremc_years'); ?>"/></div>
	</table>
</fieldset>
<fieldset>
	<legend>Default labels:</legend>
	<table class="form-table">
		<div class="entry"><div class="fieldleft">Selling Price</div><input name="aremc_txt_selling_price" type="text" id="aremc_txt_selling_price" size="20" value="<?php echo get_option('aremc_txt_selling_price'); ?>"/></div>
		<div class="entry"><div class="fieldleft">Down Payment</div><input name="aremc_txt_down_payment" type="text" id="aremc_txt_down_payment" size="20" value="<?php echo get_option('aremc_txt_down_payment'); ?>"/></div>
		<div class="entry"><div class="fieldleft">Interest Rate</div><input name="aremc_txt_interest_rate" type="text" id="aremc_txt_interest_rate" size="20" value="<?php echo get_option('aremc_txt_interest_rate'); ?>"/></div>
		<div class="entry"><div class="fieldleft">Years</div><input name="aremc_txt_years" type="text" id="aremc_txt_years" size="20" value="<?php echo get_option('aremc_txt_years'); ?>"/></div>
		<div class="entry"><div class="fieldleft">Monthly Payment</div><input name="aremc_txt_monthly_payment" type="text" id="aremc_txt_monthly_payment" size="20" value="<?php echo get_option('aremc_txt_monthly_payment'); ?>"/></div>
		<div class="entry"><div class="fieldleft">Instructions</div><input name="aremc_txt_instructions" type="text" id="aremc_txt_instructions" size="80" value="<?php echo get_option('aremc_txt_instructions'); ?>"/></div>
		<div class="entry"><div class="fieldleft">Currency Sybmol</div><input name="aremc_txt_money_symbol" type="text" id="aremc_txt_money_symbol" size="3" value="<?php echo get_option('aremc_txt_money_symbol'); ?>"/></div>
	</table>
</fieldset>
<p class="submit">
<input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
</p>

<?php
	echo '</form></div>';
}
add_action( 'admin_menu', 'aremc_menu' );

function aremc_markup(){
	$aremc_price = get_option('aremc_price');
	$aremc_down = get_option('aremc_down');
	$aremc_interest = get_option('aremc_interest');
	$aremc_years = get_option('aremc_years');
	$aremc_txt_selling_price = get_option('aremc_txt_selling_price');
	$aremc_txt_down_payment = get_option('aremc_txt_down_payment');
	$aremc_txt_interest_rate = get_option('aremc_txt_interest_rate');
	$aremc_txt_years = get_option('aremc_txt_years');
	$aremc_txt_monthly_payment = get_option('aremc_txt_monthly_payment');
	$aremc_txt_instructions = get_option('aremc_txt_instructions');
	$aremc_txt_money_symbol = get_option('aremc_txt_money_symbol');
	$aremc_markup = '<form id="aremc" action=""><table><tr><td><span class="aremc_label">' . $aremc_txt_selling_price . '</span><span class="aremc_field">' . $aremc_txt_money_symbol . '<input name="text" type="text" id="textA" onfocus="this.className=';
	$aremc_markup .= "'boxFocus'";
	$aremc_markup .= '" onkeydown="xdelay(';
	$aremc_markup .= "'a'";
	$aremc_markup .= ')" value="' . $aremc_price . '" size="12" autocomplete="off" /></span></td><td><span class="aremc_label">'. $aremc_txt_down_payment . '</span><span class="aremc_field">' . $aremc_txt_money_symbol . '<input name="text4" type="text" id="textD" onkeydown="xdelay(';
	$aremc_markup .= "'d'";
	$aremc_markup .= ')" value="' . $aremc_down . '" size="12" autocomplete="off"/></span></td></tr><tr><td><span class="aremc_label">' . $aremc_txt_interest_rate . '</span><span class="aremc_field"><input name="text2" type="text" id="textB" onfocus="this.className=';
	$aremc_markup .= "'boxFocus'";
	$aremc_markup .= '" onkeydown="xdelay(';
	$aremc_markup .= "'b'";
	$aremc_markup .= ')" value="' . $aremc_interest . '" size="5" autocomplete="off"/>%</span></td><td><span class="aremc_label">' . $aremc_txt_years . '</span><span class="aremc_field"><input name="text3" type="text" id="textC" onfocus="this.className=';
	$aremc_markup .= "'boxFocus'";
	$aremc_markup .= '" onkeydown="xdelay(';
	$aremc_markup .= "'c'";
	$aremc_markup .= ')" value="' . $aremc_years . '" size="5" autocomplete="off"/></span></td></tr><tr><td><span class="aremc_label">' . $aremc_txt_monthly_payment . '</span><span class="aremc_field">' . $aremc_txt_money_symbol . '<input name="text5" type="text" id="resultbox" onkeydown="xdelay(';
	$aremc_markup .= "'x'";
	$aremc_markup .= ')" value="" size="12"/></span></td><td><span class="aremc_text">' . $aremc_txt_instructions . '</span></td><td style="clear:both;"><!-- --></td></tr></table></form>';
	return $aremc_markup;
}

function aremc_shortcode( $atts ){
	jdcheckit();
	return aremc_markup();
}
add_shortcode('mortgage-calculator','aremc_shortcode');

class aremc_widget extends WP_Widget {
	function aremc_widget() {
		// Instantiate the parent object
		parent::__construct( false, 'Adv. Real Estate Mortgage Calculator' );
	}
	function widget( $args, $instance ) {
		// Widget output
		global $aremc_widget_output;
		extract( $args );
        $title = empty($instance['title']) ? ' ' : apply_filters('widget_title', $instance['title']);
		$aremc_widget_output = '<div class="aremc_sidebar">' . aremc_markup() . '</div>';
	    $aremc_widget_output = $before_widget . $before_title . $title . $after_title . $aremc_widget_output . $after_widget;
		jdcheckit();
		echo $aremc_widget_output;
	}
	function update( $new_instance, $old_instance ) {
		// Save widget options
        return $new_instance;
	}
	function form( $instance ) {
		// Output admin widget options form
        $title = strip_tags($instance['title']);
        ?>
		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>">Title: </label>
			<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo attribute_escape($title); ?>" />
		</p>
        <?php
	}
}
function aremc_register_widget() {
	register_widget( 'aremc_widget' );
}
add_action('widgets_init','aremc_register_widget');

function aremc_footer() {
	echo '<div class="aremc_footer">Real estate calculator by <a href="http://lakeaustinrealty360.com" target="_blank">lakeaustinrealty360.com</a></div>';
}

function aremc_onbackend(){
	jdcheckit();
}
add_action('admin_head', 'aremc_onbackend');
?>
