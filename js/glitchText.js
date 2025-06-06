// glitchText.js – supports multiple .glitch elements

(function () {
  const glitchChars = "0x4B7965"; // Custom character set (Hex for 'Kye')

  function glitchText(el, duration = 1000, interval = 80) {
    const originalText = el.dataset.text;
    let elapsed = 0;
    const glitchInterval = setInterval(() => {
      el.textContent = [...originalText].map(c =>
        Math.random() > 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : c
      ).join('');

      if ((elapsed += interval) >= duration) {
        clearInterval(glitchInterval);
        el.textContent = originalText;
      }
    }, interval);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const glitchElements = document.querySelectorAll(".glitch");
    glitchElements.forEach(el => {
      if (!el.dataset.text) return;
      setInterval(() => glitchText(el), 5000);
    });
  });
})();
