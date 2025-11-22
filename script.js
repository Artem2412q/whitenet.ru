// Проверка кода BHB + редирект + статус
(function initGatewayLogic() {
  const bhbInput = document.getElementById("code-bhb");
  const driveInput = document.getElementById("code-drive");
  const continueBtn = document.getElementById("continue-btn");
  const errorBox = document.getElementById("code-error");
  const statusText = document.getElementById("status-text");

  const VALID_BHB_CODE = "BHB_Wattes_187";
  const BHB_URL = "https://artem2412q.github.io/ru-docs/";
  const VALID_DRIVE_CODE = "code6.ru_drive3";
  const DRIVE_URL = "https://github.com/Artem2412q/drive3";

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
    if (driveInput) driveInput.classList.remove("input-error");
    setStatus("STATUS: idle");
  }

  if (!continueBtn) return;

  if (bhbInput) {
    bhbInput.addEventListener("input", () => {
      if (errorBox && errorBox.textContent) clearError();
    });
  }

  if (driveInput) {
    driveInput.addEventListener("input", () => {
      if (errorBox && errorBox.textContent) clearError();
    });
  }

  continueBtn.addEventListener("click", () => {
    const bhbValue = (bhbInput && bhbInput.value ? bhbInput.value : "").trim();
    const driveValue = (driveInput && driveInput.value ? driveInput.value : "").trim();

    if (bhbValue === VALID_BHB_CODE) {
      setStatus("STATUS: access granted (BHB)");
      window.location.href = BHB_URL;
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
    if (bhbInput) bhbInput.classList.add("input-error");
    if (driveInput && driveValue) driveInput.classList.add("input-error");

    setStatus("STATUS: access denied");
  });
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
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
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