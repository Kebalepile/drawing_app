export function printPorgress(count, max) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = formatPercent(count / max);
  process.stdout.write(`${count}/${max} (${percent})`);
}

function formatPercent(n) {
  return (n * 100).toFixed(2) + "%";
}

export function groupBy(objArray, key) {
  const groups = {};
  for (let obj of objArray) {
    const val = obj[key];

    if (groups[val] == null) {
      groups[val] = [];
    }
    groups[val].push(obj);
  }
  return groups;
}

export const styles = {
  car: { color: "gray", text: "🚗" },
  fish: { color: "red", text: "🐠" },
  house: { color: "yellow", text: "🏠" },
  tree: { color: "green", text: "🌳" },
  bicycle: { color: "cyan", text: "🚲" },
  guitar: { color: "blue", text: "🎸" },
  pencil: { color: "magenta", text: "✏️" },
  clock: { color: "lightgray", text: "⏰" },
};

export function distance(p1, p2) {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}
export function getNearest(loc, points) {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearestIndex = 0;

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const d = distance(loc, point);

    if (d < minDist) {
      minDist = d;
      nearestIndex = i;
    }
  }
  return nearestIndex;
}
