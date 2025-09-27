document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".gallery-scroll img"));
  const lightbox = document.getElementById("lightbox");
  const lbImg = lightbox.querySelector("img");
  const lbClose = lightbox.querySelector(".close-lightbox");
  const lbPrev = lightbox.querySelector(".lightbox-prev");
  const lbNext = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;

  function showImage(index) {
    if(index < 0) index = images.length -1;
    if(index >= images.length) index = 0;
    currentIndex = index;
    lbImg.src = images[currentIndex].src;
    lightbox.style.display = "flex";
  }

  images.forEach((img, i) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => showImage(i));
  });

  lbClose.addEventListener("click", () => lightbox.style.display = "none");

  lbPrev.addEventListener("click", () => showImage(currentIndex -1));
  lbNext.addEventListener("click", () => showImage(currentIndex +1));

  lightbox.addEventListener("click", e => {
    if(e.target === lightbox) lightbox.style.display = "none";
  });

  // Navigation clavier
  document.addEventListener("keydown", e => {
    if(lightbox.style.display === "flex") {
      if(e.key === "ArrowLeft") showImage(currentIndex -1);
      if(e.key === "ArrowRight") showImage(currentIndex +1);
      if(e.key === "Escape") lightbox.style.display = "none";
    }
  });
});
