export enum TranslationEnum {
  //Sys21M1
  screenSaverIsEnabled = "e.2 Ekraanilukk käivitub kasutaja poolt käsitsi aktiveerituna või automaatselt pärast ettemääratud ajavahemikku",
  screenSaverPasswordProtected = "e.4 Ekraaniluku avamine on võimalik vaid kasutaja autentimisega.",
  needAuthToChangePassword = "c. Autentimisandmeid (nt parooli) muuta saab üksnes selleks volitatud kasutaja.",
  autoLogonIsDisabled = "a. Klientarvutit on võimalik kasutada ainult end nõuetekohaselt autentinud kasutajal.",
  baseObjectsAreAudited = "b. Mistahes tegevuse puhul klientarvutis on võimalik tuvastada tegevuse sooritaja.",
  //Sys223M5
  antivirusEnabled = "a. Kui IT-süsteemi kaitsmiseks kahjurvaraga nakatumise eest ei ole kasutusele võetud samaväärseid või rangemaid meetmeid, on Windows klientarvutis aktiveeritud Microsofti kahjurvaratõrje (nt Windows Defender) komponendid.",
  firewallEnabled = "Tulemüür on aktiveeritud",
  firewallUpToDate = "Tulemüür on ajakohane",
  antivirusUpToDate = "Antivirus on ajakohane",
}

export enum TranslateMeasure {
  //the first value of type = Measure code
  screenSaverIsEnabled = "SYS2.1.M1",
  firewallEnabled = "SYS2.2.3.M5"
}
