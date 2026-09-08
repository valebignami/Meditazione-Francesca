# Before You React / Prima di reagire - landing page

Pagine statiche, senza backend. Si caricano così come sono su qualsiasi hosting
(il sito di Francesca, Netlify, Vercel, GitHub Pages, una cartella FTP).

## File

| File | Cosa fa |
|---|---|
| `index.html` | Landing in inglese |
| `it.html` | Landing in italiano |
| `listen-en.html` / `listen-it.html` | Pagine di ascolto e download MP3 (non indicizzate) |
| `assets/config.js` | **L'unico file da modificare** per collegare il form e i link |
| `assets/app.js` | Tracking sorgente, campi nascosti, messaggio di ringraziamento |
| `assets/style.css` | Stile, mobile-first |
| `assets/audio/` | Qui vanno i due MP3 (vedi `LEGGIMI.txt`) |
| `google-sheet-script.gs` | Script da incollare nel Google Sheet (riga + email automatica) |

Per un URL evergreen tipo `/free-meditation`, mettere i file in una cartella
con quel nome sul sito: `/free-meditation/` (EN) e `/free-meditation/it.html` (IT).

## Da sapere prima di scegliere

- **Il sito ha gia' un sistema di iscrizioni proprio.** Le pagine di
  francesca-camozzi.it usano uno script (`assets/newsletter-download.js`) che
  salva email, lingua, consenso e pagina di provenienza su Supabase, e in
  `assets/site-config.js` c'e' un campo `brevoEndpoint` ancora vuoto. Prima di
  aggiungere Google Form o un form Brevo separato, vale la pena chiedere a chi
  gestisce il sito se conviene agganciare questa landing a quel sistema
  (come chiede il brief: non aggiungere un secondo sistema se ce n'e' uno).
- **Non esiste una pagina privacy pubblica**: `/privacy/` e `/privacy-policy/`
  rispondono 404. In `config.js` e' impostato `/privacy/` come segnaposto:
  va creata o corretto il link prima di pubblicare.
- **La pagina For Parents esiste**: `https://www.francesca-camozzi.it/for-parents/`.
- Lo stile (Cormorant Garamond + Manrope, fondo salvia, bottoni a pillola,
  colori pervinca / verde / corallo / giallo) e' copiato dal sito attuale.

## Dove finiscono i dati

Il form della pagina invia nome, email, lingua, sorgente, campagna, consenso e
il tag `lead_magnet_meditation` all'indirizzo scritto in `assets/config.js`
(`action`). Finche' quel campo resta con il segnaposto, i dati non vanno da
nessuna parte. Tre opzioni: Google Sheet (consigliata), Brevo, Google Form.

## Collegare a Google Sheet (consigliato, 10 minuti, nessun costo)

Ogni iscrizione diventa una riga del foglio, e lo script manda anche l'email
con il link alla meditazione nella lingua scelta (dall'account Google di Francesca).

1. Con l'account Google di Francesca creare un nuovo Google Sheet, ad esempio
   "Iscrizioni meditazione".
2. Menu **Estensioni > Apps Script**. Cancellare il contenuto dell'editor e
   incollare tutto il file `google-sheet-script.gs`. Salvare (icona dischetto).
3. In cima allo script controllare `LISTEN_URL` (gli indirizzi definitivi delle
   pagine di ascolto) e, se si vuole, i testi delle due email. Con
   `SEND_EMAIL = false` lo script salva solo la riga senza mandare email.
4. Prova: nel menu a tendina in alto scegliere la funzione `test` e premere
   **Esegui**. Alla prima volta Google chiede le autorizzazioni: Rivedi
   autorizzazioni > scegliere l'account > Avanzate > Vai a ... (non sicuro) >
   Consenti. Nel foglio compare una riga di prova e arriva un'email di prova.
5. Pubblicare: **Esegui il deployment > Nuovo deployment**, tipo
   **App web**, "Esegui come: me", "Chi ha accesso: Chiunque". Premere
   Esegui il deployment e copiare l'**URL dell'app web**
   (finisce con `/exec`).
6. Incollare quell'URL in `assets/config.js` alla voce `action`, lasciando
   `mode: "sheet"`. Fatto.

Se in futuro si modifica lo script, serve un nuovo deployment
(Esegui il deployment > Gestisci deployment > matita > Versione: Nuova).
L'URL resta lo stesso.

Limiti di Google: circa 100 email al giorno per un account Gmail normale,
1.500 con Google Workspace. Per volumi maggiori o email piu' curate, passare
a Brevo importando il foglio.

## Alternativa: Brevo (email automatica con newsletter)

1. In Brevo creare gli attributi contatto: `LANGUAGE`, `SOURCE`, `CAMPAIGN`,
   `LEAD_MAGNET`, `OPT_IN` (tutti testo).
2. Creare un form (Contatti > Form) con i campi EMAIL, FIRSTNAME e i 5 attributi
   sopra come campi nascosti. Scegliere "Codice HTML" e copiare l'URL dell'`action`.
3. In `assets/config.js` mettere `mode: "brevo"`, l'`action` di Brevo e i nomi
   campo di Brevo (`EMAIL`, `FIRSTNAME`, `LANGUAGE`, ...).
4. Creare in Brevo un'automazione: quando entra un contatto con
   `LEAD_MAGNET = lead_magnet_meditation`, se `LANGUAGE = language_it` invia
   l'email italiana, altrimenti quella inglese.
5. Double opt-in: attivabile nel form di Brevo. Da decidere con Francesca
   (piu' sicuro per GDPR, un po' piu' di attrito).

## Alternativa: Google Form classico

Creare un Form con 7 risposte brevi, collegarlo a un foglio, ricavare i codici
`entry.xxxx` dal sorgente dell'anteprima e metterli in `fields` con
`mode: "google"`. Non invia email: per questo conviene lo script qui sopra.

## Tracking delle sorgenti (funziona con entrambe le opzioni)

Basta aggiungere parametri all'URL. Ogni iscrizione salva automaticamente:

- `language_en` / `language_it` (dalla pagina usata)
- `source_<valore>` dal parametro `src`
- il nome campagna dal parametro `camp`
- il tag fisso `lead_magnet_meditation`

Esempi di link da usare nei vari canali:

| Canale | Link |
|---|---|
| Bio Instagram | `.../free-meditation/?src=instagram` |
| Story / Reel settembre | `.../free-meditation/?src=instagram&camp=sep2026` |
| Facebook | `.../free-meditation/?src=facebook` |
| Workshop dal vivo (QR) | `.../free-meditation/it.html?src=workshop&camp=milano-15set` |
| Scuola o partner | `.../free-meditation/it.html?src=school&camp=nome-scuola` |
| Volantino | `.../free-meditation/?src=flyer` |

Vale anche `utm_source` / `utm_campaign`. Il cambio lingua conserva i parametri.
Per i QR code: generare un QR per ogni link con un qualsiasi generatore gratuito.

## Consenso e privacy

- La casella di consenso non è pre-spuntata ed è obbligatoria.
- Il testo del consenso e il link all'informativa sono in entrambe le pagine;
  l'URL dell'informativa si imposta in `config.js` (`links.privacy`).
- Far rivedere il testo del consenso a chi ha scritto la privacy policy.

## Prima di pubblicare

- [ ] Inserire i due MP3 in `assets/audio/`
- [ ] Compilare `assets/config.js` (form + link privacy / For Parents / home)
- [ ] Sostituire `assets/cover.svg` con una foto o copertina, se disponibile
- [ ] Provare un'iscrizione di test in entrambe le lingue e controllare che
      arrivino nome, email, lingua e sorgente
