// Рекурсивная функция для копирования стилей
export const copyStylesRecursive = (source: Element, target: Element) => {
  if (source instanceof HTMLElement && target instanceof HTMLElement) {
    const computed = window.getComputedStyle(source);
    for (let i = 0; i < computed.length; i++) {
      const prop = computed[i];
      target.style.setProperty(prop, computed.getPropertyValue(prop));
    }
  }

  const sourceChildren = Array.from(source.children);
  const targetChildren = Array.from(target.children);

  for (let i = 0; i < sourceChildren.length; i++) {
    copyStylesRecursive(sourceChildren[i], targetChildren[i]);
  }
};
