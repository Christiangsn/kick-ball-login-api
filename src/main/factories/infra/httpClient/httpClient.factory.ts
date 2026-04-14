import { FactoryAdapter, IHttpClient } from "@christiangsn/templates_shared";
import { HttpClient } from "@infra/httpClient/httpClient";

export class HttpClientFactory extends FactoryAdapter<IHttpClient.Request>
{
    protected createInstance(): IHttpClient.Request
    {
        return new HttpClient()
    }
}