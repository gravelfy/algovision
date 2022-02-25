"use strict"


class Translator {
    constructor() {
        this._lang = getLanguage() || "en";

  /// do ;

    }
  }

  toggleLangTag() {
    if (document.documentElement.lang !== this._lang) {
      document.documentElement.lang = this._lang;
    }
  }

  getLanguage() {
    var lang = navigator.languages ? navigator.languages[0] : navigator.language;
    
    return lang.substr(0, 2);
  }

  export default Translator;