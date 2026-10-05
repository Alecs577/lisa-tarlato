export const site = {
  name: "Lisa Tarlato",
  teacher: "Lisa Tarlato",
  tagline: "Yoga e trattamenti a Cadro",
  title: "Lisa Tarlato — Hatha yoga e trattamenti a Cadro",
  description:
    "Uno spazio raccolto a Cadro per praticare Hatha yoga o ricevere un trattamento. Scopri le proposte e trova quella più adatta al tuo momento.",
  email: "ciao@lisatarlato.ch",
  instagramHandle: "lisa.tarlato",
  instagramUrl: "https://www.instagram.com/lisa.tarlato/",
  whatsappNumber: "41798698081",
  whatsappMessage: "Ciao Lisa, vorrei informazioni sulle tue proposte e sulla disponibilità degli appuntamenti.",
  address: "Via alla Cava 13",
  city: "6965 Cadro",
  mapsUrl: "https://maps.google.com/?q=Via+alla+Cava+13,+6965+Cadro",
  stripeNote: "Il pagamento online con Stripe verrà attivato in pubblicazione.",
  currency: "CHF",
};

export const whatsappHref = (message = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

/** Root-relative path that works locally and on GitHub Pages (`/lisa-tarlato/...`). */
export const path = (to = "/") => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (/^(https?:|mailto:)/.test(to)) return to;
  const hashAt = to.indexOf("#");
  const hash = hashAt >= 0 ? to.slice(hashAt) : "";
  const file = (hashAt >= 0 ? to.slice(0, hashAt) : to).replace(/^\//, "");
  if (!file) return `${base}/${hash}`;
  const isAsset = /\.[a-z0-9]+$/i.test(file);
  return `${base}/${file}${isAsset ? "" : "/"}${hash}`;
};

export const nav = [
  { href: path("/#chi-sono"), label: "Chi sono" },
  { href: path("/#percorsi"), label: "Yoga e trattamenti" },
  { href: path("/#pratica"), label: "Lo studio" },
  { href: path("/#galleria"), label: "Galleria" },
  { href: path("/#contatti"), label: "Contatti" },
];

export const pillars = [
  {
    num: "01",
    name: "Hatha yoga",
    text: "Hatha yoga in versione individuale o in piccoli gruppi di massimo cinque persone. Una pratica guidata, con spazio per seguire il proprio ritmo.",
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
    alt: "Lezione di Hatha yoga",
  },
  {
    num: "02",
    name: "Trattamenti",
    text: "Massaggio classico o drenante, riflessologia plantare secondo il metodo Hanne Marquardt e linfodrenaggio secondo il metodo Dr. Vodder.",
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    alt: "Trattamento del corpo in studio",
  },
  {
    num: "03",
    name: "In studio",
    text: "Lo studio ti aspetta in Via alla Cava 13, a Cadro. Scrivimi per conoscere gli orari e concordare il tuo appuntamento.",
    src: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80",
    alt: "Pausa dopo la pratica",
  },
] as const;

const yogaImg = {
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80",
  imageAlt: "Lezione di Hatha yoga",
  extraImages: [
    {
      src: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=900&q=80",
      alt: "Posizione yoga, pratica lenta",
    },
    {
      src: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80",
      alt: "Pratica all'aperto",
    },
  ],
};

const massageImg = {
  image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=80",
  imageAlt: "Trattamento del corpo",
  extraImages: [
    {
      src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
      alt: "Massaggio, gesto lento",
    },
    {
      src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
      alt: "Cura delle mani",
    },
  ],
};

export const groups = [
  {
    id: "yoga",
    name: "Hatha yoga",
    text: "Lezioni individuali o in gruppi raccolti, con un massimo di cinque partecipanti. Scegli una singola lezione o un pacchetto a tariffa agevolata.",
  },
  {
    id: "massaggi",
    name: "Massaggi e trattamenti",
    text: "Massaggi e trattamenti con durata e tariffa indicate per ogni proposta. I prezzi in evidenza sono quelli attuali; le tariffe precedenti sono barrate.",
  },
] as const;

export const packages = [
  {
    slug: "yoga-ind-1",
    group: "yoga",
    subgroup: "Lezione individuale",
    short: "1 lezione",
    name: "Lezione individuale",
    sessions: "1 lezione",
    duration: "60 min",
    priceOld: "90",
    price: "72",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Un’ora di Hatha yoga individuale, pensata insieme a partire dalla tua esperienza e da come arrivi alla pratica. Respiro, movimento e pause seguono il tuo ritmo.",
    includes: [
      "60 minuti di Hatha yoga individuale",
      "Una pratica definita in base alla tua esperienza",
      "Tempo per domande e indicazioni individuali",
      "Studio in Via alla Cava 13, Cadro",
    ],
    ...yogaImg,
    detailImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Spazio tranquillo per una lezione individuale di yoga",
  },
  {
    slug: "yoga-ind-5",
    group: "yoga",
    subgroup: "Lezione individuale",
    short: "Pacchetto 5 lezioni",
    name: "Pacchetto 5 lezioni individuali",
    sessions: "5 × 60 min",
    duration: "60 min a lezione",
    priceOld: "450",
    price: "300",
    featured: true,
    place: "Via alla Cava 13, Cadro",
    text: "Cinque incontri individuali per costruire una pratica con continuità, mantenendo l’attenzione su ciò che ti è utile, lezione dopo lezione.",
    includes: [
      "Cinque lezioni individuali da 60 minuti",
      "Un percorso seguito con attenzione individuale",
      "Tariffa pacchetto rispetto alle lezioni singole",
    ],
    ...yogaImg,
    detailImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Pratica individuale di yoga in un ambiente raccolto",
  },
  {
    slug: "yoga-ind-8",
    group: "yoga",
    subgroup: "Lezione individuale",
    short: "Pacchetto 8 lezioni",
    name: "Pacchetto 8 lezioni individuali",
    sessions: "8 × 60 min",
    duration: "60 min a lezione",
    priceOld: "720",
    price: "480",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Otto lezioni individuali per esplorare la pratica con calma e darle spazio nella tua routine, senza fretta di arrivare a un traguardo.",
    includes: [
      "Otto lezioni individuali da 60 minuti",
      "Un percorso con attenzione dedicata",
      "Studio a Cadro",
    ],
    ...yogaImg,
    detailImage: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Pratica di yoga individuale, con spazio per muoversi con calma",
  },
  {
    slug: "yoga-grp-1",
    group: "yoga",
    subgroup: "Lezione di gruppo (max. 5)",
    short: "1 lezione",
    name: "Lezione di gruppo",
    sessions: "1 lezione · max 5",
    duration: "60 min",
    priceOld: "23",
    price: "19",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Una lezione di Hatha yoga da condividere con un gruppo di massimo cinque persone: un contesto raccolto per praticare insieme.",
    includes: [
      "60 minuti di pratica condivisa",
      "Gruppo massimo di 5 persone",
      "Studio in Via alla Cava 13, Cadro",
    ],
    ...yogaImg,
    detailImage: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Lezione di yoga in un piccolo gruppo",
  },
  {
    slug: "yoga-grp-4",
    group: "yoga",
    subgroup: "Lezione di gruppo (max. 5)",
    short: "Pacchetto 4 lezioni",
    name: "Pacchetto 4 lezioni di gruppo",
    sessions: "4 × 60 min · max 5",
    duration: "60 min a lezione",
    priceOld: "92",
    price: "80",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Quattro lezioni di gruppo per conoscere la pratica e trovare il tuo ritmo, con la tariffa agevolata del pacchetto.",
    includes: [
      "Quattro lezioni da 60 minuti",
      "Gruppo massimo di 5 persone",
      "Tariffa pacchetto rispetto alle lezioni singole",
    ],
    ...yogaImg,
    detailImage: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Un momento di pratica condivisa in piccolo gruppo",
  },
  {
    slug: "yoga-grp-8",
    group: "yoga",
    subgroup: "Lezione di gruppo (max. 5)",
    short: "Pacchetto 8 lezioni",
    name: "Pacchetto 8 lezioni di gruppo",
    sessions: "8 × 60 min · max 5",
    duration: "60 min a lezione",
    priceOld: "184",
    price: "160",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Otto lezioni in piccolo gruppo per dare continuità alla pratica, con un massimo di cinque partecipanti e la tariffa agevolata del pacchetto.",
    includes: [
      "Otto lezioni da 60 minuti",
      "Gruppo massimo di 5 persone",
      "Studio a Cadro",
    ],
    ...yogaImg,
    detailImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Lezione di Hatha yoga in uno spazio luminoso",
  },
  {
    slug: "massaggio-30",
    group: "massaggi",
    subgroup: "Massaggio drenante / classico",
    short: "30 min",
    name: "Massaggio drenante / classico · 30 min",
    sessions: "1 trattamento",
    duration: "30 min",
    priceOld: "60",
    price: "48",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Un trattamento di 30 minuti, classico o drenante. La modalità si concorda con Lisa prima dell’appuntamento.",
    includes: [
      "30 minuti di trattamento",
      "Massaggio drenante o classico",
      "Studio in Via alla Cava 13, Cadro",
    ],
    ...massageImg,
    detailImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Trattamento manuale in ambiente rilassante",
  },
  {
    slug: "massaggio-100",
    group: "massaggi",
    subgroup: "Massaggio drenante / classico",
    short: "100 min",
    name: "Massaggio drenante / classico · 100 min",
    sessions: "1 trattamento",
    duration: "100 min",
    priceOld: "100",
    price: "80",
    featured: true,
    place: "Via alla Cava 13, Cadro",
    text: "Cento minuti per dedicare tempo al massaggio classico o drenante. La modalità viene concordata insieme prima del trattamento.",
    includes: [
      "100 minuti di trattamento",
      "Massaggio drenante o classico",
      "Studio a Cadro",
    ],
    ...massageImg,
    detailImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Massaggio distensivo in studio",
  },
  {
    slug: "riflessologia",
    group: "massaggi",
    subgroup: "Riflessologia plantare",
    short: "Metodo H. Marquardt",
    name: "Riflessologia plantare",
    sessions: "1 trattamento",
    duration: "60 min",
    priceOld: "100",
    price: "80",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Un trattamento di riflessologia plantare secondo il metodo Hanne Marquardt, della durata di 60 minuti.",
    includes: [
      "60 minuti di trattamento",
      "Metodo H. Marquardt",
      "Studio a Cadro",
    ],
    ...massageImg,
    detailImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Trattamento di riflessologia plantare",
  },
  {
    slug: "linf-inferiori",
    group: "massaggi",
    subgroup: "Linfodrenaggio metodo Dr. Vodder",
    short: "Arti inferiori",
    name: "Linfodrenaggio · arti inferiori",
    sessions: "1 trattamento",
    duration: "60 min",
    priceOld: "80",
    price: "64",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Un trattamento di linfodrenaggio secondo il metodo Dr. Vodder, dedicato agli arti inferiori.",
    includes: ["60 minuti", "Metodo Dr. Vodder", "Arti inferiori"],
    ...massageImg,
    detailImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Trattamento manuale dedicato agli arti inferiori",
  },
  {
    slug: "linf-superiori",
    group: "massaggi",
    subgroup: "Linfodrenaggio metodo Dr. Vodder",
    short: "Arti superiori",
    name: "Linfodrenaggio · arti superiori",
    sessions: "1 trattamento",
    duration: "45 min",
    priceOld: "70",
    price: "56",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Un trattamento di linfodrenaggio secondo il metodo Dr. Vodder, dedicato agli arti superiori.",
    includes: ["45 minuti", "Metodo Dr. Vodder", "Arti superiori"],
    ...massageImg,
    detailImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Trattamento manuale dedicato agli arti superiori",
  },
  {
    slug: "linf-addome",
    group: "massaggi",
    subgroup: "Linfodrenaggio metodo Dr. Vodder",
    short: "Addome",
    name: "Linfodrenaggio · addome",
    sessions: "1 trattamento",
    duration: "40 min",
    priceOld: "70",
    price: "56",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Un trattamento di linfodrenaggio secondo il metodo Dr. Vodder, dedicato all’addome.",
    includes: ["40 minuti", "Metodo Dr. Vodder", "Addome"],
    ...massageImg,
    detailImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Ambiente dedicato al trattamento e al rilassamento",
  },
  {
    slug: "linf-viso",
    group: "massaggi",
    subgroup: "Linfodrenaggio metodo Dr. Vodder",
    short: "Viso",
    name: "Linfodrenaggio · viso",
    sessions: "1 trattamento",
    duration: "50 min",
    priceOld: "80",
    price: "64",
    featured: false,
    place: "Via alla Cava 13, Cadro",
    text: "Un trattamento di linfodrenaggio secondo il metodo Dr. Vodder, dedicato al viso.",
    includes: ["50 minuti", "Metodo Dr. Vodder", "Viso"],
    ...massageImg,
    detailImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1600&q=85",
    detailImageAlt: "Trattamento delicato dedicato al viso",
  },
] as const;

export const listino = groups.map((group) => {
  const items = packages.filter((item) => item.group === group.id);
  const subgroupNames = [...new Set(items.map((item) => item.subgroup))];
  return {
    ...group,
    sections: subgroupNames.map((subgroup) => ({
      subgroup,
      items: items.filter((item) => item.subgroup === subgroup),
    })),
  };
});

export const packageNarratives: Record<string, { intro: string; idealFor: string }> = {
  "yoga-ind-1": {
    intro: "Uno spazio individuale per avvicinarti all’Hatha yoga o riprendere la pratica con tranquillità. La lezione prende forma a partire dalla tua esperienza e dal tempo che hai a disposizione.",
    idealFor: "Adatta a chi desidera un primo incontro, vuole riprendere dopo una pausa o preferisce praticare con attenzione dedicata.",
  },
  "yoga-ind-5": {
    intro: "Cinque incontri individuali da 60 minuti per portare continuità nella pratica, con una guida attenta e un ritmo concordato insieme.",
    idealFor: "Per chi desidera riservare alla pratica uno spazio regolare e scegliere la tariffa agevolata del pacchetto.",
  },
  "yoga-ind-8": {
    intro: "Otto incontri individuali da 60 minuti per approfondire la pratica nel tempo, con attenzione dedicata e senza dover seguire il ritmo di un gruppo.",
    idealFor: "Per chi ha deciso di dedicare con regolarità del tempo allo yoga e desidera approfittare della tariffa pacchetto.",
  },
  "yoga-grp-1": {
    intro: "Un’ora di Hatha yoga in un gruppo di massimo cinque persone. La pratica è condivisa e guidata, in un ambiente raccolto.",
    idealFor: "Per chi desidera conoscere l’Hatha yoga e praticare in compagnia, con un numero contenuto di partecipanti.",
  },
  "yoga-grp-4": {
    intro: "Quattro incontri di Hatha yoga da 60 minuti in un gruppo di massimo cinque persone, con una tariffa agevolata rispetto alle lezioni singole.",
    idealFor: "Per chi vuole iniziare con un piccolo ciclo di lezioni e scoprire come si trova nella pratica di gruppo.",
  },
  "yoga-grp-8": {
    intro: "Otto incontri di Hatha yoga da 60 minuti in un gruppo di massimo cinque persone, per dare continuità alla pratica con una tariffa dedicata.",
    idealFor: "Per chi preferisce praticare in gruppo e desidera riservare con regolarità del tempo allo yoga.",
  },
  "massaggio-30": {
    intro: "Una pausa di 30 minuti con massaggio classico o drenante. La modalità viene concordata con Lisa prima dell’appuntamento.",
    idealFor: "Per chi ha a disposizione poco tempo o desidera concentrarsi su una zona specifica.",
  },
  "massaggio-100": {
    intro: "Un trattamento di 100 minuti con massaggio classico o drenante: più tempo per vivere la seduta con calma. La modalità si sceglie insieme prima di iniziare.",
    idealFor: "Per chi desidera riservare più tempo al trattamento e scegliere insieme la modalità.",
  },
  riflessologia: {
    intro: "Una seduta di 60 minuti dedicata ai piedi, secondo il metodo di riflessologia plantare Hanne Marquardt.",
    idealFor: "Per chi desidera conoscere la riflessologia plantare e dedicare un momento di attenzione ai piedi.",
  },
  "linf-inferiori": {
    intro: "Una seduta di 60 minuti dedicata agli arti inferiori, eseguita secondo il metodo di linfodrenaggio Dr. Vodder.",
    idealFor: "Se hai dubbi o indicazioni specifiche da considerare, scrivi a Lisa prima di prenotare.",
  },
  "linf-superiori": {
    intro: "Una seduta di 45 minuti dedicata agli arti superiori, eseguita secondo il metodo di linfodrenaggio Dr. Vodder.",
    idealFor: "Se hai dubbi o indicazioni specifiche da considerare, scrivi a Lisa prima di prenotare.",
  },
  "linf-addome": {
    intro: "Una seduta di 40 minuti dedicata all’addome, eseguita secondo il metodo di linfodrenaggio Dr. Vodder.",
    idealFor: "Se hai dubbi o indicazioni specifiche da considerare, scrivi a Lisa prima di prenotare.",
  },
  "linf-viso": {
    intro: "Una seduta di 50 minuti dedicata al viso, eseguita secondo il metodo di linfodrenaggio Dr. Vodder.",
    idealFor: "Se hai dubbi o indicazioni specifiche da considerare, scrivi a Lisa prima di prenotare.",
  },
};

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80",
    alt: "Lezione di Hatha yoga",
    class: "col-span-2 row-span-2 md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
    alt: "Trattamento in studio",
  },
  {
    src: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80",
    alt: "Pausa dopo la pratica",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
    alt: "Massaggio",
  },
  {
    src: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=900&q=80",
    alt: "Pratica in luce naturale",
  },
];

export const instagramPosts = [
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=700&q=80",
];
