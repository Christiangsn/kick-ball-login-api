import 'reflect-metadata'
import '@christiangsn/templates_shared/build/log'

import { HttpServerConnectionFactory } from '../factories/connections/httpServerConnectionFactory'
import { MongoDbConnectionFactory } from '../factories/connections/mongodb-connectionFactory'
import { HttpServerFactory } from '../factories/httpServer/httpServer.factory'
import { Routers } from '../routers'
// import { Cors } from '../../infra/httpServer/plugin/cors.plugin'
import { Cors } from '@infra/httpServer/plugin/cors.plugin'
import { I18nLocales } from '@christiangsn/templates_shared'
import { SecurityHeadersPlugin } from '@infra/httpServer/plugin/securityHeader.plugin'

(
  new class Boostrap { 
    public constructor ()
    {
      
      this.start()
    }

    private async start ()
    {
      new I18nLocales()
      const serverInstance = HttpServerConnectionFactory.getCompose();

      await MongoDbConnectionFactory.getCompose().connect()
      new Routers(serverInstance).setupAll();
      await new Promise(resolve => setTimeout(resolve, 2000));
      await serverInstance.connect()

      HttpServerFactory
        .getCompose()
        .addPlugin(new Cors())
        .addPlugin(new SecurityHeadersPlugin)

      try {
      await HttpServerFactory.getCompose().linten(4545)
      }
      catch (error)  {
        systemOutPrint.error(`Error during bootstrap: ${(error as Error).message}`, 'BOOTSTRAP', error)
      }

    }
  }
)


process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[FATAL] Unhandled Rejection:', reason);
});

process.on('beforeExit', (code) => {
  console.warn(`[INFO] Processo prestes a encerrar (beforeExit), código: ${code}`);
});

process.on('exit', (code) => {
  console.warn(`[INFO] Processo encerrado com código: ${code}`);
});

process.on('SIGINT', () => {
  console.warn('[SIGNAL] Recebido SIGINT');
});

process.on('SIGTERM', () => {
  console.warn('[SIGNAL] Recebido SIGTERM');
});
