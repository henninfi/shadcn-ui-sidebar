/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Get Token
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getToken(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Token',
        });
    }
}
