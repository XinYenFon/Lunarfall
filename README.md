# Lunarfall v0.8.3 (24 OCTOBER 2026 — DEVELOPMENT)

<img src="https://raw.githubusercontent.com/Antes/Lunarfall/master/Lunarfall/images/thumbnail.png" style="height: 750px;">

## Description

Lunarfall is a gaming theme for SMF 2.1 with dark/transparent color style. Theme won't be ported back to earlier versions of SMF (Simple Machines Forum).

### Versioning

Lunarfall uses **X.Y.Z**, displayed as **vX.Y.Z**:

- **X (MAJOR):** a substantial rewrite or fundamental architectural change; resets Y and Z to zero.
- **Y (FEATURE):** a new feature; resets Z to zero.
- **Z (HOTFIX):** any bug fix, security fix or compatibility repair, regardless of size; changes only Z.

Version a completed logical change package, not every small edit. Several fixes may share one version. Keep theme metadata and changelog.txt synchronized whenever the version changes. SMF's theme_info.xml keeps the existing numeric format (currently 0.8.3); user-facing release labels use v0.8.3. PHP theme_version and upstream SMF @version comments describe SMF compatibility/source versions, not the Lunarfall release.

The latest published release is **v0.8.0**. The current development sources are **v0.8.3**, including the SMF 2.1.8 structural fixes, Font Awesome maintenance, targeted theme-administration tab styling, removal of the administration donation block, visible icon-and-text profile shortcuts and readable unread-topic notices; this does not mark a publication or deployment.

### Source version and installed version

The footer displays Lunarfall vX.Y.Z from the active Lunarfall directory's theme_info.xml, read at most once per request without persistent caching. Invalid or unreadable metadata hides the indicator. The XML is the source of truth for Lunarfall's file version; SMF's administration theme list uses separately stored database metadata and can show an older version after a manual file deployment. Routine deployment does not require updating that database version. Package-based updates will be addressed separately.

Read the source version from Lunarfall/theme_info.xml. Separately read theme_info.xml from the installed theme directory (currently D:\PersonalProjects\smf21\Themes\Lunarfall). Never infer the installed version from the source version. As rechecked on 24 October 2026 during the two-column profile-menu revision, the installed file reports **v0.8.3**. This revision was not deployed by this task; matching version labels do not prove that its latest source changes are installed or which theme is active in SMF.

For future patch checks, compare the two numeric XML version values first. Then compare SHA-256 hashes of every distributable source file against the same relative path in the installed theme, recording missing, different and installation-only files separately. Matching version labels alone do not prove that patches are installed; matching source files verifies content parity only for those files. Recheck the installed version and hashes after an explicitly authorized deployment.

Lunarfall/ contains only distributable theme content. Keep analysis, tests and working documents in .codex-reports/, which is excluded from Git. Persistent project rules are in AGENTS.md.

### Icons

Font Awesome Free **7.3.1** is bundled locally using Solid (900), Regular (400) and Brands (400) WOFF2 fonts. No Font Awesome CDN or kit is required. See Lunarfall/FONT-AWESOME-LICENSE.txt for the upstream licenses and attribution.

Keep SMF/legacy aliases and glyph/font-family mappings in Lunarfall/css/extra-ico.css. Verify that new targets exist in Font Awesome Free; keep brand logos for the services they represent. Avoid adding glyph codes to PHP templates or JavaScript. Existing sizing, action classes and SCEditor SVG controls are preserved.

The disable_fa_icons option skips vendor CSS and font loading and uses text labels through icons-disabled.css and scripts/icons.js. The icon helper also supplies accessible names for icon-only controls and native-image fallback for custom SMF post icons.

### How to Install/Upgrade

For general users releases will be done in SMorg. For bit more advanced testers you can grab a copy of the repository and upload Lunarfall folder to Themes folder.

There will be no upgrade pack for this theme so you have to do the standard ways to upgrade your theme.

#### Note to users

With recent changes to core of SMF 2.1, we no longer need lunarfall_dependencies. You need to uninstall that mod then upgrade/update the theme.

#### How to Contribute

To contribute back to this theme, you have to sign-off each of your commits and send PR.

#### Changelog

Please read changelog.txt

#### License

Theme is under MIT license, please read LICENSE file in the repository.
