(function () {
  "use strict";

  var PHONE_E164 = "905521665501";
  var PHONE_DISPLAY = "0552 166 5501";
  var WA_BASE = "https://wa.me/" + PHONE_E164;

  var state = {
    when: "simdi",
    region: "",
  };

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function showToast(message) {
    var toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("show");
    }, 3200);
  }

  function openWhatsApp(text) {
    var url = WA_BASE + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function setLoading(els, on) {
    els.forEach(function (el) {
      if (!el) return;
      el.classList.toggle("is-loading", on);
      el.setAttribute("aria-busy", on ? "true" : "false");
    });
  }

  function buildMessage(coords) {
    var whenLabel =
      state.when === "randevu" ? "Randevulu çağrı" : "Hemen şimdi";
    var lines = [
      "Merhaba, Sarıçam Melek Taksi'den taksi istiyorum.",
      "Tür: " + whenLabel,
    ];

    if (state.region) {
      lines.push("Bölge: " + state.region);
    }

    if (coords) {
      var map =
        "https://maps.google.com/?q=" +
        coords.latitude +
        "," +
        coords.longitude;
      lines.push("Konum: " + map);
      lines.push(
        "(Enlem: " +
          coords.latitude.toFixed(6) +
          ", Boylam: " +
          coords.longitude.toFixed(6) +
          ")"
      );
    } else {
      lines.push(
        "Konum paylaşımı kapalı — lütfen adresimi sorun. Tel: " + PHONE_DISPLAY
      );
    }

    return lines.join("\n");
  }

  function openModal() {
    var backdrop = $("#call-modal");
    if (!backdrop) {
      startGeolocation($all("[data-call-taxi]"));
      return;
    }
    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    var backdrop = $("#call-modal");
    if (!backdrop) return;
    backdrop.classList.remove("open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function startGeolocation(triggerEls) {
    setLoading(triggerEls, true);
    closeModal();

    function finish(coords) {
      setLoading(triggerEls, false);
      openWhatsApp(buildMessage(coords));
    }

    if (!navigator.geolocation) {
      showToast("Tarayıcı konum desteklemiyor. WhatsApp açılıyor…");
      finish(null);
      return;
    }

    showToast("Konumunuz alınıyor…");

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        finish(pos.coords);
      },
      function () {
        showToast("Konum alınamadı. WhatsApp'a yönlendiriliyorsunuz…");
        finish(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 60000,
      }
    );
  }

  function initModal() {
    var backdrop = $("#call-modal");
    if (!backdrop) return;

    var whenChoices = $all("[data-when]", backdrop);
    var chips = $all("[data-region]", backdrop);
    var confirmBtn = $("#modal-confirm");
    var closeBtns = $all("[data-modal-close]", backdrop);

    whenChoices.forEach(function (btn) {
      if (btn.classList.contains("selected")) {
        state.when = btn.getAttribute("data-when") || "simdi";
      }
      btn.addEventListener("click", function () {
        whenChoices.forEach(function (b) {
          b.classList.remove("selected");
        });
        btn.classList.add("selected");
        state.when = btn.getAttribute("data-when") || "simdi";
      });
    });

    chips.forEach(function (chip) {
      if (chip.classList.contains("selected")) {
        state.region = chip.getAttribute("data-region") || "";
      }
      chip.addEventListener("click", function () {
        var value = chip.getAttribute("data-region") || "";
        if (chip.classList.contains("selected")) {
          chip.classList.remove("selected");
          state.region = "";
          return;
        }
        chips.forEach(function (c) {
          c.classList.remove("selected");
        });
        chip.classList.add("selected");
        state.region = value;
      });
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });

    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });

    if (confirmBtn) {
      confirmBtn.addEventListener("click", function () {
        startGeolocation($all("[data-call-taxi]").concat([confirmBtn]));
      });
    }
  }

  function initStickyFab() {
    var fab = $("#sticky-fab");
    var hero = $("#hero");
    if (!fab || !hero) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            fab.classList.toggle("visible", !entry.isIntersecting);
          });
        },
        { threshold: 0.08, rootMargin: "-64px 0px 0px 0px" }
      );
      observer.observe(hero);
    } else {
      function onScroll() {
        var rect = hero.getBoundingClientRect();
        fab.classList.toggle("visible", rect.bottom < 80);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  function initMobileNav() {
    var toggle = $("#menu-toggle");
    var panel = $("#nav-mobile");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    $all("a", panel).forEach(function (link) {
      link.addEventListener("click", function () {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  function initTaxiButtons() {
    $all("[data-call-taxi]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });
  }

  function initLiveStatus() {
    var el = $("#live-eta");
    if (!el) return;
    var hour = new Date().getHours();
    var eta = hour >= 7 && hour <= 21 ? "6–9 dk" : "5–8 dk";
    el.textContent = "Şu an müsait · Ort. " + eta;
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initStickyFab();
    initModal();
    initTaxiButtons();
    initLiveStatus();
  });
})();
