function SketchPad(container, size = 400) {
  this.canvas = document.createElement("canvas");
  this.canvas.width = size;
  this.canvas.height = size;
  this.canvas.style = `
    background-color:white;
    box-shadow: 0px 0px 10px 2px black;`;
  container.appendChild(this.canvas);
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
      //   this.paths.push(mouse);
      //   console.log(this.path.length);
      this.redraw();
    }
  };
  this.canvas.onmouseup = () => {
    this.isDrawing = false;
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
};
