import { Controller, Delete, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}


    @Get('profile')
    getProfile(){
        return this.userService.getProfile();
    }

    @Put('profile')
    updateProfile(){
        return this.userService.updateProfile();
    }

    @Put('change-password')
        changePassword(){
        return this.userService.changePassword();
        }

        @Delete('delete-account')
        deleteAccount(){
            return this.userService.deleteAccount();
        }
    }
