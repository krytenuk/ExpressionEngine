<div class="grid_col_settings_custom_field_<?=$col_type?>">
	<?php foreach ($col_settings as $index => $setting): ?>
		<div class="grid_col_settings_section <?=($index % 2) ? 'alt' : ''?>">
			<?=$setting?>
		</div>
	<?php endforeach ?>
</div>