import { Controller, Delete, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}


    @Get(':userId/profile')
    getProfile(@Param('userId',ParseIntPipe) userId:number) {
        return this.userService.getProfile(userId);
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
