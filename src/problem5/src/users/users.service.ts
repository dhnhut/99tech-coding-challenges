import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll({
    skip = 0,
    take = 10,
    searchQuery,
  }: {
    skip?: number;
    take?: number;
    searchQuery?: string;
  }) {
    let whereCondition = {};

    if (searchQuery) {
      whereCondition = {
        OR: [
          { firstName: { contains: searchQuery } },
          { lastName: { contains: searchQuery } },
          { phone: { contains: searchQuery } },
          { email: { contains: searchQuery } },
        ],
      };
    }

    return this.prisma.user.findMany({
      skip: skip,
      take: take,
      where: whereCondition,
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  // findByName(uuid: string) {
  //   return this.prisma.user.findUnique({ where: { uuid } });
  // }

  findOne(uuid: string) {
    return this.prisma.user.findUnique({ where: { uuid } });
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { uuid },
      data: updateUserDto,
    });
  }

  remove(uuid: string) {
    return this.prisma.user.delete({ where: { uuid } });
  }
}
