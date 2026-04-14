import { ILanguages } from '@christiangsn/templates_shared/build/interfaces'

export const DEFAULT_LANGUAGE = ILanguages.LanguageValues.PT_BR

const supportedLanguages = new Set<string>(Object.values(ILanguages.LanguageValues))

export function resolveLanguagePreference(lang?: string | string[] | null): ILanguages.LanguageValues
{
  const rawLang = Array.isArray(lang) ? lang[0] : lang
  const normalizedLang = rawLang?.split(',')[0]?.split(';')[0]?.trim()

  if (normalizedLang && supportedLanguages.has(normalizedLang))
  {
    return normalizedLang as ILanguages.LanguageValues
  }

  return DEFAULT_LANGUAGE
}
