const wrapper = document.querySelector(".wrapper");
const { log } = console;

//Event propagation:
//Clicking the third element will trigger all of them because of bubbling
let div1 = document.querySelector("#div1");
let div2 = document.querySelector("#div2");
let div3 = document.querySelector("#div3");

div1.addEventListener(
  "click",
  function (e) {
    alert("Component 1 event clicked");
  }
  // true <- if you add these bubbling will be replaced with capturing and all the events will fire but from the most outer to the inner
);

div2.addEventListener(
  "click",
  function (e) {
    alert("Component 2 event clicked");
  }
  // true
);

div3.addEventListener(
  "click",
  function (e) {
    alert("Component 3 event clicked");
  }
  // true
);

const handleClick = (e) => {
  e.stopPropagation();
  switch (true) {
    case e.target.classList.contains("box"):
      log("Clicked outside: ", e.target.textContent);
      break;
    case e.target.classList.contains("innerBox"):
      log("Clicked inside: ", e.target.textContent);
      break;
    default:
      log("Clicked elsewhere");
  }
};

wrapper.addEventListener("click", handleClick);

for (let i = 0; i < 50; i++) {
  const box = document.createElement("div");
  const innerBox = document.createElement("span");
  innerBox.classList.add("innerBox");
  innerBox.textContent = i;
  box.appendChild(innerBox);
  box.classList.add("box");
  box.style.width = "100px";
  box.style.height = "100px";

  wrapper.appendChild(box);
}

// Debounce / throttle / lazyload

const start = Date.now();
setTimeout(() => {
  log("Debounced");
  const end = Date.now();
  log(`Execution time: ${end - start}`);
}, 0);

log("First"); // 1
log("Second"); // 2
setTimeout(() => {
  log("Third");
}, 100); // 5
setTimeout(() => {
  log("Fourth");
}, 0); // 4
log("Fifth"); // 3

const stopBtn = document.querySelector(".stopTimeout");

const logHello = () => {
  log("HELLO!");
};

const delayedHello = setTimeout(logHello, 5000);

stopBtn.addEventListener("click", () => {
  clearTimeout(delayedHello);
  log("Timeout cleared!");
});

// Debounce:

// const debounce = (func, wait) => {
//   let timeout;

//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };

//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

// This executes immediatelly

// const getValueFromInput = function (e) {
//   log(e.target.value);
// };

// This is debounced by half a second

const getValueFromInput = _.debounce(function (e) {
  log(e.target.value);
}, 500);

const myInput = document.querySelector(".myInput");
myInput.addEventListener("input", getValueFromInput);

document.addEventListener(
  "mousemove",
  _.throttle((e) => {
    log(e.x, e.y);
  }, 333)
);

//Here we create lazy loaded images:
// It's commented out because in HTML there is the same with a library

// for (let a = 0; a < 6; a++) {
//   const newImg = document.createElement("img");
//   newImg.classList.add("newImg");
//   newImg.src = `./assets/img-${a}.jpg`;
//   newImg.setAttribute("loading", "lazy");
//   wrapper.appendChild(newImg);
// }
