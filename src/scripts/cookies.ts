import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { path } from "../data/site";

export const initCookies = () =>
  CookieConsent.run({
    hideFromBots: false,
    guiOptions: {
      consentModal: {
        layout: "bar",
        position: "bottom",
        equalWeightButtons: false,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
      },
    },
    categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {
      autoClear: {
        cookies: [{ name: /^(_ga|_gid|_gat)/ }],
      },
    },
  },
  language: {
    default: "it",
    translations: {
      it: {
        consentModal: {
          title: "Cookie di questo sito",
          description:
            "I cookie necessari fanno funzionare il sito. Al momento non sono attivi strumenti di misurazione. Puoi aggiornare le tue preferenze in qualsiasi momento.",
          acceptAllBtn: "Accetta tutto",
          acceptNecessaryBtn: "Solo necessari",
          showPreferencesBtn: "Personalizza",
          footer:
            `<a href="${path("/privacy")}">Privacy</a> · <a href="${path("/cookie")}">Cookie</a>`,
        },
        preferencesModal: {
          title: "Preferenze cookie",
          acceptAllBtn: "Accetta tutto",
          acceptNecessaryBtn: "Solo necessari",
          savePreferencesBtn: "Salva",
          closeIconLabel: "Chiudi",
          sections: [
            {
              title: "Come usiamo i cookie",
              description:
                "Le preferenze vengono salvate per ricordare la tua scelta. Al momento il sito non utilizza strumenti di misurazione.",
            },
            {
              title: "Necessari",
              description:
                "Servono al funzionamento del sito e a ricordare la tua scelta. Non si possono disattivare.",
              linkedCategory: "necessary",
            },
            {
              title: "Misurazione",
              description:
                "Questa categoria è predisposta, ma al momento non è collegato alcuno strumento di misurazione.",
              linkedCategory: "analytics",
            },
            {
              title: "Di più",
              description:
                `Dettagli in <a href="${path("/privacy")}">Privacy</a> e <a href="${path("/cookie")}">Cookie policy</a>.`,
            },
          ],
        },
      },
    },
  },
});
