import { ILanguages } from "@christiangsn/templates_shared";

export interface ILangs {
    getPhrase(key: string, lang: ILanguages.LanguageValues, params?: Record<string, any>): string;
}