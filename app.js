// ===== Ethersoft — front-end polish =====
document.addEventListener('DOMContentLoaded', function () {

  // Reveal-on-scroll for a premium feel.
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Header shadow + back-to-top visibility on scroll.
  var header = document.querySelector('header');
  var toTop = document.querySelector('.back-to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Live year in footers.
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Progressive-enhancement for the contact form (FormSubmit AJAX endpoint).
  var form = document.querySelector('form.contact-form');
  if (form && form.dataset.ajax) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          if (status) status.textContent = 'Thank you — your message has been sent. We’ll be in touch shortly.';
        } else {
          if (status) { status.style.color = '#b4451f'; status.textContent = 'Something went wrong. Please email info@ethersoft.net directly.'; }
        }
      }).catch(function () {
        if (status) { status.style.color = '#b4451f'; status.textContent = 'Network error. Please email info@ethersoft.net directly.'; }
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
      });
    });
  }
});
