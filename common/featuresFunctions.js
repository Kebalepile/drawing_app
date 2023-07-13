export function getPathCount(paths) {
  return paths.length;
}

export function getPointCount(paths) {
  const points = paths.flat();
  return points.length;
}

export function getWidth(paths) {
  const points = paths.flat();
  const x = points.map((p) => p[0]),
    min = Math.min(...x),
    max = Math.max(...x);
  return max - min;
}
export function getHeight(paths) {
  const points = paths.flat();
  const y = points.map((p) => p[1]),
    min = Math.min(...y),
    max = Math.max(...y);
  return max - min;
}

export const inUse = [
  { name: "Width", function: getWidth },
  { name: "Height", function: getHeight },
];
