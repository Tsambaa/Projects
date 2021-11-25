let image_;
let img;
let mode = 0;
let hahah;

let isImgThere = false;
let isRun = false;

function setup() {
  let c = createCanvas(250, 150);
  background(200);
  textAlign(CENTER);
  text("Drop image", width / 2, height / 2);
  c.drop(gotFile);
}

function draw() {
  if (img) {
    image(img, 0, 0, width, height);
  }
}

function gotFile(file) {
  img = createImg(file.data, "").hide();
  mode = 1;
  hahah = img.elt;
  isImgThere = true;
  console.log("detectIMG");
  document.querySelector("#bg-image").style.backgroundImage = `url(${hahah.src}) `;
}

function windowResized() {
    if (isRun) {

  canvas.width = windowWidth;
  canvas.height = windowHeight;
    }
}

function mouseClicked() {
  if (isImgThere) {
    isRun = true;
    if ((mode == 1, 2, 3)) {
      noCanvas();
      image_ = new Image();
      image_.src = hahah.src;

      image_.addEventListener("load", function () {
        const canvas = document.getElementById("canvas1");
        const ctx = canvas.getContext("2d");
        canvas.width = windowWidth;
        canvas.height = windowHeight;

        let particlesArray = [];
        const numberOfParticles = 30000;
        const detail = 3;

        ctx.drawImage(image_, 0, 0, canvas.width, canvas.height);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let grid = [];
        for (let y = 0; y < canvas.height; y += detail) {
          let row = [];
          for (let x = 0; x < canvas.width; x += detail) {
            const red = pixels.data[y * 4 * pixels.width + x * 4];
            const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
            const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
            const color = "rgb(" + red + "," + green + "," + blue + ")";
            const brightness = calculateBrightness(red, green, blue) / 100;
            const cell = [(cellColor = color), (cellBrightness = brightness)];
            row.push(cell);
          }
          grid.push(row);
        }
        console.log(grid);
        class Particle {
          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 2 + 0.6;
            this.position1 = Math.floor(this.y / detail);
            this.position2 = Math.floor(this.x / detail);
            this.angle = 0;
          }
          update() {
            this.position1 = Math.floor(this.y / detail);
            this.position2 = Math.floor(this.x / detail);
            if (grid[this.position1]) {
              if (grid[this.position1][this.position2]) {
                this.speed = grid[this.position1][this.position2][1];
              }
            }
            this.angle += this.speed / 50;
            let movement = 2.5 - this.speed + this.velocity;
            this.y -= movement + Math.cos(this.angle) * 2;
            this.x += Math.cos(this.angle) * 2;
            if (this.y <= 0) {
              this.y = canvas.height;
              this.x = Math.random() * canvas.width;
            }
          }
          draw() {
            ctx.beginPath();
            ctx.fillStyle = "black";
            if (this.y > canvas.height - this.size * 6) ctx.globalAlpha = 0;
            if (grid[this.position1]) {
              if (grid[this.position1][this.position2]) {
                ctx.fillStyle = grid[this.position1][this.position2][0];
              }
            } else {
              ctx.fillStyle = "white";
            }
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
          }
        }

        function init() {
          for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
          }
        }
        init();

        function animate() {
          ctx.globalAlpha = 0.1;
          ctx.fillStyle = "rgb(0, 0, 0)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 0.2;
          for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.5;
            particlesArray[i].draw();
          }
          requestAnimationFrame(animate);
        }
        animate();

        function calculateBrightness(red, green, blue) {
          return Math.sqrt(
            red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
          );
        }
      });
    }
   isImgThere = false; 
  }
}
