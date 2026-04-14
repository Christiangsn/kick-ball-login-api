import { IHttpRootServer } from '@christiangsn/templates_shared/build/interfaces'
import Busboy from 'busboy';
import { IncomingMessage } from 'http';

export class UploadFileMiddleware implements IHttpRootServer.Router.Middleware<IncomingMessage>
{
  public constructor() { }

  public async intercept(req: IncomingMessage): Promise<void>
  {
    const busboy = Busboy({ headers: req.headers });

    const file: Buffer | null = null;
    busboy.on('file', this.handleFileUpload.bind(file));

    busboy.on('finish', () => {
        req.informations = {
            ...req.informations,
            file
        }
    });
  }

  private async handleFileUpload(
    file: Buffer | null,
    fieldname: string, 
    fileStream: NodeJS.ReadableStream, 
    encoding: string, 
    mimetype: string)
 {
    return await new Promise<{
        fieldname: string;
        mimetype: string;
        size: number;
        buffer: Buffer;
    }>((resolve, reject) => {
        const chunks: Buffer[] = [];
        let size = 0;

        fileStream.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
            size += chunk.length;
        });

        fileStream.on('end', () => {
            file = Buffer.concat(chunks);
            resolve({
                fieldname,
                mimetype,
                size,
                buffer: file
            });
        })
    })
 }
}
