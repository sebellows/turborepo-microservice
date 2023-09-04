import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { User as UserModel } from '@trms/database'

import { UUIDParam } from '../common/decorators/uuid.decorator'

import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Sign up a new user',
  })
  async createUser(
    @Body()
    userDto: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.create(userDto)
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
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
  @ApiOperation({
    summary: 'Find one user by ID.',
  })
  async getUser(@UUIDParam('id') userId: string): Promise<UserModel> {
    return this.userService.findOne(userId)
  }

  @Get()
  @ApiOperation({
    summary: 'List all users.',
  })
  async getUsers(): Promise<UserModel[]> {
    return this.userService.findMany()
  }

  @Get('members')
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
