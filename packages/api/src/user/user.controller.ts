import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  PipeTransform,
  Post,
  Query,
  Type,
  UseGuards,
} from '@nestjs/common'
import { User as UserModel } from '@trms/database'

import { UserService } from './user.service'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { UUIDParam } from '../common/decorators/uuid.decorator'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up a new user',
  })
  async createUser(
    @Body()
    userDto: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.create(userDto)
  }

  @Post('')
  @ApiOperation({
    summary: 'Update a user',
  })
  async update(
    @UUIDParam('id') userId: string,
    @Body()
    userDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.update(userId, userDto)
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find one user by ID.',
  })
  async getUser(@UUIDParam('id') userId: string): Promise<UserModel> {
    return this.userService.findOne(userId)
  }

  @Get('')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all users.',
  })
  async getUsers(): Promise<UserModel[]> {
    return this.userService.findMany()
  }

  @Get('members')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a list all users who have joined member program.',
  })
  async getRegisteredUsers(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<UserModel[]> {
    return this.userService.findRegisteredUsers(take, skip, orderBy)
  }
}
