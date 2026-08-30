import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET')
        });
    }

    validate(payload: JwtPayload) {
        return {
            userId: payload.sub,
            name: payload.name
        }
    }
}