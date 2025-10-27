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

    // リンクテキストの最終行の座標を取得
    const range = document.createRange();
    range.selectNodeContents(link);
    const rects = range.getClientRects();
    const lastRect = rects[rects.length - 1]; // 最終行の位置
    range.detach();

    // 一時的にポップオーバーを表示してサイズを計算
    popover.style.display = 'block';
    popover.style.visibility = 'hidden';

    grid.innerHTML = STORES.map(s =>
      `<a href="https://${s.domain}/dp/${asin}" target="_blank">${s.code}</a>`
    ).join('');

    // bodyのオフセット補正（中央寄せ対策）
    const bodyRect = document.body.getBoundingClientRect();
    const centerX = lastRect.left - bodyRect.left + lastRect.width / 2;
    const popWidth = popover.offsetWidth;

    // 位置を「リンク最終行の下中央」に合わせる
    popover.style.top = `${window.scrollY + lastRect.bottom + 8}px`;
    popover.style.left = `${window.scrollX + bodyRect.left + centerX - popWidth / 2}px`;

    popover.style.visibility = 'visible';
  });
});
});