import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import { IncomingMessage } from 'http';
import { resolveLanguagePreference } from '@shared/utils/language.util';

export class GetCurrentLangMiddleware implements IHttpRootServer.Router.Middleware<IncomingMessage>
{
  public constructor() { }

  public async intercept(req: IncomingMessage): Promise<void>
  {
    const requestLang = req.headers['lang'] ?? req.headers['accept-language']
    if (!requestLang)
    {
      return
    }

    const lang = resolveLanguagePreference(requestLang);

    req.informations = {
      ...req.informations,
      lang
    }
  }

}
