<?php
/** Lunarfall-only smiley artwork adapter; never changes SMF set or message records. */
function lunarfall_twemoji_allowed()
{
	global $settings, $user_info, $user_settings, $modSettings;
	if (empty($settings['lunarfall_twemoji']) || realpath($settings['theme_dir'] ?? '') !== __DIR__)
		return false;
	// Fail closed when the raw member preference is unavailable. Do not mistake an
	// effective forum default for a member's explicit choice of the same set.
	if (empty($user_info['is_guest']) && (!isset($user_settings['smiley_set']) || $user_settings['smiley_set'] !== ''))
		return false;
	if (empty($user_info['smiley_set']) || $user_info['smiley_set'] === 'none' || empty($modSettings['smileys_url']))
		return false;
	return true;
}

function lunarfall_twemoji_init()
{
	global $settings, $user_info, $modSettings, $context;
	if (!lunarfall_twemoji_allowed())
		return;
	$data = @file_get_contents(__DIR__ . '/licenses/twemoji/manifest.json');
	$manifest = $data === false ? null : json_decode($data, true);
	if (!is_array($manifest) || empty($manifest['mapping']) || !is_array($manifest['mapping']))
		return;
	$map = array();
	foreach ($manifest['mapping'] ?? array() as $entry)
	{
		if (!is_array($entry) || !isset($entry['code'], $entry['filename'], $entry['asset']) || !is_string($entry['code']) || !is_string($entry['filename']) || !is_string($entry['asset']))
			continue;
		if (!preg_match('/^[a-f0-9-]+\.png$/D', $entry['asset']) || !is_file(__DIR__ . '/images/twemoji/' . $entry['asset']))
			continue;
		$map[$entry['code']] = array('filename' => $entry['filename'], 'url' => rtrim($settings['theme_url'], '/') . '/images/twemoji/' . $entry['asset']);
	}
	$context['lunarfall_twemoji'] = array('source' => rtrim($modSettings['smileys_url'], '/') . '/' . $user_info['smiley_set'] . '/', 'map' => $map);
	addJavaScriptVar('lunarfall_twemoji', $context['lunarfall_twemoji'], true);
	loadJavaScriptFile('twemoji.js', array('defer' => true, 'minimize' => true), 'lunarfall_twemoji');
	add_integration_function('integrate_sceditor_options', 'lunarfall_twemoji_editor', false);
}

function lunarfall_twemoji_url($code, $original)
{
	global $context;
	if (!lunarfall_twemoji_allowed())
		return $original;
	$config = $context['lunarfall_twemoji'] ?? array();
	$entry = $config['map'][$code] ?? null;
	if (!$entry || !is_string($original) || strpos($original, $config['source']) !== 0)
		return $original;
	// Only known original filenames: custom replacements of built-in codes survive.
	$file = substr($original, strlen($config['source']));
	if (!preg_match('/^' . preg_quote($entry['filename'], '/') . '\.(?:png|gif|svg|webp|jpe?g)$/iD', $file))
		return $original;
	return $entry['url'];
}

function lunarfall_twemoji_editor(&$options)
{
	foreach (array('dropdown', 'popup', 'more', 'hidden') as $section)
		if (isset($options['emoticons'][$section]) && is_array($options['emoticons'][$section]))
			foreach ($options['emoticons'][$section] as $code => &$url)
				$url = lunarfall_twemoji_url($code, $url);
}
