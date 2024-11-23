import {Injectable, UnauthorizedException, CanActivate, ExecutionContext} from '@nestjs/common';
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return this.tryValidateRequest(request);
    }

    private tryValidateRequest(request: any): boolean {
        try {
            return this.validateJwtToken(request)
        } catch (e) {
            throw new UnauthorizedException('Unauthorized')
        }

    }

    private validateJwtToken(request: any): boolean {
        const token = request.headers.authorization.split(' ')[1]

        if(this.jwtService.verify(token)) {
            return true
        }

        return false
    }
}