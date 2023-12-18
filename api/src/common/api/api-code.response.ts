export enum ApiCodeResponse {
    TEST = 'api.result.test',
    NO_TOKEN_FOUNDED= 'api.security.error.no-token-founded',
    USER_NOT_FOUND= 'api.security.error.user-not-found',
    TOKEN_EXPIRED= 'api.security.error.token-expired',
    SIGNUP_ERROR= 'api.security.error.signup-error',
    CREDENTIAL_DELETE_ERROR= 'api.security.error.delete-error',
    USER_ALREADY_EXIST= 'api.security.error.already-exist',
    TOKEN_GEN_ERROR= 'api.security.error.gen-error',
    PAYLOAD_IS_NOT_VALID='api.security.error.payload-is-not-valid',
    PAYLOAD_PARAM_IS_MISSING='api.security.error.payload-is-missing',
    COMMON_SUCCESS='SUCCESS',

}