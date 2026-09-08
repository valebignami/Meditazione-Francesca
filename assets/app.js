(function(){
  var C = window.MEDITATION_CONFIG || {};
  var lang = document.documentElement.lang.slice(0,2) === "it" ? "it" : "en";

  /* --- source tracking from the URL ---------------------------------
     Usa link come:  ?src=instagram   ?src=facebook   ?src=workshop
                     ?src=school&camp=scuola-rossi   ?src=flyer&camp=sep2026
     Vale anche utm_source / utm_campaign. Il valore viene ricordato in
     sessionStorage cosi' resta anche se l'utente cambia lingua.        */
  var q = new URLSearchParams(location.search);
  var stored = function(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } };
  var src  = q.get("src")  || q.get("utm_source")   || stored("mm_src")  || "direct";
  var camp = q.get("camp") || q.get("utm_campaign") || stored("mm_camp") || "";
  try{ sessionStorage.setItem("mm_src", src); sessionStorage.setItem("mm_camp", camp); }catch(e){}

  /* keep params on the language switch */
  if(location.search){
    document.querySelectorAll(".lang a").forEach(function(a){
      a.href = a.getAttribute("href") + location.search;
    });
  }

  /* external links from config */
  document.querySelectorAll("[data-link]").forEach(function(a){
    var k = a.getAttribute("data-link"); if(C.links && C.links[k]) a.href = C.links[k];
  });

  var form = document.getElementById("signup");
  if(!form) return;
  var F = C.fields || {};
  form.action = C.action || "#";
  form.method = "POST";
  form.target = "hidden_iframe";
  form.querySelector("[data-f=firstName]").name = F.firstName || "firstname";
  form.querySelector("[data-f=email]").name     = F.email || "email";
  form.querySelector("[data-f=consent]").name   = F.consent || "consent";
  function hidden(name, value){
    var i = document.createElement("input"); i.type="hidden"; i.name=name; i.value=value; form.appendChild(i);
  }
  hidden(F.language || "language", lang === "it" ? "language_it" : "language_en");
  hidden(F.source || "source", "source_" + src);
  hidden(F.campaign || "campaign", camp);
  hidden(F.leadMagnet || "lead_magnet", C.leadMagnetTag || "lead_magnet_meditation");

  /* thank-you state without leaving the page */
  form.addEventListener("submit", function(){
    setTimeout(function(){
      form.classList.add("sent");
      var link = document.getElementById("listen-link");
      if(link && C.listen) link.href = C.listen[lang];
      document.getElementById("thanks").scrollIntoView({behavior:"smooth", block:"start"});
    }, 400);
  });
})();
