export const createImageFallback = (fallbackSrc) => (event) => {
  const target = event.currentTarget;
  target.onerror = null;
  target.src = fallbackSrc;
};
