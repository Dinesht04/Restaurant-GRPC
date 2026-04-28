import { IsString, IsNotEmpty, isNotEmpty, IsEnum } from 'class-validator';

enum role {
  admin = 'admin',
  manager = 'manager',
  member = 'member',
}

enum country {
  us = 'us',
  india = 'india',
}

export class SignInReq {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpReq {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(role)
  @IsNotEmpty()
  role: role;

  @IsEnum(country)
  @IsNotEmpty()
  country: country;
}
