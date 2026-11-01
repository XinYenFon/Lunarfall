/* Lunarfall rich-content news fader. No jQuery dependency; SMF owns content parsing. */
(function () {
	'use strict';
	var instances = new WeakMap(), sequence = 0;

	function mount(root) {
		if (instances.has(root)) return instances.get(root);
		var list = root.querySelector(':scope > ul');
		if (!list) return null;
		var slides = Array.from(list.children).filter(function (el) { return el.tagName === 'LI'; });
		if (slides.length < 2) return null;
		var delay = Number(root.dataset.interval), motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (!Number.isFinite(delay) || delay < 0) delay = 4000;
		var current = 0, timer = 0, finish = 0, paused = false, hovered = false, busy = false;
		var allowFocus = false, pointerPause = null, dead = false, snapshots = [], tabs = new Map(), listeners = [];
		function remember(el, names) {
			names.forEach(function (name) { snapshots.push([el, name, el.getAttribute(name)]); });
		}
		function on(el, name, fn) {
			el.addEventListener(name, fn);
			listeners.push(function () { el.removeEventListener(name, fn); });
		}
		function available(slide, visible) {
			slide.inert = !visible;
			slide.setAttribute('aria-hidden', String(!visible));
			// tabindex also protects inactive links in browsers without inert support.
			slide.querySelectorAll('a[href],area[href],button,input,select,textarea,iframe,[tabindex],[contenteditable]').forEach(function (el) {
				if (!tabs.has(el)) tabs.set(el, el.getAttribute('tabindex'));
				var original = tabs.get(el);
				if (!visible) el.setAttribute('tabindex', '-1');
				else if (original === null) el.removeAttribute('tabindex');
				else el.setAttribute('tabindex', original);
			});
		}
		remember(root, ['data-enhanced', 'role', 'aria-label']);
		remember(list, ['id', 'aria-live']);
		if (!list.id) {
			do { sequence++; } while (document.getElementById('lf-news-' + sequence));
			list.id = 'lf-news-' + sequence;
		}
		root.setAttribute('role', 'region');
		root.setAttribute('aria-label', root.dataset.label);
		slides.forEach(function (slide, i) {
			remember(slide, ['class', 'hidden', 'inert', 'aria-hidden']);
			slide.classList.add('lf-news-item');
			slide.hidden = i !== 0;
			slide.classList.toggle('is-active', i === 0);
			available(slide, i === 0);
		});
		var controls = document.createElement('div'), pages = document.createElement('div'), toggle = document.createElement('button');
		controls.className = 'lf-news-controls';
		pages.className = 'lf-news-pages';
		toggle.type = 'button';
		toggle.className = 'lf-news-toggle';
		toggle.setAttribute('aria-controls', list.id);
		// Rotation control precedes pagination in the keyboard sequence.
		controls.append(toggle, pages);
		var buttons = slides.map(function (slide, i) {
			var button = document.createElement('button');
			button.type = 'button';
			button.className = 'lf-news-dot';
			button.setAttribute('aria-label', root.dataset.item.replace('%d', String(i + 1)));
			button.setAttribute('aria-controls', list.id);
			on(button, 'click', function () {
				paused = true; allowFocus = false;
				if (busy) complete();
				go(i); update();
			});
			on(button, 'keydown', function (event) {
				var step = getComputedStyle(root).direction === 'rtl' ? -1 : 1, next;
				if (event.key === 'ArrowRight') next = (i + step + slides.length) % slides.length;
				else if (event.key === 'ArrowLeft') next = (i - step + slides.length) % slides.length;
				else if (event.key === 'Home') next = 0;
				else if (event.key === 'End') next = slides.length - 1;
				else return;
				event.preventDefault();
				buttons[next].focus(); buttons[next].click();
			});
			pages.append(button);
			return button;
		});
		root.append(controls);
		root.setAttribute('data-enhanced', '');
		function clear() { clearTimeout(timer); timer = 0; }
		function running() {
			return !dead && !paused && !hovered && !document.hidden && !motion.matches &&
				(!root.contains(document.activeElement) || (allowFocus && document.activeElement === toggle));
		}
		function schedule(extra) {
			clear();
			if (running()) timer = setTimeout(function () { timer = 0; go((current + 1) % slides.length); }, delay + (extra || 0));
		}
		function update() {
			buttons.forEach(function (button, i) { button.setAttribute('aria-current', String(i === current)); });
			list.setAttribute('aria-live', paused || motion.matches ? 'polite' : 'off');
			toggle.disabled = motion.matches;
			toggle.textContent = paused || motion.matches ? '\u25b6' : '\u23f8';
			toggle.setAttribute('aria-label', motion.matches ? root.dataset.reduced : (paused ? root.dataset.play : root.dataset.pause));
			schedule();
		}
		function complete() {
			clearTimeout(finish); finish = 0;
			slides.forEach(function (slide, i) { slide.hidden = i !== current; slide.classList.remove('is-leaving'); });
			busy = false;
			// Preserve Slippry's start-to-start cadence, without a permanent interval.
			if (!timer) schedule();
		}
		function go(index) {
			// Never hide the news item currently containing keyboard focus.
			if (dead || busy || index === current || slides[current].contains(document.activeElement)) return;
			clear(); busy = true;
			var old = slides[current], next = slides[index];
			old.classList.remove('is-active'); old.classList.add('is-leaving'); available(old, false);
			next.hidden = false; available(next, true);
			next.getBoundingClientRect(); // Establish opacity:0 before starting the CSS fade.
			next.classList.add('is-active'); current = index;
			update();
			if (motion.matches) complete();
			else finish = setTimeout(complete, 800);
		}
		on(root, 'mouseenter', function () { hovered = window.matchMedia('(hover: hover)').matches; schedule(); });
		on(root, 'mouseleave', function () { hovered = false; schedule(100); });
		on(root, 'focusin', function () { paused = true; allowFocus = false; update(); });
		on(root, 'focusout', function () { schedule(); });
		on(toggle, 'pointerdown', function () { pointerPause = paused; });
		on(toggle, 'click', function (event) {
			var previous = event.detail > 0 && pointerPause !== null ? pointerPause : paused;
			pointerPause = null; paused = !previous; allowFocus = !paused; update();
		});
		on(document, 'visibilitychange', function () { schedule(); });
		var changedMotion = function () { if (motion.matches) complete(); update(); };
		if (motion.addEventListener) on(motion, 'change', changedMotion);
		else {
			motion.addListener(changedMotion);
			listeners.push(function () { motion.removeListener(changedMotion); });
		}
		var controller = {
			destroy: function () {
				if (dead) return;
				dead = true; clear(); clearTimeout(finish);
				listeners.forEach(function (remove) { remove(); }); controls.remove();
				tabs.forEach(function (value, el) { if (value === null) el.removeAttribute('tabindex'); else el.setAttribute('tabindex', value); });
				snapshots.reverse().forEach(function (entry) { if (entry[2] === null) entry[0].removeAttribute(entry[1]); else entry[0].setAttribute(entry[1], entry[2]); });
				instances.delete(root);
			},
			refresh: function () { var stopped = paused; controller.destroy(); var fresh = mount(root); if (fresh && stopped) fresh.pause(); return fresh; },
			pause: function () { paused = true; update(); }
		};
		instances.set(root, controller);
		update(); schedule(500);
		return controller;
	}
	function scan(scope) {
		if (scope.matches && scope.matches('[data-lf-news]')) mount(scope);
		scope.querySelectorAll('[data-lf-news]').forEach(mount);
	}
	window.LunarfallNewsFader = { mount: mount, scan: scan, destroy: function (root) { var instance = instances.get(root); if (instance) instance.destroy(); } };
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { scan(document); }, { once: true });
	else scan(document);
}());
