$(function() {
	$('ul.dropmenu, ul.quickbuttons').superfish({delay : 250, speed: 100, sensitivity : 8, interval : 50, timeout : 1});

	// tooltips
	$('.preview').SMFtooltip();

	// find all nested linked images and turn off the border
	$('a.bbc_link img.bbc_img').parent().css('border', '0');
});

// The purpose of this code is to fix the height of overflow: auto blocks, because some browsers can't figure it out for themselves.
function smf_codeBoxFix()
{
	var codeFix = $('code');
	$.each(codeFix, function(index, tag)
	{
		if (is_webkit && $(tag).height() < 20)
			$(tag).css({height: ($(tag).height() + 20) + 'px'});

		else if (is_ff && ($(tag)[0].scrollWidth > $(tag).innerWidth() || $(tag).innerWidth() == 0))
			$(tag).css({overflow: 'scroll'});

		// Holy conditional, Batman!
		else if (
			'currentStyle' in $(tag) && $(tag)[0].currentStyle.overflow == 'auto'
			&& ($(tag).innerHeight() == '' || $(tag).innerHeight() == 'auto')
			&& ($(tag)[0].scrollWidth > $(tag).innerWidth() || $(tag).innerWidth == 0)
			&& ($(tag).outerHeight() != 0)
		)
			$(tag).css({height: ($(tag).height + 24) + 'px'});
	});
}

// Add a fix for code stuff?
if (is_ie || is_webkit || is_ff)
	addLoadEvent(smf_codeBoxFix);

// Toggles the element height and width styles of an image.
function smc_toggleImageDimensions()
{
	var selector = '.postarea img.bbc_img.resized';
	var labels = window.lunarfall_image_labels || {expand: 'Expand image', reduce: 'Reduce image'};
	function prepare(item) {
		if ($(item).closest('a, button, [contenteditable="true"]').length ||
			(!item.hasAttribute('data-lf-image-toggle') && (item.hasAttribute('role') || item.hasAttribute('tabindex'))))
			return false;
		item.setAttribute('data-lf-image-toggle', '1');
		item.setAttribute('tabindex', '0');
		item.setAttribute('role', 'button');
		var expanded = $(item).hasClass('original_size');
		item.setAttribute('aria-pressed', expanded ? 'true' : 'false');
		item.setAttribute('aria-label', (expanded ? labels.reduce : labels.expand) + (item.alt ? ': ' + item.alt : ''));
		return true;
	}
	function scan(root) {
		if (root.nodeType !== 1 && root.nodeType !== 9) return;
		if ($(root).is(selector)) prepare(root);
		$(root).find(selector).each(function() { prepare(this); });
	}
	scan(document);
	// Namespaced delegation covers AJAX posts and avoids duplicate bindings.
	$(document).off('.lunarfallImageSize')
		.on('click.lunarfallImageSize keydown.lunarfallImageSize', selector, function(e) {
			if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
			if (!prepare(this)) return;
			e.preventDefault();
			if (e.type === 'keydown' && e.originalEvent && e.originalEvent.repeat) return;
			$(this).toggleClass('original_size');
			prepare(this);
		});
	if (smc_toggleImageDimensions.observer) smc_toggleImageDimensions.observer.disconnect();
	smc_toggleImageDimensions.observer = new MutationObserver(function(changes) {
		changes.forEach(function(change) {
			change.addedNodes.forEach(scan);
		});
	});
	smc_toggleImageDimensions.observer.observe(document.documentElement, {childList: true, subtree: true});
}

// Add a load event for the function above.
addLoadEvent(smc_toggleImageDimensions);

function smf_addButton(stripId, image, options)
{
	$('#' + stripId).append(
		'<a href="' + options.sUrl + '" class="button last" ' + ('sCustom' in options ? options.sCustom : '') + ' ' + ('sId' in options ? ' id="' + options.sId + '_text"' : '') + '>'
			+ options.sText +
		'</a>'
	);
}
