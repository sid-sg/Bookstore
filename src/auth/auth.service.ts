import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup(){
        return 'user signed up';
    }

    signin(){
        return 'user signed in';
    }
}