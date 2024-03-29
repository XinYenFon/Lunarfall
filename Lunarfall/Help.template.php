<?php
/**
 * Simple Machines Forum (SMF)
 *
 * @package SMF
 * @author Simple Machines https://www.simplemachines.org
 * @copyright 2022 Simple Machines and individual contributors
 * @license https://www.simplemachines.org/about/smf/license.php BSD
 *
 * @version 2.1.0
 */

/**
 * This displays a help popup thingy
 */
function template_popup()
{
	global $context, $settings, $txt, $modSettings;

	// Since this is a popup of its own we need to start the html, etc.
	echo '<!DOCTYPE html>
<html', $context['right_to_left'] ? ' dir="rtl"' : '', '>
	<head>
		<meta charset="', $context['character_set'], '">
		<meta name="robots" content="noindex">
		<title>', $context['page_title'], '</title>
		<link rel="stylesheet" href="', $settings['theme_url'], '/css/index', $context['theme_variant'], '.css', $context['browser_cache'], '">
		<script src="', $settings['default_theme_url'], '/scripts/script.js', $context['browser_cache'], '"></script>
	</head>
	<body id="help_popup">
		<div class="windowbg description">
			', $context['help_text'], '<br>
			<br>
			<a href="javascript:self.close();">', $txt['close_window'], '</a>
		</div>
	</body>
</html>';
}

/**
 * The template for the popup for finding members
 */
function template_find_members()
{
	global $context, $settings, $scripturl, $modSettings, $txt;

	echo '<!DOCTYPE html>
<html', $context['right_to_left'] ? ' dir="rtl"' : '', '>
	<head>
		<title>', $txt['find_members'], '</title>
		<meta charset="', $context['character_set'], '">
		<meta name="robots" content="noindex">
		<link rel="stylesheet" href="', $settings['theme_url'], '/css/index', $context['theme_variant'], '.css', $context['browser_cache'], '">
		<script src="', $settings['default_theme_url'], '/scripts/script.js', $context['browser_cache'], '"></script>
		<script>
			var membersAdded = [];
			function addMember(name)
			{
				var theTextBox = window.opener.document.getElementById("', $context['input_box_name'], '");

				if (name in membersAdded)
					return;

				// If we only accept one name don\'t remember what is there.
				if (', JavaScriptEscape($context['delimiter']), ' != \'null\')
					membersAdded[name] = true;

				if (theTextBox.value.length < 1 || ', JavaScriptEscape($context['delimiter']), ' == \'null\')
					theTextBox.value = ', $context['quote_results'] ? '"\"" + name + "\""' : 'name', ';
				else
					theTextBox.value += ', JavaScriptEscape($context['delimiter']), ' + ', $context['quote_results'] ? '"\"" + name + "\""' : 'name', ';

				window.focus();
			}
		</script>
	</head>
	<body id="help_popup">
		<form action="', $scripturl, '?action=findmember;', $context['session_var'], '=', $context['session_id'], '" method="post" accept-charset="', $context['character_set'], '" class="padding description">
			<div class="roundframe">
				<div class="cat_bar">
					<h3 class="catbg">', $txt['find_members'], '</h3>
				</div>
				<div class="padding">
					<strong>', $txt['find_username'], ':</strong><br>
					<input type="text" name="search" id="search" value="', isset($context['last_search']) ? $context['last_search'] : '', '" style="margin-top: 4px; width: 96%;"><br>
					<span class="smalltext"><em>', $txt['find_wildcards'], '</em></span><br>';

	// Only offer to search for buddies if we have some!
	if (!empty($context['show_buddies']))
		echo '
					<span class="smalltext">
						<label for="buddies"><input type="checkbox" name="buddies" id="buddies"', !empty($context['buddy_search']) ? ' checked' : '', '> ', $txt['find_buddies'], '</label>
					</span><br>';

	echo '
					<div class="padding righttext">
						<input type="submit" value="', $txt['search'], '" class="button">
						<input type="button" value="', $txt['find_close'], '" onclick="window.close();" class="button">
					</div>
				</div><!-- .padding -->
			</div><!-- .roundframe -->
			<br>
			<div class="roundframe">
				<div class="cat_bar">
					<h3 class="catbg">', $txt['find_results'], '</h3>
				</div>';

	if (empty($context['results']))
		echo '
				<p class="error">', $txt['find_no_results'], '</p>';
	else
	{
		echo '
				<ul class="padding">';

		foreach ($context['results'] as $result)
			echo '
					<li class="windowbg">
						<a href="', $result['href'], '" target="_blank" rel="noopener"><i class="fa fa-user fa-lg"></i>
						<a href="javascript:void(0);" onclick="addMember(this.innerHTML); return false;">', $result['name'], '</a>
					</li>';

		echo '
				</ul>
				<div class="pagesection">
					<div class="pagelinks">', $context['page_index'], '</div>
				</div>';
	}

	echo '
			</div><!-- .roundframe -->
			<input type="hidden" name="input" value="', $context['input_box_name'], '">
			<input type="hidden" name="delim" value="', $context['delimiter'], '">
			<input type="hidden" name="quote" value="', $context['quote_results'] ? '1' : '0', '">
		</form>';

	if (empty($context['results']))
		echo '
		<script>
			document.getElementById("search").focus();
		</script>';

	echo '
	</body>
</html>';
}

/**
 * The main help page
 */
function template_manual()
{
	global $context, $scripturl, $txt;

	echo '
			<div class="cat_bar">
				<h3 class="catbg">', $txt['manual_smf_user_help'], '</h3>
			</div>
			<div id="help_container">
				<div id="helpmain" class="windowbg">
					<p>', sprintf($txt['manual_welcome'], $context['forum_name_html_safe']), '</p>
					<p>', $txt['manual_introduction'], '</p>
					<ul>';

	foreach ($context['manual_sections'] as $section_id => $wiki_id)
		echo '
						<li><a href="', $context['wiki_url'], '/', $context['wiki_prefix'], $wiki_id, ($txt['lang_dictionary'] != 'en' ? '/' . $txt['lang_dictionary'] : ''), '" target="_blank" rel="noopener">', $txt['manual_section_' . $section_id . '_title'], '</a> - ', $txt['manual_section_' . $section_id . '_desc'], '</li>';

	echo '
					</ul>
					<p>', sprintf($txt['manual_docs_and_credits'], $context['wiki_url'], $scripturl . '?action=credits'), '</p>
				</div><!-- #helpmain -->
			</div><!-- #help_container -->';
}

?>