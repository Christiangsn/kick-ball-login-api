import { ILanguages } from "@christiangsn/templates_shared";

export namespace DictionariesApp {
    export type TDictionariesAppErrors = "not_accepted_terms" | 
        "invalid_google_token" | 
        "contract_terms_not_found" | 
        "email_already_exists" |
        "invalid_credentials";

    export class Dictionary extends ILanguages.LangDictionary<TDictionariesAppErrors> {
        public readonly dictionaryVariablesExtends: {
            not_accepted_terms: null;
            invalid_google_token: null;
            contract_terms_not_found: null;
            email_already_exists: null;
            invalid_credentials: null;
        }
    }
}
