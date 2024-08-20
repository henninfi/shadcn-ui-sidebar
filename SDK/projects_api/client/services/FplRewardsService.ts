/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeagueCreate } from '../models/LeagueCreate';
import type { LeagueOut } from '../models/LeagueOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FplRewardsService {
    /**
     * Get User Leagues
     * @returns LeagueOut Successful Response
     * @throws ApiError
     */
    public static getUserLeagues(): CancelablePromise<Array<LeagueOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Create League
     * @returns LeagueOut Successful Response
     * @throws ApiError
     */
    public static createLeague({
        requestBody,
    }: {
        requestBody: LeagueCreate,
    }): CancelablePromise<LeagueOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
