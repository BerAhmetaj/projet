import {ApiCodeResponse} from '@common/api/api-code.response';
import {ApiException} from '@common/api/api.exception';
export class TestException extends ApiException {
    constructor() {
        super(ApiCodeResponse.TEST, 200);
    }
}