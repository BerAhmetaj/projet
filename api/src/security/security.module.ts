import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Credential, Token} from '@security/model';
@Module({
    imports: [TypeOrmModule.forFeature([Credential, Token])]
})
export class SecurityModule {
}