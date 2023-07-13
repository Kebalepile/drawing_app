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
    sampleContainer.setAttribute("id", `sample_${id}`);
    sampleContainer.onclick = (e) => {
      handleClick(sample, false);
    };

    const img = document.createElement("img");
    img.classList.add("thumb");
    img.setAttribute("src", `${constants.IMG_DIR}/${id}.png`);
    img.setAttribute("alt", label);
    img.setAttribute("loading", "lazy");

    sampleContainer.appendChild(img);
    row.appendChild(sampleContainer);
  }
}

export function handleClick(sample, doScroll = true) {
  if (sample == null) {
    [...document.querySelectorAll(".emphasize")].forEach((e) =>
      e.classList.remove("emphasize")
    );
    return;
  }

  const el = document.querySelector(`#sample_${sample.id}`);
  if (el.classList.contains("emphasize")) {
    el.classList.remove("emphasize");
    window.chart.selectSample(null);
    return;
  }
  [...document.querySelectorAll(".emphasize")].forEach((e) =>
    e.classList.remove("emphasize")
  );
  el.classList.add("emphasize");
  if (doScroll) {
    el.scrollIntoView({
      behaviour: "auto",
      block: "center",
    });
  }
  window.chart.selectSample(sample);
}

export function toggleInput(inputContainer) {
  if (inputContainer.style.display == "none") {
    inputContainer.style.display = "block";
  } else {
    inputContainer.style.display = "none";
  }
}
