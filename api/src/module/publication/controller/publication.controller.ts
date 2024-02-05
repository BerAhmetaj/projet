import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {Publication} from "../entity/publication.entity";
import {PublicationCreatePayload} from "../payload/publication-create.payload";
import {PublicationUpdatePayload} from "../payload/publication-update.payload";
import {PublicationService} from "../service/publication.service";
import {Credential} from "@security/model"
import {User} from '@common/config/metadata/user.metadata';

@ApiBearerAuth('access-token')
@ApiTags('Publication')
@Controller('publication')
export class PublicationController {
    constructor(private readonly service: PublicationService) {
    }
    @Post('create')
    create(@User() user: Credential, @Body() payload: PublicationCreatePayload): Promise<Publication> {
        return this.service.create(user, payload);
    }
    @Delete('delete/:id')
    delete(@User() user: Credential, @Param('id') id: string): Promise<void> {
        return this.service.delete(id, user);
    }
    @Get('detail/:id')
    detail(@Param('id') id: string): Promise<Publication> {
        return this.service.detail(id);
    }
    @Get('list')
    getAll(): Promise<Publication[]> {
        return this.service.getAll();
    }
    @Get('countPost')
    countPost(@User() user: Credential): Promise<Number> {
        return this.service.countPost(user);
    }
    @Put('update')
    update(@Body() payload: PublicationUpdatePayload): Promise<Publication> {
        return this.service.update(payload);
    }
}