import { UserPictureDTO } from "@app/dto/userPicture.dto";
import { BaseSuccess, Result } from "@christiangsn/templates_shared";
import { IDTOValues } from "@christiangsn/templates_shared/build/interfaces";
import { IResult } from "@christiangsn/templates_shared/build/interfaces/domain/IResult";

export class UploadUserPictureUseCase {
    public async run(_dto: IDTOValues<UserPictureDTO>): Promise<IResult<{ message: string }>> {
        return Result.success<{ message: string }>(new BaseSuccess({ message: "User picture uploaded successfully" }))
    }
}
