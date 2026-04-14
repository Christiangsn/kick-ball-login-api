import { FactoryAdapter } from "@christiangsn/templates_shared";
import { I18nLocales } from "@christiangsn/templates_shared/build/locale/i18n";

export class Translatei18nFactory extends FactoryAdapter<I18nLocales>
{
    protected createInstance(): I18nLocales
    {
        return new I18nLocales()
    }
}
