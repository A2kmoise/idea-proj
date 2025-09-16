import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { profileUpdateDto } from './dto';
@Injectable()
export class UserService {
    constructor( private prisma: PrismaService ) {}

    async getProfile(userId: number){
return this.prisma.user.findUnique ({
    where: { id:userId },
    select: {
name:true,
username: true,
email:true,

    }})
    }

    async updateProfile( userId: number, data: profileUpdateDto){
return this.prisma.user.update ({
    where: { id:userId },
    data,

})
    }

    async changePassword(){

    }

    async deleteAccount(){

    }
}
