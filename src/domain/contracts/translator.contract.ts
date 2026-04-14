export interface TranslatorContract {
    translate(key: string, locale: string, variables?: Record<string, any>): string;
}