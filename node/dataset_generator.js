import { draw } from "../common/draw.js";
import { createCanvas } from "canvas";
import fs from "fs";
const constants = (() => {
  const DATA_DIR = "../data";
  const RAW_DIR = `${DATA_DIR}/raw`;
  const DATASET_DIR = `${DATA_DIR}/dataset`;
  const JSON_DIR = `${DATASET_DIR}/json`;
  const IMG_DIR = `${DATASET_DIR}/img`;
  const SAMPLES = `${DATASET_DIR}/samples.json`;

  return {
    DATA_DIR,
    RAW_DIR,
    DATASET_DIR,
    JSON_DIR,
    IMG_DIR,
    SAMPLES,
  };
})();
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");

function generateImageFile(outputfile, paths) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw.paths(ctx, paths);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputfile, buffer, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
}
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
fileNames.forEach((fn) => {
  const content = fs.readFileSync(constants.RAW_DIR + "/" + fn);
  const { session, student, drawings } = JSON.parse(content);
  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      sessionId: session,
    });
    const paths = drawings[label];
    fs.writeFileSync(
      constants.JSON_DIR + "/" + id + ".json",
      JSON.stringify(paths, null, 4),
      (err) => {
        if (err) {
          console.log(err.message);
        }
      }
    );
    generateImageFile(constants.IMG_DIR + "/" + id + ".png", paths);
    id++;
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples), (err) => {
  if (err) {
    console.log(err.message);
  }
});
