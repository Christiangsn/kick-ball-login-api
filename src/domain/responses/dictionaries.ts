import { ILanguages } from "@christiangsn/templates_shared";

export namespace DictionariesDomain {
    export type TDictionariesDomainErrors = "invalid_email" 
        | "invalid_date_format"
        | "invalid_password"
        | "not_accepted_terms"
        | "invalid_phone_number"

    export class Dictionary extends ILanguages.LangDictionary<TDictionariesDomainErrors> {
        public readonly dictionaryVariablesExtends: {
            invalid_email: null;
            invalid_date_format: null;
            invalid_password: null;
            not_accepted_terms: null;
            invalid_phone_number: null;
        }
    }
}