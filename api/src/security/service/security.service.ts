import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TokenService} from '@security/jwt/token.service';
import {isNil} from 'lodash';
import {
    CredentialDeleteException,
    SignupException,
    UserAlreadyExistException,
    UserNotFoundException
} from '@security/security.exception';
import {SignInPayload} from '@security/model/payload/signin.payload';
import {Token} from '@security/model';
import {comparePassword, encryptPassword} from '@security/service/utils/password.decoder';
import {SignupPayload} from '@security/model/payload/signup.payload';
import {Builder} from 'builder-pattern';
import {RefreshTokenPayload} from '@security/model/payload/refresh.payload';
import {Credential} from '@security/model';

@Injectable()
export class SecurityService {

    constructor(@InjectRepository(Credential) private readonly repository: Repository<Credential>,
                private readonly tokenService: TokenService) {
    }

    async detail(id: string): Promise<Credential> {
        const result = await this.repository.findOneBy({credential_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new UserNotFoundException();
    }

    async signIn(payload: SignInPayload,isAdmin:boolean): Promise<Token | null> {
        let result = null;
        if (payload.socialLogin) {
            if (!isNil(payload.facebookHash) && payload.facebookHash.length > 0) {
                result = await this.repository.findOneBy({facebookHash: payload.facebookHash,
                    isAdmin:isAdmin});
            } else if (!isNil(payload.googleHash) && payload.googleHash.length > 0) {
                result = await this.repository.findOneBy({googleHash: payload.googleHash,
                    isAdmin:isAdmin});
            }
        } else {
            result = await this.repository.findOneBy({username: payload.username,
                isAdmin:isAdmin});
        }
        if (!isNil(result) && (payload.socialLogin || await comparePassword(payload.password,
            result.password))) {
            return this.tokenService.getTokens(result);
        }
        throw new UserNotFoundException();
    }

    async signup(payload: SignupPayload): Promise<Credential | null> {
        const result: Credential | null = await this.repository.findOneBy({username:
            payload.username});
        if (!isNil(result)) {
            throw new UserAlreadyExistException();
        }
        try {
            const encryptedPassword = (payload.facebookHash.length === 0 &&
                payload.googleHash.length === 0) ? await encryptPassword(payload.password): "";
            return this.repository.save(Builder<Credential>()
                .username(payload.username)
                .password(encryptedPassword)
                .facebookHash(payload.facebookHash)
                .googleHash(payload.googleHash)
                .mail(payload.mail)
                .build());
        } catch (e) {
            throw new SignupException();
        }
    }

    async refresh(payload: RefreshTokenPayload): Promise<Token | null> {
        return this.tokenService.refresh(payload);
    }

    async delete(id): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.tokenService.deleteFor(detail);
            await this.repository.remove(detail);
        } catch (e) {
            throw new CredentialDeleteException();
        }
    }


}


