import { I18nLocales } from "@christiangsn/templates_shared";
import { IDomainEvents } from "@christiangsn/templates_shared/build/interfaces/domain/IDomainEvents";
import { IMailRepository } from "@domain/contracts/mailRepository.contract";
import { UserEntity } from "@domain/entities";

export class SendMailEvent implements IDomainEvents.IDomainEventsService<UserEntity> {
    public constructor(
        private readonly mailRepository: IMailRepository,
    ) { }

    public onEvent(payload: UserEntity): void {
        this.mailRepository.sendMail(
            payload.getEmail().getValue("email"),
            I18nLocales.translate('mail.welcome.subject', payload.getValue("lang"), {}),
            I18nLocales.translate('mail.welcome.text', payload.getValue("lang"), { name: payload.getFullName() })
        )

    }
}