// js/amazon-popover.js
document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('.amazon-selector');
  const popover = document.getElementById('amazon-popover');
  const grid = document.getElementById('amazon-links');

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

  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && !e.target.classList.contains('amazon-selector')) {
      popover.style.display = 'none';
    }
  });

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const asin = link.dataset.asin;
      const rect = link.getBoundingClientRect();

      // 先に一度表示（位置計算用）
      popover.style.display = 'block';
      popover.style.visibility = 'hidden';

      // 内容更新
      grid.innerHTML = STORES.map(s =>
        `<a href="https://${s.domain}/dp/${asin}" target="_blank">${s.code}</a>`
      ).join('');

      // 吹き出しの正しい位置を中央に
      const popWidth = popover.offsetWidth;
      popover.style.top = `${window.scrollY + rect.bottom + 8}px`;
      popover.style.left = `${window.scrollX + rect.left + rect.width / 2 - popWidth / 2}px`;

      // 表示
      popover.style.visibility = 'visible';
    });
  });
});