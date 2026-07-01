(() => {
  const measurementId = document.documentElement.dataset.ga4Id;
  const consentGranted = localStorage.getItem("winess_analytics_consent") === "granted";

  if (!consentGranted || !/^G-[A-Z0-9]+$/i.test(measurementId || "")) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
})();
