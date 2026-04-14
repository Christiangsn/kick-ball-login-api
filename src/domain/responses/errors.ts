import { BaseError, RootPresentationResponses } from "@christiangsn/templates_shared/";
import { DictionariesDomain } from "./dictionaries";

export namespace DomainErrors {
    export class InvalidEmailError extends BaseError<DictionariesDomain.TDictionariesDomainErrors> {
        protected typeResponse = RootPresentationResponses.BAD_REQUEST;
        protected messageLang: DictionariesDomain.TDictionariesDomainErrors = "invalid_email";
    }

    export class InvalidDateFormatError extends BaseError<DictionariesDomain.TDictionariesDomainErrors> {
        protected typeResponse = RootPresentationResponses.BAD_REQUEST;
        protected messageLang: DictionariesDomain.TDictionariesDomainErrors = "invalid_date_format";
    }

    export class InvalidPasswordError extends BaseError<DictionariesDomain.TDictionariesDomainErrors> {
        protected typeResponse = RootPresentationResponses.BAD_REQUEST;
        protected messageLang: DictionariesDomain.TDictionariesDomainErrors = "invalid_password";
    }

    export class NotAcceptTermsError extends BaseError<DictionariesDomain.TDictionariesDomainErrors> {
        protected typeResponse = RootPresentationResponses.BAD_REQUEST;
        protected messageLang: DictionariesDomain.TDictionariesDomainErrors = "not_accepted_terms";
    }

    export class InvalidPhoneNumberError extends BaseError<DictionariesDomain.TDictionariesDomainErrors> {
        protected typeResponse = RootPresentationResponses.BAD_REQUEST;
        protected messageLang: DictionariesDomain.TDictionariesDomainErrors = "invalid_phone_number";
    }
}