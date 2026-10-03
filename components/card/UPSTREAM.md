Source: https://github.com/daffahaidar/interactive-3d-event-badge
Commit: 57dc31b24c11dc025cae18cad62615a90aedb2db
Author: Daffa Haidar Nabil Zufar
License: MIT (declared in upstream package.json)

`band.tsx` is the upstream component with the displayed name changed to Anas Hamad
and the unused ReactThreeFiber import removed for compatibility. Its original
Inter font is served locally from /assets/fonts/inter.ttf. `badge-scene.tsx`
uses the upstream Canvas, camera, physics, and lighting. The global console warning
filter is omitted. The original card.glb asset is unchanged. The card material uses an authored SVG
texture with Anas’s name, role, and contact information, without a portrait. Its front includes a QR code linking to https://anashamad.com/card.
The lanyard uses an unbranded woven SVG texture. The scene fills the available
space above a footer with email, WhatsApp, and phone contact buttons.
