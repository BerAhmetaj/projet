import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TokenService} from "@security/jwt/token.service";
import {Builder} from "builder-pattern";
import {isNil} from "lodash";
import {Like} from "../entity/like.entity";
import {LikeCreatePayload} from "../payload/like-create.payload";
import {LikeUpdatePayload} from "../payload/like-update.payload";

export class LikeService {constructor(@InjectRepository(Like) private readonly repository:
                                                 Repository<Like>, private readonly securityService: TokenService) {}
    async create(payload: LikeCreatePayload): Promise<Like> {
        try {
            const existingCredential = "bbf4f793-674e-4478-a47e-96feb1daa19b";
            const newPublication = Object.assign(new Like(), Builder<Like>()

                .credential_id(existingCredential).id_publication(payload.id_publication)
                .date_du_like(payload.date_du_like).id_commentaire(payload.id_commentaire)
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
    async detail(id: string): Promise<Like> {
        const result = await this.repository.findOneBy({id_publication: id});
        if (!(isNil(result))) {
            return result;
        }
        // Exception here
        throw null;
    }
    async getAll(): Promise<Like[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw null;
        }
    }
    async update(payload: LikeUpdatePayload): Promise<Like> {
        try {
            let detail = await this.detail(payload.id_like);
            detail.date_du_like = payload.date_du_like;
            return await this.repository.save(detail);
        } catch (e) {
            throw null;
        }
    }
}