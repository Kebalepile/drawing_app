export function getPathCount(paths) {
  return paths.length;
}

export function getPointCount(paths) {
  const points = paths.flat();
  return points.length;
}
