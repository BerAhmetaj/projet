import {ApiCodeResponse} from '@common/api-code.response';
import {ApiException} from './api.exception';
export class TestException extends ApiException {
    constructor() {
        super(ApiCodeResponse.TEST, 200);
    }
}