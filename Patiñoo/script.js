document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const slideCounter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progressBar');

  let currentSlide = 0;
  const totalSlides = slides.length;

  function updatePresentation() {
   
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    
    slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

   
    const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressPercentage}%`;

   
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updatePresentation();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updatePresentation();
    }
  }

  function goToFirstSlide() {
    currentSlide = 0;
    updatePresentation();
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`No se pudo activar pantalla completa: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

 
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  restartBtn.addEventListener('click', goToFirstSlide);
  fullscreenBtn.addEventListener('click', toggleFullScreen);

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      goToFirstSlide();
    }
  });

  
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
    }
  });

  updatePresentation();
});