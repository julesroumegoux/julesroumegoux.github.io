// Tab navigation (hash based) and EN/FR language switch.
(function () {
  var pages = document.querySelectorAll(".page");
  var links = document.querySelectorAll(".nav a");
  var DEFAULT_PAGE = "welcome";

  function showPage() {
    var id = (location.hash || "#" + DEFAULT_PAGE).slice(1);
    if (!document.getElementById("page-" + id)) id = DEFAULT_PAGE;
    pages.forEach(function (p) { p.classList.toggle("active", p.id === "page-" + id); });
    links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + id); });
    window.scrollTo(0, 0);
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.lang === lang);
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  document.querySelectorAll(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });

  // Placeholder links (LinkedIn not yet available) should not jump to the top.
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved === "fr" ? "fr" : "en");

  window.addEventListener("hashchange", showPage);
  showPage();
})();
