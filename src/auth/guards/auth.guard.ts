import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request;
    console.log(context.getType());
    if (context.getType<string>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
    } else {
      request = context.switchToHttp().getRequest();
    }

    const token = extractTokenFromHeader(request);
    if (!token) {
      console.log('bad token');

      throw new UnauthorizedException();
    }
    try {
      console.log('before verify');
      const payload = await this.jwtService.verifyAsync(token);
      console.log('payload is', payload);
      request['user'] = payload;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
    console.log('passes auth');
    return true;
  }
}

export function extractTokenFromHeader(request: any): string | undefined {
  const [type, token] = request.headers?.authorization?.split(' ') ?? [];
  console.log(token);

  return type === 'Bearer' ? token : undefined;
}
