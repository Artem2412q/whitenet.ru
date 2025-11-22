// Проверка кода BHB + редирект + статус
(function initGatewayLogic() {
  const bhbInput = document.getElementById("code-bhb");
  const continueBtn = document.getElementById("continue-btn");
  const errorBox = document.getElementById("code-error");
  const statusText = document.getElementById("status-text");

  const VALID_BHB_CODE = "BHB_Wattes_187";
  const REDIRECT_URL = "https://artem2412q.github.io/ru-docs/";

  function setStatus(text) {
    if (!statusText) return;
    statusText.textContent = text;
  }

  function clearError() {
    if (!errorBox || !bhbInput) return;
    errorBox.textContent = "";
    errorBox.classList.remove("visible");
    bhbInput.classList.remove("input-error");
    setStatus("STATUS: idle");
  }

  if (!bhbInput || !continueBtn) return;

  bhbInput.addEventListener("input", () => {
    if (errorBox && errorBox.textContent) clearError();
  });

  continueBtn.addEventListener("click", () => {
    const value = (bhbInput.value || "").trim();

    if (value === VALID_BHB_CODE) {
      setStatus("STATUS: access granted");
      window.location.href = REDIRECT_URL;
    } else {
      if (errorBox) {
        errorBox.textContent = "Неверный код BHB. Проверьте значение и попробуйте ещё раз.";
        errorBox.classList.add("visible");
      }
      bhbInput.classList.add("input-error");
      setStatus("STATUS: access denied");
    }
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

  // Если у системы стоит светлая тема — подстроимся под неё
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