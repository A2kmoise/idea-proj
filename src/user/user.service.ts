import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { profileUpdateDto } from './dto';
import { error } from 'console';
import bcrypt from 'bcrypt';
import passport from 'passport';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: number) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
                username: true,
                email: true,

            }
        })
    }

    async updateProfile(userId: number, data: profileUpdateDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data,

        })
    }

    async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) throw new error("User does not exist");

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordCorrect) throw new error("Old password not correct");

        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(newPassword, salt);

        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashNewPassword }
        });
        return "Password reseted successfullly";
    }

    async deleteAccount() {

    }
}
