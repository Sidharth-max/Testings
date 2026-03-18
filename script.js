/* ═══════════════════════════════════════════════════════
   VERCEL-INSPIRED HOME PAGE — Interactions & Animations
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Intersection Observer for Card Animations ───
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation for each card
        const card = entry.target;
        const delay = card.dataset.index * 120;
        
        setTimeout(() => {
          card.classList.add('visible');
        }, delay);
        
        observer.unobserve(card);
      }
    });
  }, observerOptions);

  // Observe all project cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    card.dataset.index = index;
    observer.observe(card);
  });

  // ─── Card Click Navigation ───
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't navigate if clicking on a link inside the card
      if (e.target.closest('a')) return;
      
      const url = card.dataset.url;
      if (url) {
        window.open(url, '_blank');
      }
    });
  });

  // ─── Navbar Scroll Effect ───
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
      navbar.style.background = 'rgba(10, 10, 10, 0.92)';
    } else {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
      navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
    
    lastScrollY = currentScrollY;
  }, { passive: true });

  // ─── Card Tilt on Mouse Move ───
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -2;
      const rotateY = (x - centerX) / centerX * 2;
      
      card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // ─── Dynamic Gradient Glow Following Mouse on Cards ───
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.01))`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ─── Animate Stats Counter ───
  const stats = document.querySelectorAll('.stat-value');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCount(el, 0, target, 1200);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statsObserver.observe(stat));

  function animateCount(el, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      
      el.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }

  // ─── Smooth Parallax on Hero ───
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < 600) {
        hero.style.opacity = 1 - (scrolled / 600);
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }
});
