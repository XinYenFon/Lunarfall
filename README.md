# Lunarfall v0.8.7 (DEVELOPMENT)

<img src="https://raw.githubusercontent.com/Antes/Lunarfall/master/Lunarfall/images/thumbnail.png" style="height: 750px;">

## Description

Lunarfall is a gaming theme for SMF 2.1 with dark/transparent color style. Theme won't be ported back to earlier versions of SMF (Simple Machines Forum).

### Versioning

Lunarfall uses **X.Y.Z**, displayed as **vX.Y.Z**:

- **X (MAJOR):** a substantial rewrite or fundamental architectural change; resets Y and Z to zero.
- **Y (FEATURE):** a new feature; resets Z to zero.
- **Z (HOTFIX):** any bug fix, security fix or compatibility repair, regardless of size; changes only Z.

Version a completed logical change package, not every small edit. Several fixes may share one version. Keep theme metadata and changelog.txt synchronized whenever the version changes. SMF's theme_info.xml keeps the existing numeric format (currently 0.8.7); user-facing release labels use v0.8.7. PHP theme_version and upstream SMF @version comments describe SMF compatibility/source versions, not the Lunarfall release.

The latest user-confirmed published release is **v0.8.6**. The **v0.8.7 development sources** fix social-share parameter encoding, profile-link fallback, agreement-editor markup, font-size line-height reset, PM text/icon preferences, linked board descriptions, split-topic AJAX markup and the localized mobile-menu name. They also retain the local obsolete auto_notify option removal. Native news, Twemoji, responsive styling and existing FA7/PR #10 behavior are preserved. Functional Audit B1 (custom/mod menu icon contracts) is explicitly excluded and awaits separate approval. Published v0.8.6 history and release assets remain unchanged; these sources have not been published or deployed by this task.

### Native news fader

The board-index news fader uses local JavaScript and CSS without a slider library or jQuery dependency. SMF still parses and supplies the rich news content and controls the news-fader setting and reading interval. The existing fade and pagination are retained, with named keyboard-accessible controls, pause/resume, focus/hover and hidden-page pauses, and reduced-motion support. Keyboard focus and manual selection stop automatic rotation until it is explicitly started again. Without JavaScript, news remains an ordinary readable list. The Default Theme's Slippry asset is suppressed only for Lunarfall; SMF's shared jQuery and other themes are unaffected.

### Twemoji smiley artwork (optional)

The theme includes 19 original Twemoji v17.0.3 PNGs for 20 SMF smiley codes. Enable **Use Twemoji artwork for default smileys in Lunarfall** in Lunarfall's Theme Settings and save using SMF's normal administrator form. No separate smiley ZIP or global set registration is needed. The adapter is off until enabled; explicit member set choices and `none` are preserved. Unknown/custom images, `^-^` and `O0` retain SMF artwork. JavaScript-disabled message views retain native artwork. Code insertion and serialization stay with SMF/SCEditor. Graphics are CC BY 4.0; see the distributed `Lunarfall/licenses/twemoji/ATTRIBUTION.md`, license and pinned manifest.

### Dark palette

Color tokens are centralized in the :root block of Lunarfall/css/index.css. Component colors live beside their original selectors in index.css and the relevant administration, calendar and responsive stylesheets; no additional palette stylesheet is loaded. Values were taken from openVectra's resources/css/app.css: navy backgrounds, layered blue surfaces, light text, blue links and distinct status colors. The isolated editor iframe uses the corresponding color values in its local jquery.sceditor.default.css skin. No theme switcher or external stylesheet/font service is added; Font Awesome mappings and disable_fa_icons remain independent of the palette.

### Source version and installed version

The footer displays Lunarfall vX.Y.Z from the active Lunarfall directory's theme_info.xml, read at most once per request without persistent caching. Invalid or unreadable metadata hides the indicator. The XML is the source of truth for Lunarfall's file version; SMF's administration theme list uses separately stored database metadata and can show an older version after a manual file deployment. Routine deployment does not require updating that database version. Package-based updates will be addressed separately.

Read the source version from Lunarfall/theme_info.xml. Separately read theme_info.xml from the installed theme directory (currently D:\PersonalProjects\smf21\Themes\Lunarfall). Never infer the installed version from the source version. The separately checked local installation reports **v0.8.6**; the development sources report **v0.8.7**. This hotfix has not been deployed by this task. Matching version labels do not prove that the latest changes are installed or which theme is active in SMF.

For future patch checks, compare the two numeric XML version values first. Then compare SHA-256 hashes of every distributable source file against the same relative path in the installed theme, recording missing, different and installation-only files separately. Matching version labels alone do not prove that patches are installed; matching source files verifies content parity only for those files. Recheck the installed version and hashes after an explicitly authorized deployment.

Lunarfall/ contains only distributable theme content. Keep analysis, tests and working documents in .codex-reports/, which is excluded from Git. Persistent project rules are in AGENTS.md.

### Icons

Font Awesome Free **7.3.1** is bundled locally using Solid (900), Regular (400) and Brands (400) WOFF2 fonts. No Font Awesome CDN or kit is required. See Lunarfall/FONT-AWESOME-LICENSE.txt for the upstream licenses and attribution.

Keep SMF/legacy aliases and glyph/font-family mappings in Lunarfall/css/extra-ico.css. Verify that new targets exist in Font Awesome Free; keep brand logos for the services they represent. Avoid adding glyph codes to PHP templates or JavaScript. Existing sizing, action classes and SCEditor SVG controls are preserved.

The disable_fa_icons option skips vendor CSS and font loading and uses text labels through icons-disabled.css and scripts/icons.js. The icon helper also supplies accessible names for icon-only controls and native-image fallback for custom SMF post icons.

PR #10 uses SMF's declared main-menu icon and administration plain_class for mapped aliases, and preserves native main-menu image icons. Known limitations remain: custom SMF CSS icon classes are rewritten to FA classes, administration icon filenames can become unmapped FA names, and icons embedded only in a menu title can still appear beside an extra fallback icon. These extension-specific cases are not fixed in v0.8.6.

### How to Install/Upgrade

Upload the prepared Lunarfall.zip through SMF's Administration Center > Themes and Layout > Manage and Install. Its archive root contains theme_info.xml, templates and asset directories directly, as required by the SMF 2.1.8 installer; it includes only the contents of the distributable Lunarfall/ source directory. Repository files, reports and local project rules are excluded.

For a manual file deployment, copy the repository's Lunarfall/ directory into the forum's Themes/ directory. Verify the installed XML/footer version and file hashes separately. Back up the existing theme and use SMF's normal administrator workflow for installation; no automatic database update or deployment is performed by preparing the archive.

There will be no upgrade pack for this theme so you have to do the standard ways to upgrade your theme.

#### Note to users

With recent changes to core of SMF 2.1, we no longer need lunarfall_dependencies. You need to uninstall that mod then upgrade/update the theme.

#### How to Contribute

To contribute back to this theme, you have to sign-off each of your commits and send PR.

#### Changelog

Please read changelog.txt

#### License

Theme is under MIT license, please read LICENSE file in the repository.
