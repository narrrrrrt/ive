// js/ebook-modal.js
document.addEventListener('DOMContentLoaded', () => {
  const links   = document.querySelectorAll('.amazon-selector');
  const popover = document.getElementById('amazon-popover');
  const grid    = document.getElementById('amazon-links');

  const STORES = [
    { code: 'US', domain: 'amazon.com' },
    { code: 'UK', domain: 'amazon.co.uk' },
    { code: 'DE', domain: 'amazon.de' },
    { code: 'FR', domain: 'amazon.fr' },
    { code: 'ES', domain: 'amazon.es' },
    { code: 'IT', domain: 'amazon.it' },
    { code: 'NL', domain: 'amazon.nl' },
    { code: 'JP', domain: 'amazon.co.jp' },
    { code: 'BR', domain: 'amazon.com.br' },
    { code: 'CA', domain: 'amazon.ca' },
    { code: 'MX', domain: 'amazon.com.mx' },
    { code: 'AU', domain: 'amazon.com.au' }
  ];

  // 開く（中央表示）-- 座標は一切いじらない
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const asin = link.dataset.asin;

      grid.innerHTML = STORES.map(s =>
        `<a href="https://${s.domain}/dp/${asin}" target="_blank" rel="noopener">${s.code}</a>`
      ).join('');

      // 以前の top/left/visibility をクリア（念のため）
      popover.style.top = '';
      popover.style.left = '';
      popover.style.visibility = '';

      popover.classList.add('open');
    });
  });

  // 黒い背景クリックで閉じる
  popover.addEventListener('click', (e) => {
    if (!e.target.closest('.ebook-popover-content')) {
      popover.classList.remove('open');
    }
  });

  // モーダル外クリック（ページ全体）でも閉じる
  document.addEventListener('click', (e) => {
    if (!popover.classList.contains('open')) return;
    const isTrigger = e.target.classList && e.target.classList.contains('amazon-selector');
    const clickedInside = popover.contains(e.target);
    if (!isTrigger && !clickedInside) popover.classList.remove('open');
  });

  // ESCで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') popover.classList.remove('open');
  });

  // モーダル内クリックは背景に伝播させない
  const content = popover.querySelector('.ebook-popover-content');
  if (content) content.addEventListener('click', (e) => e.stopPropagation());
});