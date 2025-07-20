export function composeEvents<T, E = any>(
  originalEvent?: (...args: E[]) => T,
  newEvent?: (...args: E[]) => T
) {
  return (event: E) => {
    originalEvent?.(event);
    newEvent?.(event);
  };
}
