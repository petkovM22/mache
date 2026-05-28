// Shared inline styles for floating text on the cat-photo background.
// Uses inline styles so changes apply immediately (bypasses any CSS bundle cache).

const POP_SHADOW =
  "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, " +
  "-2px 0 0 #fff, 2px 0 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff, " +
  "0 0 8px rgba(255,255,255,0.9), 0 3px 6px rgba(0,0,0,0.55)";

export const popHeading: React.CSSProperties = {
  color: "#111827", // gray-900
  fontWeight: 800,
  textShadow: POP_SHADOW,
};

export const popPink: React.CSSProperties = {
  color: "#db2777", // pink-600
  fontWeight: 800,
  textShadow: POP_SHADOW,
};

export const popSub: React.CSSProperties = {
  color: "#be185d", // pink-700 (a touch darker than pink-600 for small text)
  fontWeight: 700,
  textShadow: POP_SHADOW,
};

export const popMuted: React.CSSProperties = {
  color: "#1f2937", // gray-800
  fontWeight: 700,
  textShadow: POP_SHADOW,
};
