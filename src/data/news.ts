export interface NewsItem {
  id: string;
  title: string;
  perex: string;
  content: string;
  date: string;
  isFeatured?: boolean;
  documents?: { title: string; url: string }[];
}

export const newsItems: NewsItem[] = [
  {
    id: "aktualne-resime",
    title: "Rekonstrukce hlavní silnice",
    perex: "Připravujeme projekt rekonstrukce hlavní průjezdní komunikace, která výrazně zlepší bezpečnost chodců i řidičů.",
    content: "Připravujeme rozsáhlý projekt rekonstrukce hlavní průjezdní komunikace v obci. Součástí projektu bude rozšíření chodníků, nové přechody pro chodce a modernizace veřejného osvětlení. Realizace je plánována na léto 2026.",
    date: "28. 1. 2026",
    isFeatured: true,
    documents: [
      { title: "Studie proveditelnosti.pdf", url: "#" },
      { title: "Harmonogram prací.pdf", url: "#" },
    ],
  },
  {
    id: "komunitni-zahrada",
    title: "Založení komunitní zahrady",
    perex: "Na jaře otevíráme novou komunitní zahradu pro všechny obyvatele Jehnic.",
    content: "Na jaře 2026 otevíráme komunitní zahradu na pozemku za obecním úřadem. Zahrádkáři si budou moci pronajmout vlastní záhon a pěstovat zeleninu, bylinky nebo květiny.",
    date: "15. 1. 2026",
    documents: [
      { title: "Pravidla zahrady.pdf", url: "#" },
    ],
  },
  {
    id: "vanoce-v-jehnicich",
    title: "Vánoce v Jehnicích 2025",
    perex: "Děkujeme všem, kteří přišli na vánoční setkání na náměstí. Bylo nás přes 200!",
    content: "Letošní vánoční setkání překonalo všechna očekávání. Děkujeme všem, kteří přišli, vystupujícím i sponzorům. Těšíme se příští rok!",
    date: "27. 12. 2025",
  },
  {
    id: "nova-lavicka",
    title: "Nové lavičky v parku",
    perex: "Instalovali jsme 6 nových laviček v centrálním parku pro pohodlnější odpočinek.",
    content: "V rámci zlepšování veřejných prostor jsme nainstalovali 6 nových dřevěných laviček v centrálním parku. Lavičky jsou z kvalitního dubového dřeva s litinovou konstrukcí.",
    date: "10. 12. 2025",
  },
  {
    id: "odpady-informace",
    title: "Změna svozu odpadů",
    perex: "Od ledna 2026 dochází ke změně harmonogramu svozu tříděného odpadu.",
    content: "Upozorňujeme občany na změnu harmonogramu svozu tříděného odpadu. Plasty budou sváženy každé liché pondělí, papír každé sudé pondělí.",
    date: "1. 12. 2025",
    documents: [
      { title: "Nový harmonogram 2026.pdf", url: "#" },
    ],
  },
];
