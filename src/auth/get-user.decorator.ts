// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from './user.entity';

// export const GetUser = createParamDecorator(
//   (_data, ctx: ExecutionContext): User => {
//     const req = ctx.switchToHttp().getRequest();
//     return req.user;
//   },
// );

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
