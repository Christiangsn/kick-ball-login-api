export class OAuthGoogleEnv
{
  public constructor (
    public readonly clientId: string,
    public readonly clientSecret: string,
    public readonly callbackUrl?: string
  ) {}
}
