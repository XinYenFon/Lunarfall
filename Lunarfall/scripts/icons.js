/* Lunarfall icon accessibility and text/native fallback. Glyph mappings live in extra-ico.css. */
(function () {
	"use strict";
	var selector = ".fa, .fas, .far, .fab, .fa-solid, .fa-regular, .fa-brands, .main_icons, .toggle_up, .toggle_down, .lf-check, i.valid, span.valid, i.invalid, span.invalid";
	function cssText(style, name) {
		var value = style.getPropertyValue(name).trim();
		if (!value) return "";
		try { return JSON.parse(value); } catch (e) { return value.replace(/^["']|["']$/g, ""); }
	}
	function visibleText(control) {
		var copy = control.cloneNode(true);
		copy.querySelectorAll(selector + ", .lf-icon-native img").forEach(function (icon) { icon.remove(); });
		return copy.textContent.trim();
	}
	function enhance(icon) {
		if (icon.classList.contains("gender_None") || icon.classList.contains("gender_0")) return;
		var style = getComputedStyle(icon);
		var mapped = !!style.getPropertyValue("--lf-icon-code").trim();
		var vendor = !!style.getPropertyValue("--fa").trim();
		var disabled = getComputedStyle(document.documentElement).getPropertyValue("--lf-icons-disabled").trim() === "1";
		var name = cssText(style, "--lf-icon-name");
		var labels = window.lunarfall_icon_labels || {};
		var control = icon.closest("a, button, [role=button]");
		var label = icon.getAttribute("title") || (control && control.getAttribute("title")) ||
			labels[name] || cssText(style, "--lf-icon-label");
		if (!label) {
			var className = Array.from(icon.classList).find(function (name) { return /^fa-[a-z]/.test(name) && !/^fa-(?:lg|fw|solid|regular|brands)$/.test(name); });
			label = className ? className.slice(3).replace(/[-_]/g, " ") : "Icon";
		}

		// Unknown custom post icons keep their SMF image instead of inventing a mapping.
		if (!mapped && !vendor && icon.dataset.lfIconUrl && !icon.classList.contains("lf-icon-native")) {
			var image = document.createElement("img");
			image.src = icon.dataset.lfIconUrl;
			image.alt = "";
			icon.appendChild(image);
			icon.classList.add("lf-icon-native");
		}
		if (!mapped && !vendor && !icon.classList.contains("lf-icon-native") && !icon.classList.contains("lf-icon-unmapped"))
			icon.classList.add("lf-icon-unmapped");
		else if ((mapped || vendor) && icon.classList.contains("lf-icon-unmapped"))
			icon.classList.remove("lf-icon-unmapped");

		if (control) {
			var text = visibleText(control);
			if (!text && (!control.hasAttribute("aria-label") || control.dataset.lfAutoLabel === "true")) {
				control.setAttribute("aria-label", label);
				control.dataset.lfAutoLabel = "true";
			}
			if (text || control.hasAttribute("aria-label") || control.hasAttribute("aria-labelledby")) {
				if (control !== icon) icon.setAttribute("aria-hidden", "true");
				if (disabled && text && !icon.classList.contains("lf-icon-decorative")) icon.classList.add("lf-icon-decorative");
			}
		} else if (!icon.hasAttribute("aria-hidden")) {
			if (!icon.hasAttribute("role")) icon.setAttribute("role", "img");
			if (!icon.hasAttribute("aria-label") || icon.dataset.lfAutoLabel === "true") {
				icon.setAttribute("aria-label", label);
				icon.dataset.lfAutoLabel = "true";
			}
		}
		if (disabled && icon.getAttribute("data-lf-icon-label") !== label)
			icon.setAttribute("data-lf-icon-label", label);
	}
	function scan(root) {
		if (root.nodeType !== 1 && root.nodeType !== 9) return;
		if (root.matches && root.matches(selector)) enhance(root);
		root.querySelectorAll(selector).forEach(enhance);
	}
	function start() {
		scan(document);
		new MutationObserver(function (changes) {
			changes.forEach(function (change) {
				if (change.type === "attributes") scan(change.target);
				else change.addedNodes.forEach(scan);
			});
		}).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "title"] });
	}
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
	else start();
}());
