// src/hooks/useFPLRewardPrizes.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FplPrizesService, LeaguePrizeOut, LeaguePrizeCreate } from "../../SDK/projects_api/client";

// // Hook to get prizes for a specific league
export const useGetLeaguePrizes = (leagueId: string) => {
    return useQuery({
        queryKey: ["fpl_reward_prizes", leagueId],
        queryFn: () => FplPrizesService.getPrizes({leagueId}),
    });
};

// Hook to create a new prize
export const useCreateFPLRewardPrize = (leagueId:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (requestBody: LeaguePrizeCreate) =>
            await FplPrizesService.createPrizes({ leagueId, requestBody }),
        onSuccess: (newPrize: LeaguePrizeOut) => {
            // Invalidate the query to ensure the prize list is refreshed
            queryClient.invalidateQueries({ queryKey: ["fpl_reward_prizes", leagueId] });
        },
    });
};
