import { IsNotEmpty } from "class-validator";

export class LoginUserReqDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class LoginUserWrapperReqDto {
    user: LoginUserReqDto;
}
