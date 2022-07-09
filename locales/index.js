//import libraries
import i18n from "i18n-js";
import * as Localization from "expo-localization";

//tramsaltion
import en from "./en.json";
import ar from "./ar.json";
import fr from "./fr.json";
//binding
i18n.translations = {
  en,
  ar,
  fr,
};
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export function t(name) {
  return i18n.t(name);
}
export const isRtl = Localization.isRTL;
