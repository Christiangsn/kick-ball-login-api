import { GetUserInformationDTO } from '@app/dto/getUserInformation.dto';
import { ControllerEntity } from '@christiangsn/templates_shared'

export namespace UsersControllers {
    export class GetUserInformationsController extends ControllerEntity<GetUserInformationDTO, string> {}
}
