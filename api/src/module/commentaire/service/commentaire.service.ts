import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import {TokenService} from "@security/jwt/token.service";
import {Builder} from "builder-pattern";
import {isNil} from "lodash";
import {Commentaire} from "../entity/commentaire.entity";
import {CommentaireCreatePayload} from "../payload/commentaire-create.payload";
import {CommentaireUpdatePayload} from "../payload/commentaire-update.payload";
import {Credential} from '@security/model';

export class CommentaireService {
    constructor(@InjectRepository(Commentaire) private readonly repository:
                    Repository<Commentaire>, private readonly securityService: TokenService) {
    }

    async create(user: Credential, payload: CommentaireCreatePayload): Promise<Commentaire> {
        try {
            const newPublication = Object.assign(new Commentaire(), Builder<Commentaire>()
                .credential_id(user.credential_id).id_publication(payload.id_publication)
                .date_du_commentaire(payload.date_du_commentaire).contenu(payload.contenu)
                .build());
            return await this.repository.save(newPublication)
                ;
        } catch (e) {
            throw null;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        } catch (e) {
            throw null;
        }
    }

    async detail(id: string): Promise<Commentaire> {
        const result = await this.repository.findOneBy({id_publication: id});
        if (!(isNil(result))) {
            return result;
        }
        // Exception here
        throw null;
    }

    async getAll(): Promise<Commentaire[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw null;
        }
    }

    async update(payload: CommentaireUpdatePayload): Promise<Commentaire> {
        try {
            let detail = await this.detail(payload.id_commentaire);
            detail.contenu = payload.contenu;
            return await this.repository.save(detail);
        } catch (e) {
            throw null;
        }
    }


    async listComment(id: string): Promise<Commentaire[]> {
        const options: FindManyOptions<Commentaire> = {
            where: {id_publication: id},
        };
        const results = await this.repository.find(options);
        if (results.length > 0) {
            return results;
        }

        throw new Error('Comment not found');
    }


    async countCommentaire(user: Credential): Promise<number> {
        try {
            const result = await this.repository.count({where: {credential_id: user.credential_id}});
            if (!(isNil(result))) {
                return result;
            }

        } catch (e) {
            throw new Error('ErreurNbCommentaire');
        }

    }
}