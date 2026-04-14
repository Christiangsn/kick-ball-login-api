import { ChangePasswordDTO } from '@app/dto/changePassword.dto'
import { BaseSuccess, Result, RootPresentationResponses } from '@christiangsn/templates_shared'
import { TransferServices, WithDependencies } from '@christiangsn/templates_shared/build/common/transferServices'
import { IDTOValues } from '@christiangsn/templates_shared/build/interfaces'
import { IResult } from '@christiangsn/templates_shared/build/interfaces/domain/IResult'

export type ChangePasswordUseCaseInjetors = {}

export class ChangePasswordUseCase extends TransferServices<ChangePasswordUseCaseInjetors> implements WithDependencies<ChangePasswordUseCaseInjetors>
{
  
  protected async execute(dto: IDTOValues<ChangePasswordDTO>): Promise<IResult<string>> 
  {
    const template = process.cwd() + "/public/static/resetPassword.html"
    return Result.success(new BaseSuccess(template, RootPresentationResponses.OK))
  }
    
}
