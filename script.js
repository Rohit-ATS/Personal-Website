const noteContent = {
  approval: {
    title: "The approval button should be the last thing you build",
    body: "Safe AI systems should not ask a person to approve an explanation before there is evidence. For reversible changes, the more useful order is propose, test in a safe environment, verify the rollback, then present a human with the proof. The button is no longer a request for blind trust; it is the final step in an observable process."
  },
  graph: {
    title: "A dependency graph is a question-answering machine",
    body: "During an incident, a package list is only a starting point. The questions that matter are relational: who depends on it, how far does the exposure travel, and which versions actually resolve to the affected release? Modeling the ecosystem as a graph makes those questions practical to answer when time is short."
  },
  cache: {
    title: "Cache the meaning, keep the identity",
    body: "Exact strings make reliable identifiers, but people rarely repeat intent word for word. A semantic cache adds an understanding layer through embeddings while an exact hash retains stable storage and invalidation behavior. The useful architecture does both: it recognizes similarity without abandoning clear guarantees."
  }
};

document.querySelectorAll(".experience-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const row = toggle.closest(".experience-row");
    const detail = row.querySelector(".experience-detail");
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".experience-toggle[aria-expanded='true']").forEach((openToggle) => {
      if (openToggle !== toggle) {
        openToggle.setAttribute("aria-expanded", "false");
        openToggle.closest(".experience-row").classList.remove("is-open");
        openToggle.closest(".experience-row").querySelector(".experience-detail").hidden = true;
      }
    });

    toggle.setAttribute("aria-expanded", String(!isOpen));
    row.classList.toggle("is-open", !isOpen);
    detail.hidden = isOpen;
  });
});

const dialog = document.querySelector(".note-dialog");
const dialogTitle = dialog.querySelector("h2");
const dialogBody = dialog.querySelector(".dialog-body");

document.querySelectorAll(".open-note").forEach((button) => {
  button.addEventListener("click", () => {
    const note = noteContent[button.dataset.note];
    dialogTitle.textContent = note.title;
    dialogBody.textContent = note.body;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("reduced-effects");
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".section, .work-card, .experience-row").forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}
