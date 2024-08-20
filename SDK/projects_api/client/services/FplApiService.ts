/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from '../models/Event';
import type { LeagueData } from '../models/LeagueData';
import type { TeamData } from '../models/TeamData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FplApiService {
    /**
     * Get Classic League Standings
     * @returns LeagueData Successful Response
     * @throws ApiError
     */
    public static getClassicLeagueStandings({
        leagueId,
    }: {
        leagueId: string,
    }): CancelablePromise<LeagueData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fpl/classic_league_standings',
            query: {
                'league_id': leagueId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Gameweek Per Manager
     * @returns TeamData Successful Response
     * @throws ApiError
     */
    public static getGameweekPerManager({
        teamId,
        gameweek,
    }: {
        teamId: string,
        gameweek: string,
    }): CancelablePromise<TeamData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fpl/gameweek_per_manager',
            query: {
                'team_id': teamId,
                'gameweek': gameweek,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Gameweek Per Manager Per Classic League
     * @returns TeamData Successful Response
     * @throws ApiError
     */
    public static getGameweekPerManagerPerClassicLeague({
        leagueId,
        gameweek,
    }: {
        leagueId: string,
        gameweek: string,
    }): CancelablePromise<Record<string, TeamData>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fpl/gameweek_per_manager_per_classic_league',
            query: {
                'league_id': leagueId,
                'gameweek': gameweek,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Overall Gameweek Info
     * @returns Event Successful Response
     * @throws ApiError
     */
    public static getOverallGameweekInfo(): CancelablePromise<Array<Event>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fpl/overall_gameweek_info',
        });
    }
}
