// src/hooks/useCatenaryMastRevisions.ts
import { useQuery } from "@tanstack/react-query"
import { FplApiService } from "../../SDK/projects_api/client";

export const useGetClassicLeagueStandings = (leagueId: string) => {
    return useQuery({
    queryKey: [leagueId, "Classic_League_Standings"],
    queryFn: () => FplApiService.getClassicLeagueStandings({ leagueId }),
    enabled: !!leagueId,
},
)};