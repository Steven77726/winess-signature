(() => {
  if (document.getElementById("winessCallbackDialog")) return;

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "winess-callback-trigger";
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-controls", "winessCallbackDialog");
  trigger.setAttribute("aria-expanded", "false");
  trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"/></svg><span>Être recontacté</span>';

  const dialog = document.createElement("dialog");
  dialog.id = "winessCallbackDialog";
  dialog.className = "winess-callback-dialog";
  dialog.setAttribute("aria-labelledby", "winessCallbackTitle");
  dialog.setAttribute("aria-describedby", "winessCallbackIntro");
  dialog.innerHTML = `
    <div class="winess-callback-head">
      <h2 id="winessCallbackTitle">Parlons de votre événement</h2>
      <button type="button" class="winess-callback-close" aria-label="Fermer la demande de rappel">×</button>
    </div>
    <p class="winess-callback-intro" id="winessCallbackIntro">Laissez-nous vos coordonnées, notre équipe vous recontacte pour préparer votre projet.</p>
    <form class="winess-callback-form" id="winessCallbackForm">
      <label>Votre prénom *<input name="firstName" autocomplete="given-name" maxlength="80" required autofocus></label>
      <label>Votre téléphone *<input name="phone" type="tel" inputmode="tel" autocomplete="tel" minlength="8" maxlength="30" required></label>
      <label>Votre email (facultatif)<input name="email" type="email" inputmode="email" autocomplete="email" maxlength="254"></label>
      <label hidden aria-hidden="true">Votre site web<input name="_honey" tabindex="-1" autocomplete="off"></label>
      <button type="submit" class="winess-callback-submit">Me faire rappeler</button>
      <p class="winess-callback-privacy">Vos coordonnées servent à traiter votre demande de rappel. <a href="/confidentialite.html" target="_blank" rel="noopener">Politique de confidentialité</a>.</p>
    </form>
    <p class="winess-callback-status" role="status" aria-live="polite" hidden></p>`;

  document.body.append(trigger, dialog);
  const form = dialog.querySelector("form");
  const firstName = form.elements.namedItem("firstName");
  const phone = form.elements.namedItem("phone");
  const submit = form.querySelector('[type="submit"]');
  const status = dialog.querySelector('[role="status"]');
  let submitting = false;

  trigger.addEventListener("click", () => {
    if (typeof dialog.showModal !== "function") {
      window.location.href = "/contact.html";
      return;
    }
    if (dialog.open) return;
    dialog.showModal();
    document.body.classList.add("winess-callback-open");
    trigger.setAttribute("aria-expanded", "true");
  });
  dialog.querySelector(".winess-callback-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.body.classList.remove("winess-callback-open");
    trigger.setAttribute("aria-expanded", "false");
    trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  [firstName, phone].forEach((input) => input.addEventListener("input", () => input.setCustomValidity("")));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting || form.elements.namedItem("_honey").value) return;
    firstName.setCustomValidity(firstName.value.trim() ? "" : "Indiquez votre prénom.");
    const digits = phone.value.replace(/\D/g, "");
    const phoneCharactersValid = /^[+\d\s().-]+$/.test(phone.value.trim());
    phone.setCustomValidity(phoneCharactersValid && digits.length >= 8 && digits.length <= 15 ? "" : "Indiquez un numéro de téléphone valide.");
    if (!form.reportValidity()) return;

    const source = window.location.origin + window.location.pathname;
    const payload = {
      _subject: "Nouvelle demande de rappel WINESS Signature",
      _template: "table",
      _captcha: "false",
      _url: source,
      "Type de demande": "Être recontacté par téléphone",
      "Prénom": firstName.value.trim(),
      "Téléphone": phone.value.trim(),
      "Page de la demande": source
    };
    const email = form.elements.namedItem("email").value.trim();
    if (email) payload.email = email;

    submitting = true;
    submit.disabled = true;
    submit.textContent = "Envoi en cours…";
    form.setAttribute("aria-busy", "true");
    status.hidden = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("https://formsubmit.co/ajax/steven@sabwine.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Demande non confirmée");
      status.classList.remove("is-error");
      status.textContent = "Merci ! Votre demande a bien été envoyée. L’équipe Winess Signature vous recontactera.";
      status.hidden = false;
      form.reset();
      form.hidden = true;
      // Analytics never receives the visitor's contact information.
      try {
        if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { form_id: "winessCallbackForm", lead_type: "rappel" });
      } catch { /* A tracking error must not affect a successful request. */ }
    } catch {
      status.classList.add("is-error");
      status.replaceChildren(document.createTextNode("L’envoi n’a pas abouti. Réessayez ou appelez-nous au "));
      const link = document.createElement("a");
      link.href = "tel:+33173207818";
      link.textContent = "01 73 20 78 18";
      status.append(link, document.createTextNode("."));
      status.hidden = false;
    } finally {
      window.clearTimeout(timeout);
      submitting = false;
      submit.disabled = false;
      submit.textContent = "Me faire rappeler";
      form.removeAttribute("aria-busy");
    }
  });
})();
