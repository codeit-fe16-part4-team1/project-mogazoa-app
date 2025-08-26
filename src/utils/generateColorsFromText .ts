const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16);
  }
  return hash;
};

export const generateColorsFromText = (
  text: string,
): {
  '--dynamic-categorie-chip-text-color': string;
  '--dynamic-categorie-chip-bg-color': string;
  '--dynamic-categorie-chip-border-color': string;
  '--dynamic-categorie-chip-ring-color': string;
} => {
  const hash = simpleHash(text);
  const hue = hash % 360;

  // 텍스트는 밝고 채도가 높은 형광색
  const textSaturation = 90;
  const textLightness = 85;

  // 배경은 동일한 색조(hue)를 사용하되, 살짝 어둡고 채도가 낮은 색상
  const bgSaturation = 40;
  const bgLightness = 15;
  const bgAlpha = 0.8;

  // 링은 text와 동일하나 투명하게
  const ringAlpha = 0.2;

  return {
    '--dynamic-categorie-chip-text-color': `hsl(${hue}, ${textSaturation}%, ${textLightness}%)`,
    '--dynamic-categorie-chip-bg-color': `hsla(${hue}, ${bgSaturation}%, ${bgLightness}%, ${bgAlpha})`,
    '--dynamic-categorie-chip-border-color': `hsl(${hue}, ${textSaturation}%, ${textLightness}%)`,
    '--dynamic-categorie-chip-ring-color': `hsla(${hue}, ${textSaturation}%, ${textLightness}%, ${ringAlpha})`,
  };
};
