import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { extractTokenFromHeader } from './auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request;

    if (context.getType<string>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
    } else {
      request = context.switchToHttp().getRequest();
    }
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload);
      if (payload['role'] !== 'manager' || payload['role'] !== 'admin') {
        throw new UnauthorizedException();
      } else {
        request['user'] = payload;
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
