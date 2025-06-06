(function () {
  const config = Object.assign({
    selector: "body",
    id: "cipherMist",
    charset: "0x47484F5354494E5448455348454C4C", 
    fontVar: "--mist-font-size",
    colorVar: "--mist-color-rgb",
    fadeVar: "--mist-fade-speed",
    spawnChance: 0.1
  }, window.CipherMistConfig || {});

  const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const canvas = document.getElementById(config.id) || (() => {
    const c = document.createElement("canvas");
    c.id = config.id;
    Object.assign(c.style, {
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "-2"
    });
    document.querySelector(config.selector).appendChild(c);
    return c;
  })();

  const ctx = canvas.getContext("2d");
  const glyphs = [];

  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };

  const spawnGlyph = () => {
    const char = config.charset[Math.random() * config.charset.length | 0];
    glyphs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      char,
      alpha: 1
    });
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fade = parseFloat(css(config.fadeVar)) || 0.003;
    const fontSize = parseInt(css(config.fontVar)) || 18;
    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = `rgba(${css(config.colorVar)}, 1)`;

    for (let i = glyphs.length - 1; i >= 0; i--) {
      const g = glyphs[i];
      g.alpha -= fade;
      if (g.alpha <= 0) {
        glyphs.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = g.alpha * 0.8;
      ctx.fillText(g.char, g.x, g.y);
    }
    ctx.globalAlpha = 1;

    if (Math.random() < config.spawnChance) spawnGlyph();
    requestAnimationFrame(draw);
  };

  document.addEventListener("DOMContentLoaded", () => {
    resize();
    addEventListener("resize", resize);
    draw();
  });
})();
