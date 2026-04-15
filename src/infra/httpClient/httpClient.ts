import { HttpHeaders, IHttpClient, IResult } from "@christiangsn/templates_shared";
import axios from "axios"
export class HttpClient implements IHttpClient.Request {

    private readonly _instance: any;

    public constructor () {
        this._instance = axios.create({})
    }

    public async get <Payload, ExpectedResponse>(endpoint: string, params: Payload, _headers: Array<keyof HttpHeaders.ResquetHeaders>): Promise<IResult<ExpectedResponse>> {
        const request = await this._instance.get(endpoint, {
            params
        })
        return request.data as IResult<ExpectedResponse>

    }
    public async post <Payload, ExpectedResponse>(endpoint: string, payload: Payload, headers: Array<keyof HttpHeaders.ResquetHeaders>, optionalParams?: Object): Promise<IResult<ExpectedResponse>> {
        const request = await this._instance.post(endpoint, payload, {})
        return request.data as IResult<ExpectedResponse>
    }
    public async delete <Payload, ExpectedResponse>(endpoint: string, params: Payload, headers: Array<keyof HttpHeaders.ResquetHeaders>): Promise<IResult<ExpectedResponse>> {
        throw new Error("not implemented")
    }

    public async put <Payload, ExpectedResponse>(endpoint: string, payload: Payload, headers: Array<keyof HttpHeaders.ResquetHeaders>, optionalParams?: Object): Promise<IResult<ExpectedResponse>> {
        throw new Error("not implemented")
    }

    public async patch <Payload, ExpectedResponse>(endpoint: string, payload: Payload, headers: Array<keyof HttpHeaders.ResquetHeaders>, optionalParams?: Object): Promise<IResult<ExpectedResponse>>{
        throw new Error("not implemented")
    }

}
