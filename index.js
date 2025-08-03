// index.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Fade‑up on scroll
  const fadeItems = document.querySelectorAll('.fade-up');
  if (fadeItems.length) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeItems.forEach(el => {
      el.style.animationPlayState = 'paused';
      io.observe(el);
    });
  }

  // 2. Cookie banner
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  if (banner && acceptBtn) {
    if (!localStorage.getItem('cookieConsent')) {
      banner.classList.remove('hidden');
    }
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      banner.classList.add('hidden');
    });
  }

  // 3. Toast helper (for future use)
  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 3000);
  }

  // 4. Carousel slider
  const track   = document.querySelector('.slider-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  if (track && prevBtn && nextBtn) {
    const slides     = Array.from(track.children);
    let currentIndex = 0;
    const count      = slides.length;

    function updateCarousel() {
      if (currentIndex < 0) currentIndex = count - 1;
      if (currentIndex >= count) currentIndex = 0;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
    });

    // auto‑advance every 5 seconds
    setInterval(() => {
      currentIndex++;
      updateCarousel();
    }, 5000);
  }
});
