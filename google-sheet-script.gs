/*  SCRIPT DA INCOLLARE NEL GOOGLE SHEET  (Estensioni > Apps Script)
    -----------------------------------------------------------------
    Ogni iscrizione dalla landing diventa una riga del foglio e, se vuoi,
    parte subito un'email con il link alla meditazione nella lingua giusta.
    Istruzioni passo passo nel README, sezione "Collegare a Google Sheet".
*/

// ---- Da compilare -----------------------------------------------------
var SEND_EMAIL = true;                       // false = solo riga nel foglio, niente email
var FROM_NAME  = "Francesca Camozzi";
var LISTEN_URL = {
  language_en: "https://www.francesca-camozzi.it/free-meditation/listen-en.html",
  language_it: "https://www.francesca-camozzi.it/free-meditation/listen-it.html"
};
var EMAIL = {
  language_en: {
    subject: "Your meditation: Before You React",
    body: "Hi {name},\n\nhere is your 6-minute pause: {link}\n\nYou can listen online or download the MP3 for personal use. Come back to it whenever the pressure builds.\n\nWarmly,\nFrancesca"
  },
  language_it: {
    subject: "La tua meditazione: Prima di reagire",
    body: "Ciao {name},\n\necco la tua pausa di 6 minuti: {link}\n\nPuoi ascoltarla online o scaricare l'MP3 per uso personale. Torna a lei ogni volta che senti la pressione salire.\n\nUn abbraccio,\nFrancesca"
  }
};
// -----------------------------------------------------------------------

var HEADERS = ["Data", "Nome", "Email", "Lingua", "Sorgente", "Campagna", "Consenso", "Lead magnet", "Email inviata"];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

  var lang = p.language === "language_it" ? "language_it" : "language_en";
  var emailSent = "";
  if (SEND_EMAIL && p.email) {
    try {
      var t = EMAIL[lang];
      MailApp.sendEmail({
        to: String(p.email).trim(),
        name: FROM_NAME,
        subject: t.subject,
        body: t.body.replace("{name}", p.firstName || "").replace("{link}", LISTEN_URL[lang])
      });
      emailSent = "si";
    } catch (err) { emailSent = "errore: " + err; }
  }

  sheet.appendRow([
    new Date(), p.firstName || "", (p.email || "").toLowerCase(), lang,
    p.source || "", p.campaign || "", p.consent === "yes" ? "si" : "no",
    p.leadMagnet || "", emailSent
  ]);
  return ContentService.createTextOutput("ok");
}

/* Test rapido dall'editor: seleziona "test" e premi Esegui */
function test() {
  doPost({ parameter: { firstName: "Prova", email: Session.getActiveUser().getEmail(),
    language: "language_it", source: "source_test", campaign: "test", consent: "yes", leadMagnet: "lead_magnet_meditation" } });
}
