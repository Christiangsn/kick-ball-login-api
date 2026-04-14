import { FactoryAdapter } from "@christiangsn/templates_shared";
import { GoogleOAuthEnv } from "../../../../infra/env/googleOAuth-env";

import { AccountsGoogleRepository } from "../../../../infra/google/accounts-google-repository/accounts-google.repository";

export class GoogleRepositoryFactory extends FactoryAdapter<AccountsGoogleRepository>
{
    protected createInstance(): AccountsGoogleRepository 
    {
        return new AccountsGoogleRepository(new GoogleOAuthEnv({ 
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackUrl: process.env.CALLBACK_URL
        }))
    }
}