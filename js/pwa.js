(function () {
  "use strict";

  var deferredPrompt = null;

  function $(sel) {
    return document.querySelector(sel);
  }

  function isStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  function showInstallUI(show) {
    var bar = $("#pwa-install");
    if (!bar) return;
    bar.classList.toggle("show", !!show);
    bar.setAttribute("aria-hidden", show ? "false" : "true");
  }

  function dismissInstall() {
    try {
      localStorage.setItem("pwa-install-dismissed", String(Date.now()));
    } catch (e) {}
    showInstallUI(false);
  }

  function wasDismissedRecently() {
    try {
      var t = Number(localStorage.getItem("pwa-install-dismissed") || 0);
      return t && Date.now() - t < 7 * 24 * 60 * 60 * 1000;
    } catch (e) {
      return false;
    }
  }

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    var swUrl = "/sw.js";
    navigator.serviceWorker.register(swUrl).catch(function () {
      var rel = location.pathname.indexOf("/mahalle/") !== -1 ? "../sw.js" : "sw.js";
      navigator.serviceWorker.register(rel).catch(function () {});
    });
  }

  function initInstallBanner() {
    if (isStandalone() || wasDismissedRecently()) return;

    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      deferredPrompt = e;
      var iosHint = $("#pwa-ios-hint");
      var androidHint = $("#pwa-android-hint");
      var installBtn = $("#pwa-install-btn");
      if (iosHint) iosHint.hidden = true;
      if (androidHint) androidHint.hidden = false;
      if (installBtn) installBtn.hidden = false;
      showInstallUI(true);
    });

    window.addEventListener("appinstalled", function () {
      deferredPrompt = null;
      showInstallUI(false);
    });

    var installBtn = $("#pwa-install-btn");
    var closeBtn = $("#pwa-install-close");

    if (installBtn) {
      installBtn.addEventListener("click", function () {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(function () {
          deferredPrompt = null;
          showInstallUI(false);
        });
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", dismissInstall);
    }

    var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    if (isIOS && !isStandalone() && !wasDismissedRecently()) {
      var ios = $("#pwa-ios-hint");
      var androidHint = $("#pwa-android-hint");
      if (ios) ios.hidden = false;
      if (androidHint) androidHint.hidden = true;
      if (installBtn) installBtn.hidden = true;
      showInstallUI(true);
    }
  }

  function handleCallAction() {
    try {
      var params = new URLSearchParams(location.search);
      if (params.get("action") === "call") {
        var btn = document.querySelector("[data-call-taxi]");
        if (btn) setTimeout(function () { btn.click(); }, 400);
      }
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    registerSW();
    initInstallBanner();
    handleCallAction();
  });
})();