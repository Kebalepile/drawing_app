import { constants } from "../common/constants.js";
import { getPathCount, getPointCount , inUse} from "../common/featuresFunctions.js";
import { printPorgress } from "../common/utils.js";
import fs from "fs";

console.log("EXTRACTING FEATURES ....");

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

for (let sample of samples) {
    printPorgress(sample.id, samples.length );
  const paths = JSON.parse(
    fs.readFileSync(`${constants.JSON_DIR}/${sample.id}.json`)
  );
  const functions = inUse.map(f => f.function);
  sample.point = functions.map(f => f(paths));
  // code below does same work as the inUse functions.
  // sample.point = [getPathCount(paths), getPointCount(paths)];
}

const featureNames = ["Path Count", "Point Count"];
fs.writeFileSync(
  constants.FEATURES,
  JSON.stringify({
    featureNames,
    samples:samples.map(s => {
        return {point:s.point, label:s.label}
      }),
  }),
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);
fs.writeFileSync(
  constants.FEATURES_JS,
  `export const features =${JSON.stringify({
    featureNames,
    samples
  })}`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

console.log("DONE.");