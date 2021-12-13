import enUS from "./en-us";
import es from "./es";
import ja from "./ja";
import fr from "./fr";

export default {
  locale: localStorage.getItem("lang") || "es",
  "en-us": enUS,
  es,
  fr,
  ja,
};
