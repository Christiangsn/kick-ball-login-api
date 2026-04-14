import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import type { IncomingMessage } from 'http'


export class HttpRoute extends IHttpRootServer.RouterRegisterEndpoint {
  public register<Req>(request: Req & IncomingMessage): boolean {
    const isDomainPrivate = this.isPrivate ? '/private' : '';
    const versionedPath = isDomainPrivate + `/v${this.version}${this.path}`;

    if (!request.url || !request.method) {
      return false
    }

    const url = new URL(request.url, 'http://localhost')
    if (url.pathname !== versionedPath || request.method !== this.verb.toString()) {
      return false 
    }

    systemOutPrint.info(`Route registered: ${this.verb} ${versionedPath}`, 'HTTP ROUTES');
    return true;

  }

}
