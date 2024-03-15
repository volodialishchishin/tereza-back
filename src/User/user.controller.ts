import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/Guards/jwt.auth.guards';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { UserProfileView } from './DTO/user.profile.view';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/:id')
  async getUserById(
    @Param() params: { id: string },
    @Res() response: Response,
  ) {
    const user = await this.userService.getUserById(params.id);
    if (!user) {
      response.sendStatus(404);
    }
    response.json(user);
  }

  @Put('/:id')
  async updateUserById(
    @Param() params: { id: string },
    @Res() response: Response,
    @Body() body: UserProfileView,
  ) {
    const user = await this.userService.getUserById(params.id);

    console.log('hello');
    if (!user) {
      response.sendStatus(404);
    }
    const updatedUser = await this.userService.updateUserById(params.id, body);
    response.json(updatedUser);
  }
}
