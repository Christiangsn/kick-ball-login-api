import { ILoggerAdapter } from '@christiangsn/templates_shared/build/interfaces'
import "http";

declare global {
    var systemOutPrint: ILoggerAdapter
}
  
export {}

declare module "http" {
  interface IncomingMessage {
    informations?: Record<string, any>;
    rawBody?: string;
  }
}
