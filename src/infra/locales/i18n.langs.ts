import { ILanguages } from "@christiangsn/templates_shared";
import { I18nLocales } from "@christiangsn/templates_shared/build/locale/i18n"
import { ILangs } from "@domain/contracts/ILangs.contract";

export class i18nLangs implements ILangs {
    public constructor() { }

    public getPhrase(key: string, lang: ILanguages.LanguageValues, params?: Record<string, any>): string {
        return I18nLocales.translate(key, lang, params);
    }
}