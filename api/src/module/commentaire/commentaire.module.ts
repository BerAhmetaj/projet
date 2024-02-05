import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Credential} from "@security/model";
import {Token} from "@security/model";
import {SecurityController} from "@security/security.controller";
import {SecurityService} from "@security/service/security.service";
import {TokenService} from "@security/jwt/token.service";
import {Commentaire} from "./entity/commentaire.entity";
import {CommentaireService} from "./service/commentaire.service";
import {CommentaireController} from "./controller/commentaire.controller";
import {Address} from '../Adresse.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Commentaire,Credential, Token, Address])],
    controllers: [CommentaireController, SecurityController],
    providers: [CommentaireService,SecurityService, TokenService]
})
export class CommentaireModule {}