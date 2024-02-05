import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Builder} from "builder-pattern";
import {isNil} from "lodash";
import {Publication} from "../entity/publication.entity";
import {PublicationUpdatePayload} from "../payload/publication-update.payload";
import {PublicationCreatePayload} from "../payload/publication-create.payload";
import {TokenService} from "../../../security/jwt/token.service";
import {Credential} from "@security/model";
export class PublicationService {constructor(@InjectRepository(Publication) private readonly repository:
                                            Repository<Publication>, private readonly securityService: TokenService) {}
    async create(user : Credential,payload: PublicationCreatePayload): Promise<Publication> {
        try {
            const newPublication = Object.assign(new Publication(), Builder<Publication>()
                .credential_id(user.credential_id)
                .date_de_publication(payload.date_de_publication).contenu(payload.contenu)
                .type_de_publication(payload.type_de_publication).build());
            return await this.repository.save(newPublication)
                ;
        } catch (e) {
            throw null;
        }
    }
    async delete(id: string, user : Credential): Promise<void> {
        try {
            const result = await this.repository.findOneBy({credential_id: user.credential_id, id_publication:id})
            const detail = await this.detail(id);
            if (!(isNil(result))) {
                await this.repository.remove(detail);
            }

        } catch (e) {
            throw null;
        }
    }
    async detail(id: string): Promise<Publication> {
        const result = await this.repository.findOneBy({id_publication: id});
        if (!(isNil(result))) {
            return result;
        }
        // Exception here
        throw null;
    }
    async getAll(): Promise<Publication[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw null;
        }
    }
    async update(payload: PublicationUpdatePayload): Promise<Publication> {
        try {
            let detail = await this.detail(payload.id_publication);
            detail.contenu = payload.contenu;
            detail.type_de_publication = payload.type_de_publication;
            return await this.repository.save(detail);
        } catch (e) {
            throw null;
        }
    }

    async countPost(user:Credential):Promise<number> {
    try {
        const result = await this.repository.count({where: {credential_id:user.credential_id}});
        if (!(isNil(result))) {
            return result;
        }

    } catch(e){
        throw new Error('ErreurNbPost');
    }

    }
}



