import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ uniqueItems: true })
  phone: string;

  @ApiProperty({ uniqueItems: true })
  email: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  address?: string;
}
