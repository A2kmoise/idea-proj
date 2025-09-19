import { Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { profileUpdateDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get(':userId/profile')
  getProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getProfile(userId);
  }

  @Put(':userId/profile')
  updateProfile(@Param('userId', ParseIntPipe) userId: number, @Body() newData: profileUpdateDto) {
    return this.userService.updateProfile(userId, newData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId/change-password')
  changePassword(@Param('userId', ParseIntPipe) userId: number, @Body() body: { oldPassword: string; newPassword: string }, @Req() req: any) {

    if (req.user.id !== userId) {
      throw new ForbiddenException("You have no access here");
    }
    return this.userService.changePassword(userId, body.oldPassword, body.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-account')
  deleteAccount(@CurrentUser() user: any) {
    return this.userService.deleteAccount(user.id);
  }
}
