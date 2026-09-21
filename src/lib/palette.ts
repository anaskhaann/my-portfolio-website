let opener: (() => void) | null = null;

export function registerPaletteOpener(fn: () => void): () => void {
  opener = fn;
  return () => {
    if (opener === fn) opener = null;
  };
}

export function openPalette(): void {
  opener?.();
}
