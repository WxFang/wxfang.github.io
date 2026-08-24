const playObjects = document.querySelectorAll(".play-object");
const playgroundWord = document.querySelector(".playground__word");

playObjects.forEach((object) => {
  object.addEventListener("click", () => {
    playObjects.forEach((item) => item.classList.remove("is-poked"));
    object.classList.add("is-poked");
    playgroundWord.textContent = object.dataset.word;
  });
});

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;

    filters.forEach((item) => {
      const active = item === filter;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    products.forEach((product) => {
      const moves = product.dataset.moves.split(" ");
      product.classList.toggle("is-hidden", selected !== "all" && !moves.includes(selected));
    });
  });
});

const signupForm = document.querySelector("#signup-form");
const signupMessage = document.querySelector("#signup-message");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signupMessage.textContent = "You’re on the imaginary list—for now. The real signup comes next.";
  signupForm.reset();
});
