import {
  Globe,
  Mail,
  Users,
  Handshake,
  Building,
  Package,
  TreePine,
  Baby,
  Sun,
  LucideIcon,
} from "lucide-react";

// Import images
import imgModerniWeb from "@/assets/achievements/moderni-web.jpg";
import imgElektronickaKomunikace from "@/assets/achievements/elektronicka-komunikace.jpg";
import imgSetkaniSKomunitou from "@/assets/achievements/setkani-s-komunitou.jpg";
import imgVztahySeSousedy from "@/assets/achievements/vztahy-se-sousedy.jpg";
import imgKomunitniCentrum from "@/assets/achievements/komunitni-centrum.jpg";
import imgZbox from "@/assets/achievements/zbox.jpg";
import imgVerejneProstory from "@/assets/achievements/verejne-prostory.jpg";
import imgDetskeHriste from "@/assets/achievements/detske-hriste.jpg";
import imgHlidaniDeti from "@/assets/achievements/hlidani-deti.jpg";

export interface Achievement {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  fullDescription: string;
  heroImage: string;
  gallery: string[];
}

export const achievements: Achievement[] = [
  {
    id: "moderni-web",
    icon: Globe,
    title: "Moderní web a správa Facebooku",
    description:
      "Vytvořili jsme přehledné webové stránky a aktivně spravujeme facebookový profil pro lepší informovanost občanů.",
    heroImage: imgModerniWeb,
    gallery: [imgModerniWeb],
    fullDescription: `
      Komunikace s občany je pro nás prioritou. Proto jsme vytvořili moderní webové stránky, 
      které přinášejí aktuální informace o dění v obci přehlednou a přístupnou formou.

      Současně aktivně spravujeme facebookový profil, kde sdílíme novinky, pozvánky na akce 
      a reagujeme na dotazy a podněty občanů. Díky tomu jsme blíže k vám a můžeme rychleji 
      reagovat na vaše potřeby.

      Věříme, že transparentní komunikace je základem důvěry mezi vedením obce a jejími obyvateli.
    `,
  },
  {
    id: "elektronicka-komunikace",
    icon: Mail,
    title: "Elektronická komunikace s občany",
    description:
      "Zavedli jsme pravidelný zpravodaj a e-mailovou komunikaci, aby každý věděl o dění v obci.",
    heroImage: imgElektronickaKomunikace,
    gallery: [imgElektronickaKomunikace],
    fullDescription: `
      V dnešní době je důležité, aby informace proudily rychle a efektivně. Proto jsme zavedli 
      pravidelný elektronický zpravodaj, který dostáváte přímo do vaší e-mailové schránky.

      Zpravodaj obsahuje přehled nejdůležitějších událostí, plánované akce, změny v obci 
      a další užitečné informace. Díky tomu už nikdy nezmeškáte důležitou zprávu.

      E-mailová komunikace nám také umožňuje rychleji odpovídat na vaše dotazy a podněty.
    `,
  },
  {
    id: "setkani-s-komunitou",
    icon: Users,
    title: "Pravidelná setkání s komunitou",
    description:
      "Pořádáme pravidelná setkání, kde mohou občané sdílet své názory a podněty.",
    heroImage: imgSetkaniSKomunitou,
    gallery: [imgSetkaniSKomunitou],
    fullDescription: `
      Věříme, že nejlepší rozhodnutí vznikají společnou diskuzí. Proto pořádáme pravidelná 
      setkání s občany, kde máte možnost přímo se zeptat, navrhnout zlepšení nebo sdílet 
      své zkušenosti.

      Tato setkání jsou otevřená všem a probíhají v přátelské atmosféře. Každý hlas je pro 
      nás důležitý a snažíme se naslouchat všem názorům.

      Díky těmto setkáním jsme získali mnoho cenných podnětů, které jsme následně realizovali.
    `,
  },
  {
    id: "vztahy-se-sousedy",
    icon: Handshake,
    title: "Budování vztahů se sousedy",
    description:
      "Navázali jsme spolupráci s okolními obcemi a posilujeme sousedské vztahy.",
    heroImage: imgVztahySeSousedy,
    gallery: [imgVztahySeSousedy],
    fullDescription: `
      Jehnice nejsou osamocený ostrov. Jsme součástí širšího regionu a spolupráce s okolními 
      obcemi nám přináší mnoho výhod. Proto jsme aktivně navázali kontakty s vedením 
      sousedních obcí.

      Společně řešíme problémy, které přesahují hranice jednotlivých obcí, sdílíme zkušenosti 
      a inspirujeme se navzájem dobrými příklady.

      Dobré sousedské vztahy jsou základem příjemného života v našem kraji.
    `,
  },
  {
    id: "komunitni-centrum",
    icon: Building,
    title: "Komunitní centrum",
    description:
      "Podpořili jsme vznik prostoru pro setkávání, vzdělávání a kulturní akce.",
    heroImage: imgKomunitniCentrum,
    gallery: [imgKomunitniCentrum],
    fullDescription: `
      Každá komunita potřebuje místo, kde se mohou lidé setkávat, vzdělávat a bavit. 
      Proto jsme podpořili vznik komunitního centra, které slouží všem věkovým skupinám.

      V centru probíhají vzdělávací kurzy, kulturní akce, setkání spolků a mnoho dalších 
      aktivit. Je to místo, kde vznikají nová přátelství a posilují se vazby v komunitě.

      Komunitní centrum je otevřené všem a vítáme každý nápad na jeho využití.
    `,
  },
  {
    id: "zbox",
    icon: Package,
    title: "Z-box v Jehnicích",
    description:
      "Zajistili jsme instalaci výdejního boxu pro pohodlnější doručování zásilek.",
    heroImage: imgZbox,
    gallery: [imgZbox],
    fullDescription: `
      Nakupování online je dnes běžnou součástí života. Proto jsme se zasadili o instalaci 
      Z-boxu přímo v Jehnicích, aby občané nemuseli pro zásilky daleko.

      Výdejní box je přístupný 24 hodin denně, 7 dní v týdnu, takže si můžete vyzvednout 
      zásilku kdykoliv se vám to hodí. Už žádné čekání na kurýra nebo cesty na vzdálenou poštu.

      Tato služba zvyšuje komfort života v naší obci a šetří váš čas.
    `,
  },
  {
    id: "verejne-prostory",
    icon: TreePine,
    title: "Zlepšení veřejných prostor",
    description:
      "Iniciovali jsme údržbu zeleně a úpravy veřejných prostranství pro příjemnější prostředí.",
    heroImage: imgVerejneProstory,
    gallery: [imgVerejneProstory],
    fullDescription: `
      Příjemné prostředí zvyšuje kvalitu života. Proto jsme iniciovali pravidelnou údržbu 
      veřejné zeleně a úpravy veřejných prostranství.

      Vysadili jsme nové stromy, opravili lavičky, zlepšili osvětlení a dbáme na čistotu 
      veřejných prostor. Chceme, aby se v Jehnicích dobře žilo a každý se tu cítil jako doma.

      Péče o veřejný prostor je společnou odpovědností a děkujeme všem, kteří se podílejí 
      na jeho zkrášlování.
    `,
  },
  {
    id: "detske-hriste",
    icon: Baby,
    title: "Dětské hřiště",
    description:
      "Přispěli jsme k vybudování bezpečného a moderního hřiště pro nejmenší obyvatele.",
    heroImage: imgDetskeHriste,
    gallery: [imgDetskeHriste],
    fullDescription: `
      Děti jsou naší budoucností a zaslouží si bezpečné a podnětné prostředí pro hru. 
      Proto jsme přispěli k vybudování moderního dětského hřiště.

      Hřiště splňuje všechny bezpečnostní normy a nabízí různé herní prvky pro děti 
      různých věkových skupin. Je to místo, kde děti rozvíjejí svou kreativitu, fyzickou 
      zdatnost a navazují přátelství.

      Rodiny s dětmi oceňují tuto investici do kvality života v naší obci.
    `,
  },
  {
    id: "hlidani-deti",
    icon: Sun,
    title: "Hlídání dětí o prázdninách",
    description:
      "Pomohli jsme zajistit letní hlídání dětí, aby rodiče mohli v klidu pracovat.",
    heroImage: imgHlidaniDeti,
    gallery: [imgHlidaniDeti],
    fullDescription: `
      Prázdniny jsou pro děti úžasným časem, ale pro pracující rodiče mohou představovat 
      logistický problém. Proto jsme pomohli zajistit organizované hlídání dětí během 
      letních prázdnin.

      Program nabízí dětem zábavu, výlety a aktivity pod dohledem zkušených vedoucích. 
      Rodiče tak mohou v klidu pracovat s vědomím, že jejich děti jsou v bezpečí a dobře 
      se baví.

      Tato služba je příkladem toho, jak může obec aktivně podporovat rodiny.
    `,
  },
];

export const getAchievementById = (id: string): Achievement | undefined => {
  return achievements.find((a) => a.id === id);
};
