import { Body, JsonController, Post, Res } from 'routing-controllers';
import { UserService } from '../../services/user/User.service';
import { ICreateUser } from '../../types/user/user.type';
import { Response } from 'express';
import { ResponseHandler } from '../../services/response-handler/ResponseHandler.service';

@JsonController('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private responseService: ResponseHandler,
  ) {}

  @Post('/createCustomer')
  async createCustomer(@Body() user: ICreateUser, @Res() res: Response) {
    const data = await this.userService.createCustomer(user);
    return this.responseService.apiResponseHandler(res, data);
  }
}
