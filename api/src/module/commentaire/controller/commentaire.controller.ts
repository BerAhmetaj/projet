import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {Commentaire} from "../entity/commentaire.entity";
import {CommentaireUpdatePayload} from "../payload/commentaire-update.payload";
import {CommentaireCreatePayload} from "../payload/commentaire-create.payload";
import {CommentaireService} from "../service/commentaire.service";
import {User} from '@common/config/metadata/user.metadata';
import {Credential} from '@security/model';

@ApiBearerAuth('access-token')
@ApiTags('Commentaire')
@Controller('commentaire')
export class CommentaireController {
    constructor(private readonly service: CommentaireService) {
    }
    @Post('create')
    create(@User() user: Credential, @Body() payload: CommentaireCreatePayload): Promise<Commentaire> {
        return this.service.create(user, payload);
    }
    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
    @Get('detail/:id')
    detail(@Param('id') id: string): Promise<Commentaire> {
        return this.service.detail(id);
    }
    @Get('list')
    getAll(): Promise<Commentaire[]> {
        return this.service.getAll();
    }
    @Get('countCommentaire')
    countCommentaire(@User() user: Credential): Promise<Number> {
        return this.service.countCommentaire(user);
    }
    @Put('update')
    update(@Body() payload: CommentaireUpdatePayload): Promise<Commentaire> {
        return this.service.update(payload);
    }

    @Get('listComment/:id')
    listComment(@Param('id') id: string): Promise<Commentaire[]> {
        return this.service.listComment(id);
    }
}