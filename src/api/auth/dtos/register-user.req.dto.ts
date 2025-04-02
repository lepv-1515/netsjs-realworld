import { IsNotEmpty } from "class-validator";

export class RegisterUserReqDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;
}

export class RegisterUserWrapperReqDto {
    user: RegisterUserReqDto;
}
