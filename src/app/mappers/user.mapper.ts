import { CreateEditUser, User } from "../intefaces/users.interface";

export function mapCreateEditUserToUser(dto: CreateEditUser): User {
    return {
        ...dto,
        company: {
            name: dto.companyName,
        },
    };
}