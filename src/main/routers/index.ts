import { IHttpVerbs, HttpRouter  } from "@christiangsn/templates_shared";
import { SignUpWithGoogleDTO } from "@app/dto/signUpWithGoogle.dto";
import { HttpRoute } from "@infra/httpServer/http-routes";
import { HttpBuilder } from "@infra/httpServer/build/http.payload";
import { JsonResponser } from "@infra/httpServer/middleware/response/json.responser";
import { IncomingMessage, ServerResponse } from "http";
import { IRegisterRouter } from "@infra/httpServer/interfaces/http-register-router.interface";
import { GetCurrentLangMiddleware, GetUserAgentMiddleware, GetIPMiddleware } from "@infra/httpServer/middleware";
import { ChangePasswordDTO } from "@app/dto/changePassword.dto";
import { HtmlResponser } from "@infra/httpServer/middleware/response/html.responser";
import { ChangePasswordControllerFactory } from "@main/factories/controllers/changePassword.factory";
import { SignUpWithGoogleControllerFactory } from "@main/factories/controllers/singupWithGoogle.factory";
import { HttpContext } from "@infra/httpServer/build/http.context";
import { FrameOptionsHeadersMiddleware } from "@infra/httpServer/middleware/after/frameOptionsHeaders.middleware";
import { SignUpControllerFactory } from "@main/factories/controllers/signup.controller.factory";
import { SignUpDTO } from "@infra/dto/sign-up";
import { SignInControllerFactory } from "@main/factories/controllers/signIn.controller.factory";
import { SignInDTO } from "@app/dto/signIn.dto";
import { GetUserInformationDTO } from "@app/dto/getUserInformation.dto";
import { GetUserInformationControllerFactory } from "@main/factories/controllers/getUserInformation.factory";

export class Routers
{
  public constructor(
    private readonly server: IRegisterRouter<IncomingMessage, ServerResponse<IncomingMessage>>) {
  }
  public setupAll ()
  {
    const signUpWithGoogleRouter = new HttpRouter<IncomingMessage, ServerResponse, {}>(
      new HttpRoute(IHttpVerbs.POST, '/users/signup/google', 1), 
      [new GetCurrentLangMiddleware(), new GetIPMiddleware(), new GetUserAgentMiddleware()], 
      [], 
      {
        payload: new HttpBuilder(SignUpWithGoogleDTO),
        context: HttpContext
      },
      SignUpWithGoogleControllerFactory.getCompose(),
      new JsonResponser()
    )

    const signupRouter = new HttpRouter<IncomingMessage, ServerResponse, {}>(
      new HttpRoute(IHttpVerbs.POST, '/users/signup', 1), 
      [new GetCurrentLangMiddleware(), new GetIPMiddleware(), new GetUserAgentMiddleware()], 
      [], 
      {
        payload: new HttpBuilder(SignUpDTO),
        context: HttpContext
      },
      SignUpControllerFactory.getCompose(),
      new JsonResponser()
    )

    const changePassword = new HttpRouter<IncomingMessage, ServerResponse, string>(
      new HttpRoute(IHttpVerbs.GET, '/users/change-password', 1), 
      [new GetCurrentLangMiddleware(), new GetIPMiddleware(), new GetUserAgentMiddleware()], 
      [new FrameOptionsHeadersMiddleware("http://localhost:4545")],
      {
        payload: new HttpBuilder(ChangePasswordDTO),
        context: HttpContext
      },
      ChangePasswordControllerFactory.getCompose(),
      new HtmlResponser()
    )

    const SignIn = new HttpRouter<IncomingMessage, ServerResponse, {}>(
      new HttpRoute(IHttpVerbs.POST, '/users/sign-in', 1), 
      [new GetCurrentLangMiddleware(), new GetIPMiddleware(), new GetUserAgentMiddleware()], 
      [], 
      {
        payload: new HttpBuilder(SignInDTO),
        context: HttpContext
      },
      SignInControllerFactory.getCompose(),
      new JsonResponser()
    )

    const getInfo = new HttpRouter<IncomingMessage, ServerResponse, {}>(
      new HttpRoute(IHttpVerbs.GET, '/users/get-information', 1), 
      [new GetCurrentLangMiddleware(), new GetIPMiddleware(), new GetUserAgentMiddleware()], 
      [], 
      {
        payload: new HttpBuilder(GetUserInformationDTO),
        context: HttpContext
      },
      GetUserInformationControllerFactory.getCompose(),
      new JsonResponser()
    )

    this.server.add(SignIn)
    this.server.add(signUpWithGoogleRouter)
    this.server.add(signupRouter)
    this.server.add(changePassword)
    this.server.add(getInfo)
  }
}
