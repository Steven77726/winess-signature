(() => {
  const endpoint = "https://formsubmit.co/ajax/steven@sabwine.com";
  const successMessage = "Votre demande a bien été envoyée. Nous vous recontacterons rapidement.";
  const errorMessage = "Une erreur est survenue. Vous pouvez nous contacter directement à steven@sabwine.com.";
  const fieldLabels = {
    lastName: "Nom",
    firstName: "Prénom",
    phone: "Téléphone",
    email: "Email",
    eventType: "Type d'événement",
    date: "Date de l'événement",
    city: "Ville de l'événement",
    guestCount: "Nombre d'invités",
    formula: "Formule choisie",
    message: "Commentaire"
  };

  function valueFor(form, name) {
    return form.elements.namedItem(name)?.value.trim() || "Non renseigné";
  }

  function setStatus(status, message, isError) {
    status.textContent = message;
    status.hidden = false;
    status.classList.add("show");
    status.classList.toggle("is-error", isError);
    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function submitQuote(form) {
    const status = form.querySelector("[data-quote-status]") ||
      document.querySelector(`[data-quote-status-for="${form.id}"]`);
    const button = form.querySelector('[type="submit"]');
    const buttonLabel = button.textContent;
    const payload = {
      _subject: "Nouvelle demande de devis WINESS Signature",
      _template: "table",
      _captcha: "false"
    };

    Object.entries(fieldLabels).forEach(([name, label]) => {
      payload[label] = valueFor(form, name);
    });
    payload.email = valueFor(form, "email");

    button.disabled = true;
    button.textContent = "Envoi en cours...";
    if (status) {
      status.hidden = true;
      status.classList.remove("show", "is-error");
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error(result.message || "Envoi refusé");
      }

      if (status) setStatus(status, successMessage, false);
      if (typeof window.gtag === "function") {
        window.gtag("event", "devis_submit", {
          form_id: form.id,
          event_category: "devis"
        });
      }
      form.reset();
    } catch (error) {
      console.error("Échec de l'envoi du devis :", error);
      if (status) setStatus(status, errorMessage, true);
    } finally {
      button.disabled = false;
      button.textContent = buttonLabel;
    }
  }

  document.querySelectorAll("[data-quote-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.reportValidity()) submitQuote(form);
    });
  });
})();
