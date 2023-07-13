import { draw } from "../../common/draw.js";
export function SketchPad(container, onUpdate = null, size = 310) {
  this.canvas = document.createElement("canvas");
  this.canvas.width = size;
  this.canvas.height = size;
  this.canvas.style = `
    background-color:white;
    box-shadow: 0px 0px 10px 2px black;
    border-radius:4px;`;
  this.onUpdate = onUpdate;

  container.appendChild(this.canvas);

  const lineBreak = document.createElement("br");
  container.appendChild(lineBreak);
  this.undoBtn = document.createElement("button");
  this.undoBtn.textContent = "UNDO";
  this.undoBtn.onclick = () => {
    this.paths.pop();
    this.redraw();
  };
  container.appendChild(this.undoBtn);
  this.ctx = this.canvas.getContext("2d");
  this.paths = [];
  this.isDrawing = false;
  this.addEventListener();
}

SketchPad.prototype.addEventListener = function () {
  this.canvas.onmousedown = (evt) => {
    const mouse = this.getMouse(evt);
    this.paths.push([mouse]);
    this.isDrawing = true;
  };
  this.canvas.onmousemove = (evt) => {
    if (this.isDrawing) {
      const mouse = this.getMouse(evt);
      const lastPath = this.paths[this.paths.length - 1];
      lastPath.push(mouse);

      this.redraw();
    }
  };
  this.canvas.onmouseup = () => {
    this.isDrawing = false;
  };
  this.canvas.ontouchstart = (evt) => {
    const loc = evt.touches[0];
    this.canvas.onmousedown(loc);
  };
  this.canvas.ontouchmove = (evt) => {
    const loc = evt.touches[0];
    this.canvas.onmousemove(loc);
  };
  this.canvas.ontouchend = (evt) => {
    const loc = evt.touches[0];
    this.canvas.onmouseup(loc);
  };
};

SketchPad.prototype.getMouse = function (evt) {
  const rect = this.canvas.getBoundingClientRect();
  const mouse = [
    Math.round(evt.clientX - rect.left),
    Math.round(evt.clientY - rect.top),
  ];
  return mouse;
};
SketchPad.prototype.redraw = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  draw.paths(this.ctx, this.paths);
  if (this.paths.length) {
    this.undoBtn.disabled = false;
  } else {
    this.undoBtn.disabled = true;
  }

  if (this.onUpdate) {
    this.onUpdate(this.paths);
  }
};

SketchPad.prototype.triggerUpdate = function () {
  if (this.onUpdate) {
    this.onUpdate(this.paths);
  }
};
