/* ============================================================
   CONFIGURAZIONE - l'unico file da toccare per collegare il form
   ============================================================ */
window.MEDITATION_CONFIG = {

  /* DOVE FINISCONO LE ISCRIZIONI
     ----------------------------
     mode "sheet"  = Google Sheet (consigliato, il piu' semplice). Segui il
                     README, sezione "Collegare a Google Sheet": incolli lo
                     script, pubblichi, e metti qui sotto l'URL che ottieni.
     mode "brevo"  = form Brevo (email automatica in lingua). Metti l'URL
                     dell'action del form Brevo e i nomi campo EMAIL, FIRSTNAME...
     mode "google" = Google Form classico (campi entry.xxxx).
  */
  mode: "sheet",

  action: "INCOLLA_QUI_URL_DELLO_SCRIPT",

  /* Nomi dei campi inviati. Con mode "sheet" lasciali cosi'.
     Brevo:  FIRSTNAME, EMAIL, LANGUAGE, SOURCE, CAMPAIGN, OPT_IN, LEAD_MAGNET
     Google Form: entry.1234567 ecc. */
  fields: {
    firstName: "firstName",
    email:     "email",
    language:  "language",
    source:    "source",
    campaign:  "campaign",
    consent:   "consent",
    leadMagnet:"leadMagnet"
  },

  leadMagnetTag: "lead_magnet_meditation",

  /* Pagine di ascolto (relative o assolute) */
  listen: { en: "listen-en.html", it: "listen-it.html" },

  /* Link esterni del sito di Francesca */
  links: {
    privacy:    "https://www.francesca-camozzi.it/privacy/",
    forParents: "https://www.francesca-camozzi.it/for-parents/",
    home:       "https://www.francesca-camozzi.it"
  }
};
