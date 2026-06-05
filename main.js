// ═══════════════════════════════════════
// KNAUZ ENERGIE — Shared JS (auditált)
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  // ── Navbar scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Hamburger mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    // Close on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Scroll reveal
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ── Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── iFrame auto resize
  window.addEventListener('message', function (e) {
    if (e.data && typeof e.data.height === 'number') {
      const frame = document.getElementById('miniCRMFrame');
      if (frame) frame.style.height = e.data.height + 'px';
    }
  });

  // ── Cookie banner
  const COOKIE_KEY = 'knauz_cookie_consent';
  const banner = document.getElementById('cookieBanner');
  if (banner && !localStorage.getItem(COOKIE_KEY)) {
    setTimeout(() => banner.classList.add('show'), 800);
  }
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  const closeBtn = document.getElementById('cookieClose');
  function closeCookie(val) {
    if (banner) banner.classList.remove('show');
    localStorage.setItem(COOKIE_KEY, val);
  }
  if (acceptBtn) acceptBtn.addEventListener('click', () => closeCookie('accepted'));
  if (declineBtn) declineBtn.addEventListener('click', () => closeCookie('declined'));
  if (closeBtn) closeBtn.addEventListener('click', () => closeCookie('closed'));

  // ── Smooth anchor scroll (for same-page links)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
