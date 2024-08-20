/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChipPlay } from './ChipPlay';
import type { TopElementInfo } from './TopElementInfo';
export type Event = {
    id: number;
    name: string;
    deadline_time: string;
    release_time?: (string | null);
    average_entry_score: number;
    finished: boolean;
    data_checked: boolean;
    highest_scoring_entry?: (number | null);
    deadline_time_epoch: number;
    deadline_time_game_offset: number;
    highest_score?: (number | null);
    is_previous: boolean;
    is_current: boolean;
    is_next: boolean;
    cup_leagues_created: boolean;
    h2h_ko_matches_created: boolean;
    ranked_count: number;
    chip_plays: Array<ChipPlay>;
    most_selected?: (number | null);
    most_transferred_in?: (number | null);
    top_element?: (number | null);
    top_element_info?: (TopElementInfo | null);
    transfers_made: number;
    most_captained?: (number | null);
    most_vice_captained?: (number | null);
};

