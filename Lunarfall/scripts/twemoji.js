/* Lunarfall artwork adapter. SMF parses codes; this only updates verified smiley images. */
(function () {
	'use strict';
	var config = window.lunarfall_twemoji;
	if (!config || !config.map || !config.source) return;
	var source;
	try { source = new URL(config.source, document.baseURI).href; } catch (e) { return; }
	function enhance(image) {
		if (image.dataset.lfTwemoji || image.closest('.sceditor-container, .sceditor-dropdown, [contenteditable="true"]')) return;
		var code = image.getAttribute('alt');
		if (!Object.prototype.hasOwnProperty.call(config.map, code)) return;
		var entry = config.map[code], original = image.getAttribute('src'), url;
		try { url = new URL(original, document.baseURI).href; } catch (e) { return; }
		if (!url.startsWith(source)) return;
		var filename = url.slice(source.length);
		if (!new RegExp('^' + entry.filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\.(png|gif|svg|webp|jpe?g)$', 'i').test(filename)) return;
		image.dataset.lfTwemoji = '1';
		image.classList.add('lf-twemoji');
		image.addEventListener('error', function restore() {
			image.removeEventListener('error', restore);
			image.classList.remove('lf-twemoji');
			image.setAttribute('src', original);
		}, { once: true });
		image.src = entry.url;
	}
	function scan(node) {
		if (node.nodeType !== 1 && node.nodeType !== 9) return;
		if (node.matches && node.matches('img.smiley')) enhance(node);
		node.querySelectorAll('img.smiley').forEach(enhance);
	}
	function start() {
		scan(document);
		new MutationObserver(function (changes) {
			changes.forEach(function (change) {
				if (change.type === 'attributes') scan(change.target);
				else change.addedNodes.forEach(scan);
			});
		}).observe(document.documentElement, {childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'class', 'alt']});
	}
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
	else start();
}());
