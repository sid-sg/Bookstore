import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, LoginDto } from "./dto";
import { ApiOkResponse, ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    @ApiCreatedResponse({
        description: 'User signed up',
        type: SignupDto
    })
    @ApiConflictResponse({
        description: 'User already exists'
    })
    @ApiBadRequestResponse({
        description: 'Server error'
    })
    signup(@Body() dto: SignupDto){ 
        return this.authService.signup(dto);
    }

    @Post('login')
    @ApiOkResponse({
        description: 'User logged in',
        type: LoginDto
    })
    @ApiUnauthorizedResponse({
        description: 'User already exists'
    })
    @ApiNotFoundResponse({
        description: 'wrong password'
    })
    @ApiBadRequestResponse({
        description: 'Server error'
    })
    login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }
}