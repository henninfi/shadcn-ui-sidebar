// src/hooks/useCatenaryMastRevisions.ts
import { useQuery } from "@tanstack/react-query"
import { fplApiGetClassicLeagueStandingsOptions } from "@/client/@tanstack/react-query.gen";

export const useGetClassicLeagueStandings = (leagueId: string) => {
    return useQuery({
        ...fplApiGetClassicLeagueStandingsOptions({
            query: {
                league_id: leagueId ? leagueId : "314", // your league ID here
                
            },
            
        })
    })
};
