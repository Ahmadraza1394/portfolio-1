document.addEventListener("DOMContentLoaded", () => {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookiesBtn = document.getElementById("accept-cookies");
  const declineCookiesBtn = document.getElementById("decline-cookies");
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const englishBtn = document.getElementById("english-btn");
  const polishBtn = document.getElementById("polish-btn");

  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (!cookiesAccepted) {
    cookieConsent.style.display = "block";
  } else {
    cookieConsent.style.display = "none";
  }

  acceptCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieConsent.style.display = "none";
  });

  declineCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "false");
    cookieConsent.style.display = "none";
  });

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
  });

  englishBtn.addEventListener("click", (event) => {
    event.preventDefault();
    setLanguage("en");
  });

  polishBtn.addEventListener("click", (event) => {
    event.preventDefault();
    setLanguage("pl");
  });

  const defaultLanguage = localStorage.getItem("selectedLanguage") || "en";
  loadLanguage(defaultLanguage);
  highlightSelectedLanguage(defaultLanguage);

  // Accessibility: Toggle ARIA expanded state
  const dropbtn = document.getElementById("selected-language");
  dropbtn.addEventListener("click", () => {
    const expanded = dropbtn.getAttribute("aria-expanded") === "true" || false;
    dropbtn.setAttribute("aria-expanded", !expanded);
  });

  // Accessibility: Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) {
      dropbtn.setAttribute("aria-expanded", "false");
    }
  });
});

function setLanguage(language) {
  localStorage.setItem("selectedLanguage", language);
  location.reload(); // Reload the page to apply the language change
}

function highlightSelectedLanguage(language) {
  const englishBtn = document.getElementById("english-btn");
  const polishBtn = document.getElementById("polish-btn");
  const selectedLanguageBtn = document.getElementById("selected-language");

  if (language === "en") {
    englishBtn.classList.add("active");
    polishBtn.classList.remove("active");
    selectedLanguageBtn.textContent = "English";
  } else if (language === "pl") {
    polishBtn.classList.add("active");
    englishBtn.classList.remove("active");
    selectedLanguageBtn.textContent = "Polski";
  }
}

function loadLanguage(language) {
  fetch(`./assets/languages/${language}.json`)
    .then((response) => response.json())
    .then((translations) => {
      // Update navbar links
      document.querySelector('a[href="#about-me"]').textContent =
        translations.header.aboutMe;
      document.querySelector('a[href="#education"]').textContent =
        translations.header.education;
      document.querySelector('a[href="#work"]').textContent =
        translations.header.workExperience;
      document.querySelector('a[href="#projects"]').textContent =
        translations.header.projects;
      document.querySelector('a[href="#skills"]').textContent =
        translations.header.skills;
      document.querySelector('a[href="#hobbies"]').textContent =
        translations.header.hobbies;

      // Update section titles
      document.querySelector("#about-me h1").textContent =
        translations.header.aboutMe;
      document.querySelector("#education h1").textContent =
        translations.header.education;
      document.querySelector("#work h1").textContent =
        translations.header.workExperience;
      document.querySelector("#projects h1").textContent =
        translations.header.projects;
      document.querySelector("#skills h1").textContent =
        translations.header.skills;
      document.querySelector("#hobbies h1").textContent =
        translations.header.hobbies;

      // Update content
      document.querySelector(".logo").textContent = translations.name;
      document.querySelector("#about-me .about-text p").textContent =
        translations.aboutMeText;

      // Education
      const educationItems = document.querySelectorAll(".education-item");
      educationItems[0].querySelector("h2").textContent =
        translations.education.education1;
      educationItems[0].querySelector("p").textContent =
        translations.education.education1School;
      educationItems[1].querySelector("h2").textContent =
        translations.education.education2;
      educationItems[1].querySelector("p").textContent =
        translations.education.education2School;

      // Work
      const workItems = document.querySelectorAll(".work-item");
      workItems[0].querySelector("h2").textContent = translations.work.work1;
      workItems[0].querySelector(".company").textContent =
        translations.work.work1Company;
      workItems[0].querySelector(".description").textContent =
        translations.work.work1Description;
      workItems[1].querySelector("h2").textContent = translations.work.work2;
      workItems[1].querySelector(".company").textContent =
        translations.work.work2Company;
      workItems[1].querySelector(".description").textContent =
        translations.work.work2Description;

      // Projects
      const projectItems = document.querySelectorAll(".project-item");
      projectItems[0].querySelector("h2").textContent =
        translations.projects.project1;
      projectItems[0].querySelector(".description").textContent =
        translations.projects.project1Description;
      projectItems[1].querySelector("h2").textContent =
        translations.projects.project2;
      projectItems[1].querySelector(".description").textContent =
        translations.projects.project2Description;
      projectItems[2].querySelector("h2").textContent =
        translations.projects.project3;
      projectItems[2].querySelector(".description").textContent =
        translations.projects.project3Description;
      projectItems[3].querySelector("h2").textContent =
        translations.projects.project4;
      projectItems[3].querySelector(".description").textContent =
        translations.projects.project4Description;

      // Skills
      const skillItems = document.querySelectorAll(".skill-item");
      translations.skills.forEach((skill, index) => {
        skillItems[index].querySelector("p").textContent = skill;
      });

      // Hobbies
      const hobbyItems = document.querySelectorAll(".hobby-item");
      translations.hobbies.forEach((hobby, index) => {
        hobbyItems[index].querySelector("p").textContent = hobby;
      });

      // Cookie consent
      document.getElementById("cookie-consent").childNodes[0].textContent =
        translations.cookieConsent;
      document.getElementById("accept-cookies").textContent =
        translations.acceptCookies;
      document.getElementById("decline-cookies").textContent =
        translations.declineCookies;
    })
    .catch((error) => console.error("Error loading language:", error));
}
