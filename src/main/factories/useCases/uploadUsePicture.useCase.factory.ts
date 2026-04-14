import { UploadUserPictureUseCase } from "@app/useCases/uploadUserPicture.useCase";
import { FactoryAdapter } from "@christiangsn/templates_shared";

export class UploadUserPictureUseCaseFactory extends FactoryAdapter<UploadUserPictureUseCase> {
    protected createInstance(): UploadUserPictureUseCase {
        return new UploadUserPictureUseCase()
    }
}