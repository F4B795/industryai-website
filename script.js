
// INDUSTRYAI – Website Funktionen

document.addEventListener("DOMContentLoaded", () => {

  // Automatisches Jahr im Footer
  const footerYear = document.querySelector("footer p:last-child");

  if (footerYear) {
    footerYear.textContent = "© " +
      new Date().getFullYear() + " INDUSTRYAI";
  }

  // Sanftes Scrollen zu den Website-Bereichen
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });

  console.log("INDUSTRYAI Website erfolgreich geladen.");

});
