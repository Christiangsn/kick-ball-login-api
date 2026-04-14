export interface IServerRR<Request, Response> {
    getRequest: () => Request;
    getResponse: () => Response;
}

export interface IServerResponser {
    send(): void;
}