const constants = {
  DATA_DIR: "../data",
  RAW_DIR: this.DATA_DIR + "/raw",
  DATASET_DIR: this.DATA_DIR + "/dataset",
  JSON_DIR: this.DATASET_DIR + "/json",
  IMG_DIR: this.DATASET_DIR + "/img",
  SAMPLES: this.DATASET_DIR + "/samples.json",
};

const fs = require("fs");
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
fileNames.forEach((fn) => {
  const content = fs.readFileSync(constants.RAW_DIR + "/" + fn);
  const { sessionStorage, student, drawings } = JSON.parse(content);
  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      sessionId: session,
    });
    id++;
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples), (err) => {
  if (err) {
    console.log(err.message);
  }
});
