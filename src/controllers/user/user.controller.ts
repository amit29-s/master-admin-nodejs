import {
  Body,
  JsonController,
  Post,
  Res,
  // UseBefore,
} from 'routing-controllers';
import { UserService } from '../../services/user/User.service';
import { iCreateUser, ISingInUser } from '../../types/user.type';
import { Response } from 'express';
import { ResponseHandler } from '../../services/response-handler/ResponseHandler.service';
// import { authMiddleware } from '../../auth/auth';

@JsonController('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private responseService: ResponseHandler,
  ) {}

  @Post('/createCustomer')
  // @UseBefore(authMiddleware(['admin']))
  async createUser(@Body() user: iCreateUser, @Res() res: Response) {
    const data = await this.userService.createUser(user);
    return this.responseService.apiResponseHandler(res, data);
  }

  @Post('/signin')
  async signIn(@Body() user:ISingInUser, @Res() res: Response) {
    console.log(user,'akldsjfaklsdfjlkasdjflkas')
    const data = await this.userService.signIn(user);
    return this.responseService.apiResponseHandler(res, data);
  }
}
