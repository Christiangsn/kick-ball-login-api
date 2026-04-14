import { IDTOValidator, IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import { IncomingMessage } from 'node:http'

export class HttpBuilder implements IHttpRootServer.Router.Builder<IncomingMessage>
{
  public constructor (
    private readonly dtoInstance: new (...props: any[]) => IDTOValidator
  ) {}

  public formatPayload = (req: IncomingMessage): IDTOValidator =>
  {
    const parsedPayload = this.parsePayload(req.rawBody)
    const queryParams = this.parseQueryParams(req.url)

    return new this.dtoInstance({
      ...queryParams,
      ...parsedPayload,
      ...req.informations
    })
  }

  private parsePayload (payload?: string): Record<string, unknown>
  {
    if (!payload?.trim()) {
      return {}
    }

    try {
      return JSON.parse(payload) as Record<string, unknown>
    } catch (error) {
      systemOutPrint.warn(`Invalid request payload received: ${(error as Error).message}`, 'HTTP BUILDER')
      return {}
    }
  }

  private parseQueryParams(url?: string): Record<string, unknown>
  {
    if (!url) {
      return {}
    }

    const searchParams = new URL(url, 'http://localhost').searchParams
    return Object.fromEntries(searchParams.entries())
  }
}
