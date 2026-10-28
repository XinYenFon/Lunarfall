# Twemoji graphics

Twemoji graphics by the Twemoji contributors (including the original Twitter artwork contributors).
Source: https://github.com/jdecked/twemoji/tree/b6b55fef1e8636b540a6d016a4729ca8cdf2e60b
Version: v17.0.3. Graphics license: Creative Commons Attribution 4.0 International.
https://creativecommons.org/licenses/by/4.0/

Changes: selected 19 original 72x72 PNG assets without modifying the artwork.
The SMF code-to-image mapping and display size are Lunarfall adaptations, not upstream artwork changes.
See manifest.json for the complete mapping, original URLs and SHA-256 hashes.
LICENSE-GRAPHICS contains the unmodified upstream graphics license; LICENSE preserves the upstream MIT notice.
No Twemoji API JavaScript is distributed. The local adapter is Lunarfall code.

## Enable in SMF

Administration Center > Themes and Layout > Theme Settings > Lunarfall:
enable "Use Twemoji artwork for default smileys in Lunarfall" and save.
This uses SMF's normal theme-setting form; no installer or automatic database write runs.
Leave the forum's smiley set definitions, paths and default unchanged.
Users with an explicit set preference (including an explicit selection of the forum's default set) keep that set's artwork.
Uncheck the setting to disable the adapter. No message conversion or data migration is required.
The normal SMF smiley artwork remains the fallback when JavaScript is unavailable or a custom mapping is unknown.
