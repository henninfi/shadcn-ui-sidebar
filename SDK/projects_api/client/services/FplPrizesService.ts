/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeaguePrizeCreate } from '../models/LeaguePrizeCreate';
import type { LeaguePrizeOut } from '../models/LeaguePrizeOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FplPrizesService {
    /**
     * Create Prizes
     * @returns LeaguePrizeOut Successful Response
     * @throws ApiError
     */
    public static createPrizes({
        leagueId,
        requestBody,
    }: {
        leagueId: string,
        requestBody: LeaguePrizeCreate,
    }): CancelablePromise<LeaguePrizeOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{league_id}',
            path: {
                'league_id': leagueId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Prizes
     * @returns LeaguePrizeOut Successful Response
     * @throws ApiError
     */
    public static getPrizes({
        leagueId,
    }: {
        leagueId: string,
    }): CancelablePromise<Array<LeaguePrizeOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{league_id}',
            path: {
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Prize
     * @returns LeaguePrizeOut Successful Response
     * @throws ApiError
     */
    public static updatePrize({
        leagueId,
        prizeId,
        requestBody,
    }: {
        leagueId: string,
        prizeId: string,
        requestBody: LeaguePrizeCreate,
    }): CancelablePromise<LeaguePrizeOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/league/{league_id}/prize/{prize_id}',
            path: {
                'league_id': leagueId,
                'prize_id': prizeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Prize
     * @returns string Successful Response
     * @throws ApiError
     */
    public static deletePrize({
        leagueId,
        prizeId,
    }: {
        leagueId: string,
        prizeId: string,
    }): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/league/{league_id}/prize/{prize_id}',
            path: {
                'league_id': leagueId,
                'prize_id': prizeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
