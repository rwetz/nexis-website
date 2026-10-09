// Progressive enhancement for the Next-rendered static marketing pages.
const toggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('#mobile-navigation');
function closeMenu() { if (!toggle || !menu) return; menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
toggle?.addEventListener('click', () => {
  menu.hidden = !menu.hidden;
  toggle.setAttribute('aria-expanded', String(!menu.hidden));
  toggle.setAttribute('aria-label', menu.hidden ? 'Open menu' : 'Close menu');
});
menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu && !menu.hidden) { closeMenu(); toggle.focus(); } });

const gallery = document.querySelector('#showcase');
if (gallery) {
  const tabs = [...gallery.querySelectorAll('[data-gallery-index]')];
  const image = gallery.querySelector('.gallery-image img');
  let active = 0;
  const select = index => {
    active = (index + tabs.length) % tabs.length;
    const tab = tabs[active];
    image.src = tab.dataset.gallerySrc;
    image.alt = `Nexis ${tab.dataset.galleryLabel} screenshot`;
    gallery.querySelector('[data-gallery-title]').textContent = tab.dataset.galleryLabel;
    gallery.querySelector('[data-gallery-caption]').textContent = tab.dataset.galleryCaption;
    gallery.querySelector('[data-gallery-toolbar]').textContent = `NEXIS / ${tab.dataset.galleryLabel.toUpperCase()}`;
    gallery.querySelector('[data-gallery-count]').textContent = `${String(active + 1).padStart(2, '0')} / ${String(tabs.length).padStart(2, '0')}`;
    tabs.forEach((item, i) => { item.setAttribute('aria-pressed', String(i === active)); item.classList.toggle('gallery-tab-active', i === active); });
  };
  gallery.addEventListener('click', e => {
    const tab = e.target.closest('[data-gallery-index]');
    const step = e.target.closest('[data-gallery-step]');
    if (tab) select(Number(tab.dataset.galleryIndex));
    if (step) select(active + Number(step.dataset.galleryStep));
  });
}

const video = document.querySelector('[data-tour-video]');
const play = document.querySelector('[data-tour-play]');
if (video && play) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, requested = false, loaded = false;
  const sync = () => {
    if (!visible || document.hidden || (preference.matches && !requested)) { video.pause(); play.hidden = !preference.matches; return; }
    if (!loaded) { video.poster = video.dataset.poster; video.querySelectorAll('source').forEach(source => source.src = source.dataset.src); video.load(); loaded = true; }
    video.play().then(() => { play.hidden = true; document.querySelector("[data-tour-poster]").hidden = true; }).catch(() => { play.hidden = false; });
  };
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .1 }).observe(video);
  play.addEventListener('click', () => { requested = true; sync(); });
  preference.addEventListener('change', () => { requested = false; sync(); });
  document.addEventListener('visibilitychange', sync);
}

// Load the code font when its content approaches the viewport, not during the hero paint.
const shortcuts = document.querySelector('#shortcuts');
if (shortcuts) {
  const fontObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    document.documentElement.style.setProperty('--font-code', 'var(--font-jetbrains), ui-monospace, monospace');
    fontObserver.disconnect();
  }, { rootMargin: '200px' });
  fontObserver.observe(shortcuts);
}
