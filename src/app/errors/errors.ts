import { BaseError } from "@christiangsn/templates_shared";
import { RootPresentationResponses } from "@christiangsn/templates_shared/build/root/root-server-responses";
import { DictionariesApp } from "./dictionaries";

export namespace ApplicationErrors {
    export class NotAcceptTermsError extends BaseError<DictionariesApp.TDictionariesAppErrors> {
        protected typeResponse = RootPresentationResponses.UNAUTHORIZED;
        protected messageLang: DictionariesApp.TDictionariesAppErrors = "not_accepted_terms";
    }

    export class InvalidGoogleTokenError extends BaseError<DictionariesApp.TDictionariesAppErrors> {
        protected typeResponse = RootPresentationResponses.BAD_REQUEST;
        protected messageLang: DictionariesApp.TDictionariesAppErrors = "invalid_google_token";
    }

    export class ContractTermsNotFoundError extends BaseError<DictionariesApp.TDictionariesAppErrors> {
        protected typeResponse = RootPresentationResponses.NOT_FOUND;
        protected messageLang: DictionariesApp.TDictionariesAppErrors = "contract_terms_not_found";
    }
    
    export class EmailAlreadyExistsError extends BaseError<DictionariesApp.TDictionariesAppErrors> {
        protected typeResponse = RootPresentationResponses.BAD_REQUEST;
        protected messageLang: DictionariesApp.TDictionariesAppErrors = "email_already_exists";
    }

    export class InvalidCredentialsError extends BaseError<DictionariesApp.TDictionariesAppErrors> {
        protected typeResponse = RootPresentationResponses.UNAUTHORIZED;
        protected messageLang: DictionariesApp.TDictionariesAppErrors = "invalid_credentials";
    }
}
