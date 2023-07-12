import { constants } from "../../common/constants.js";
export function createRow(container, studentName, samples) {


  const row = document.createElement("section");
  row.classList.add("row");
  container.appendChild(row);

  const rowLabel = document.createElement("article");
  rowLabel.textContent = studentName;
  rowLabel.classList.add("rowLabel");
  row.appendChild(rowLabel);

  for (let sample of samples) {
    
    const { id, label } = sample;
    const sampleContainer = document.createElement("div");
    const sampleLabel = document.createElement("span");
    sampleLabel.textContent = label;
    sampleContainer.appendChild(sampleLabel);
    sampleContainer.classList.add("sampleContainer");

    const img = document.createElement("img");
    img.classList.add("thumb");
    img.setAttribute("src", `${constants.IMG_DIR}/${id}.png`);
    img.setAttribute("alt", label);
    img.setAttribute("loading", "lazy");

    sampleContainer.appendChild(img);
    row.appendChild(sampleContainer);
  }
 
}
