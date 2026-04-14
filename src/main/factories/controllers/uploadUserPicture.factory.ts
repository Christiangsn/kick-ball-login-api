// import { FactoryAdapter } from '@christiangsn/templates_shared'
// import { IController } from '@christiangsn/templates_shared/build/interfaces'

// import { SignUpController } from '../../../infra/controller/sign-up.controller'
// import { SignUpUseCaseFactory } from '../useCases/signUp.useCase.factory'
// import { AuthorizationUseCaseFactory } from '../useCases/authorization.useCase.factory'
// import { UploadUserImagePictureController } from '@infra/controller/uploadUserPicture.controller'
// import { MongoDBTransaction } from '@infra/mongodb/middlewares/mongodb-transaction'
// import { MongoDbConnectionFactory } from '../connections/mongodb-connectionFactory';

// export class UploadUserPictureFactory extends FactoryAdapter<IController<{ message: string  }>>
// {
//   protected createInstance(): IController<{ message: string }>
//   {
//     const conn = MongoDbConnectionFactory.getCompose();
//     const useCase = AuthorizationUseCaseFactory.getCompose();
//     const transaction = new MongoDBTransaction(conn)
//     return new UploadUserImagePictureController(useCase, transaction)
//   }
// }
