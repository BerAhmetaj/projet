import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Credential} from "@security/model";
import {Token} from "@security/model";
import {SecurityController} from "@security/security.controller";
import {SecurityService} from "@security/service/security.service";
import {TokenService} from "@security/jwt/token.service";
import {Like} from "./entity/like.entity";
import {LikeController} from "./controller/like.controller";
import {LikeService} from "./service/like.service";
import {Address} from '../Adresse.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Like,Credential, Token, Address])],
    controllers: [LikeController, SecurityController],
    providers: [LikeService,SecurityService, TokenService]
})
export class LikeModule {}