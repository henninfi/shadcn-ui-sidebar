/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoalType } from './GoalType';
import type { PrizeDistributionOut } from './PrizeDistributionOut';
import type { PrizeType } from './PrizeType';
export type LeaguePrizeOut = {
    total_prize: number;
    prize_type?: PrizeType;
    prize_goal?: GoalType;
    from_gw?: (number | null);
    to_gw?: (number | null);
    currency?: string;
    id: string;
    distributions?: Array<PrizeDistributionOut>;
};

