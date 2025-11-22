
// Логика проверки кодов BHB / SUA / drive3
(function initGatewayLogic() {
  const bhbInput = document.getElementById("code-bhb");
  const suaInput = document.getElementById("code-sua");
  const driveInput = document.getElementById("code-drive");
  const continueBtn = document.getElementById("continue-btn");
  const errorBox = document.getElementById("code-error");
  const statusText = document.getElementById("status-text");

  const VALID_BHB_CODE = "BHB_Wattes_187";
  const BHB_URL = "https://artem2412q.github.io/bhb/";
  const VALID_SUA_CODE = "SUA_2025";
  const SUA_URL = "https://artem2412q.github.io/sua/";
  const VALID_DRIVE_CODE = "code6.ru_drive3";
  const DRIVE_URL = "https://artem2412q.github.io/drive3/";

  function setStatus(text) {
    if (!statusText) return;
    statusText.textContent = text;
  }

  function clearError() {
    if (errorBox) {
      errorBox.textContent = "";
      errorBox.classList.remove("visible");
    }
    if (bhbInput) bhbInput.classList.remove("input-error");
    if (suaInput) suaInput.classList.remove("input-error");
    if (driveInput) driveInput.classList.remove("input-error");
    setStatus("STATUS: idle");
  }

  if (!continueBtn) return;

  function attachClearOnInput(input) {
    if (!input) return;
    input.addEventListener("input", () => {
      if (errorBox && errorBox.textContent) clearError();
    });
  }

  attachClearOnInput(bhbInput);
  attachClearOnInput(suaInput);
  attachClearOnInput(driveInput);

  continueBtn.addEventListener("click", () => {
    const bhbValue = (bhbInput && bhbInput.value ? bhbInput.value : "").trim();
    const suaValue = (suaInput && suaInput.value ? suaInput.value : "").trim();
    const driveValue = (driveInput && driveInput.value ? driveInput.value : "").trim();

    // Приоритет: BHB → SUA → drive3
    if (bhbValue === VALID_BHB_CODE) {
      setStatus("STATUS: access granted (BHB)");
      window.location.href = BHB_URL;
      return;
    }

    if (suaValue === VALID_SUA_CODE) {
      setStatus("STATUS: access granted (SUA)");
      window.location.href = SUA_URL;
      return;
    }

    if (driveValue === VALID_DRIVE_CODE) {
      setStatus("STATUS: access granted (drive3)");
      window.location.href = DRIVE_URL;
      return;
    }

    if (errorBox) {
      errorBox.textContent = "Неверный код доступа. Проверьте значения и попробуйте ещё раз.";
      errorBox.classList.add("visible");
    }

    if (bhbInput && bhbValue) bhbInput.classList.add("input-error");
    if (suaInput && suaValue) suaInput.classList.add("input-error");
    if (driveInput && driveValue) driveInput.classList.add("input-error");

    setStatus("STATUS: access denied");
  });
})();

// Фоновая «дождь из цифр» анимация на canvas
(function initCodeRain() {
  const canvas = document.getElementById("code-rain");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const chars = "0123456789";
  const fontSize = 16;
  let width = 0;
  let height = 0;
  let columns = 0;
  let drops = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.floor(width / fontSize);
    drops = new Array(columns).fill(0);
  }

  function draw() {
    if (!width || !height) {
      requestAnimationFrame(draw);
      return;
    }

    // слегка затемняем предыдущий кадр для эффекта шлейфа
    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(84, 247, 194, 0.85)";
    ctx.font = fontSize + "px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace";

    for (let i = 0; i < columns; i++) {
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i]++;
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();

// Переключение светлой / тёмной темы
(function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (!toggle || !body) return;

  let currentTheme = "dark";

  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === "light") {
      body.setAttribute("data-theme", "light");
      toggle.textContent = "Светлая";
    } else {
      body.removeAttribute("data-theme");
      toggle.textContent = "Тёмная";
    }
  }

  try {
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    if (prefersLight) {
      applyTheme("light");
    } else {
      applyTheme("dark");
    }
  } catch (e) {
    applyTheme("dark");
  }

  toggle.addEventListener("click", () => {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
})();
