import { UserPictureDTO } from "@app/dto/userPicture.dto";
import { ControllerEntityTransaction } from "@christiangsn/templates_shared/build/common";

export class UploadUserImagePictureController extends ControllerEntityTransaction<UserPictureDTO, { message: string}> {

}