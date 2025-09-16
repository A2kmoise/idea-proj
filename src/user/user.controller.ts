import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { profileUpdateDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId/profile')
  getProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getProfile(userId);
  }

  @Put(':userId/profile')
  updateProfile(@Param('userId', ParseIntPipe) userId: number, @Body() newData: profileUpdateDto) {
    return this.userService.updateProfile(userId, newData);
  }

  @Put('change-password')
  changePassword() {
    return this.userService.changePassword();
  }

  @Delete('delete-account')
  deleteAccount() {
    return this.userService.deleteAccount();
  }
}
