'use strict';

// Navigation remains native anchor links; this only updates the active section.
const sections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...document.querySelectorAll('[data-section]')];
function updateNavigation() {
  const threshold = document.querySelector('.site-header').getBoundingClientRect().bottom + 64;
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section.id;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
    current = sections.at(-1).id;
  }
  navLinks.forEach(link => {
    if (link.dataset.section === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let navigationScheduled = false;
function scheduleNavigation() {
  if (navigationScheduled) return;
  navigationScheduled = true;
  requestAnimationFrame(() => { updateNavigation(); navigationScheduled = false; });
}
window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
window.addEventListener('load', updateNavigation);
updateNavigation();

const filters = [...document.querySelectorAll('[data-filter]')];
const workCards = [...document.querySelectorAll('.work-card')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  let count = 0;
  workCards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  document.getElementById('filter-status').textContent = `${count}개 작품을 표시합니다.`;
  scheduleNavigation();
}));

// All images are local. If the saved YouTube thumbnail fails, show a neutral reel cover.
const reelThumbnail = document.getElementById('reel-thumbnail');
function useReelFallback() {
  if (reelThumbnail.dataset.fallbackUsed) return;
  reelThumbnail.dataset.fallbackUsed = 'true';
  reelThumbnail.src = reelThumbnail.dataset.fallback;
  reelThumbnail.alt = 'DEMO REEL — YouTube에서 영상 시청';
}
reelThumbnail.addEventListener('error', useReelFallback);
if (reelThumbnail.complete && !reelThumbnail.naturalWidth) useReelFallback();

// Set a work's data-trailer-url in index.html to add or remove its trailer.
function youtubeVideoId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return null;
    const host = parsed.hostname.replace(/^www\./, '');
    let id;
    if (host === 'youtu.be') id = parsed.pathname.slice(1);
    else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
      id = parsed.searchParams.get('v') || parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)$/)?.[1];
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id || '') ? id : null;
  } catch { return null; }
}
const dialog = document.getElementById('video-dialog');
const videoFrame = document.getElementById('video-frame');
let videoTrigger = null;
function openVideo(event, link, title, url) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const id = youtubeVideoId(url);
  if (!id || typeof dialog.showModal !== 'function') return;
  event.preventDefault();
  videoTrigger = link;
  document.getElementById('video-title').textContent = `${title} — 예고편`;
  document.getElementById('video-external').href = url;
  const iframe = document.createElement('iframe');
  iframe.title = `${title} 예고편`;
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  videoFrame.replaceChildren(iframe);
  dialog.showModal();
  document.body.classList.add('modal-open');
  document.getElementById('close-video').focus();
}
workCards.forEach(card => {
  const trailerUrl = card.dataset.trailerUrl.trim();
  const actions = card.querySelector('.work-actions');
  if (!youtubeVideoId(trailerUrl)) { actions.replaceChildren(); return; }
  let link = actions.querySelector('[data-video-link]');
  if (!link) {
    link = document.createElement('a');
    link.className = 'button button-trailer';
    link.textContent = '예고편 보기 / Watch Trailer';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    actions.append(link);
  }
  link.href = trailerUrl;
  link.addEventListener('click', event => openVideo(event, link, card.dataset.title, trailerUrl));
});
document.getElementById('close-video').addEventListener('click', () => dialog.close());
// Native dialog provides focus containment and ESC dismissal.
dialog.addEventListener('close', () => {
  videoFrame.replaceChildren();
  document.body.classList.remove('modal-open');
  videoTrigger?.focus();
});
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});

const emailLink = document.getElementById('contact-email');
const recipient = emailLink.getAttribute('href').slice('mailto:'.length);
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(recipient);
    status.textContent = '이메일 주소를 복사했습니다.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(emailLink);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = '이메일 주소를 선택했습니다. ⌘C 또는 Ctrl+C로 복사해 주세요.';
  }
});
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const nameInput = form.elements.namedItem('name');
  const messageInput = form.elements.namedItem('message');
  nameInput.setCustomValidity(nameInput.value.trim() ? '' : '이름 또는 기업명을 입력해 주세요.');
  messageInput.setCustomValidity(messageInput.value.trim() ? '' : '문의 내용을 입력해 주세요.');
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const subject = `[영상 제작 문의] ${fields.get('name').trim()}`;
  const body = `이름 / 기업명: ${fields.get('name').trim()}\n회신 이메일: ${fields.get('email').trim()}\n\n${fields.get('message').trim()}`;
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = '메일 앱에서 내용을 확인한 뒤 직접 전송해 주세요. 앱이 열리지 않으면 위 이메일 주소로 문의해 주세요.';
});
['sender-name', 'sender-message'].forEach(id => document.getElementById(id).addEventListener('input', event => event.target.setCustomValidity('')));
