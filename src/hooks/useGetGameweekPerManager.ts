// src/hooks/useCatenaryMastRevisions.ts
import { useQuery } from "@tanstack/react-query"
import { FplApiService } from "../../SDK/projects_api/client";

export const useGetGameweekPerManager = (teamId: string, gameweek: string) => {
    return useQuery({
    queryKey: ["Gameweek_per_manager", teamId, gameweek],
    queryFn: () => FplApiService.getGameweekPerManager({teamId, gameweek}),
    enabled: !!teamId && !!gameweek,
},
)};

export const useGetGameweekPerManagerPerClassicLeague = (leagueId: string, gameweek: string) => {
    return useQuery({
    queryKey: ["Gameweek_per_manager_per_Classic_League", leagueId, gameweek],
    queryFn: () => FplApiService.getGameweekPerManagerPerClassicLeague({leagueId, gameweek}),
    enabled: !!leagueId && !!gameweek,
},
)};