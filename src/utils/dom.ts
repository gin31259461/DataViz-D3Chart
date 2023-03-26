export function getElementWidth(id: string): number {
  const element = document.getElementById(id);
  let width = 0;
  if (element !== null)
    width = element.getBoundingClientRect().width;
  return width;
}