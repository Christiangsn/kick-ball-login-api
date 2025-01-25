import 'reflect-metadata'
import '@christiangsn/templates_shared/build/log'

import { HttpServerConnectionFactory } from '../factories/connections/httpServerConnectionFactory'
import { MongoDbConnectionFactory } from '../factories/connections/mongodb-connectionFactory'
import { HttpServerFactory } from '../factories/httpServer/httpServer.factory'
import { HttpServerRouterFactory } from '../factories/httpServer/httpServerRouter.factory'
import { SignUpRouter } from '../routers/v1/signup-router'

(
  new class Boostrap { 
    public constructor ()
    {
      
      this.start()
    }

    private async start ()
    {
      await MongoDbConnectionFactory
        .getCompose()
        .connect()

      this.routers()

      await HttpServerConnectionFactory.getCompose().connect()
      await HttpServerFactory.getCompose().linten(4545)
    }

    private async routers()
    {
      const router = HttpServerRouterFactory.getCompose()
      new SignUpRouter(router)
    }
  }
)
