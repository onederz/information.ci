function setupSlider(imageBoxId, dotsContainerId, leftArrowClass, rightArrowClass) {
  const imageBox = document.getElementById(imageBoxId);
  const track = imageBox.querySelector('.carousel-track');
  const images = track.querySelectorAll('img');
  const dotsContainer = document.getElementById(dotsContainerId);

  let currentIndex = 0;
  let startX = 0;

  // Create dots
  dotsContainer.innerHTML = '';
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function updateSlider() {
    const offset = -currentIndex * imageBox.offsetWidth;
    track.style.transform = `translateX(${offset}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  document.querySelector(leftArrowClass).addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
  });

  document.querySelector(rightArrowClass).addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
  });

  // Swipe gesture
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 30) {
      if (diff < 0) {
        currentIndex = (currentIndex + 1) % images.length;
      } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      updateSlider();
    }
  });

  updateSlider(); // Initialize
}

document.addEventListener('DOMContentLoaded', () => {
  setupSlider('tourImageBox', 'tourDots', '.tour-left', '.tour-right');
  setupSlider('busImageBox', 'busDots', '.bus-left', '.bus-right');
});