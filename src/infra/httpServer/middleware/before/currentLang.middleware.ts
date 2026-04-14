import { IHttpRootServer, ILanguages } from '@christiangsn/templates_shared/build/interfaces'
import { IncomingMessage } from 'http';

export class GetCurrentLangMiddleware implements IHttpRootServer.Router.Middleware<IncomingMessage>
{
  public constructor() { }

  public async intercept(req: IncomingMessage): Promise<void>
  {
    let lang: ILanguages.LanguageValues | null = req.headers['lang'] as ILanguages.LanguageValues | null;
    if (!lang) lang = ILanguages.LanguageValues.EN_US;

    req.informations = {
      ...req.informations,
      lang
    }
  }

}
