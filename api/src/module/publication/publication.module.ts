import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Credential} from "@security/model";
import {Token} from "@security/model";
import {SecurityController} from "@security/security.controller";
import {SecurityService} from "@security/service/security.service";
import {TokenService} from "@security/jwt/token.service";
import {Publication} from "./entity/publication.entity";
import {PublicationController} from "./controller/publication.controller";
import {PublicationService} from "./service/publication.service";
import {Address} from '../Adresse.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Publication,Credential, Token, Address])],
    controllers: [PublicationController, SecurityController],
    providers: [PublicationService,SecurityService, TokenService]
})
export class PublicationModule {}