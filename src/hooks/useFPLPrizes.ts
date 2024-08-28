// src/hooks/useFPLRewardPrizes.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FplPrizesService, LeaguePrizeOut, LeaguePrizeCreate } from "../../SDK/projects_api/client";
import { fplPrizesGetPrizesOptions, fplPrizesCreatePrizesMutation, fplPrizesUpdatePrizeMutation, fplPrizesDeletePrizeMutation, fplPrizesCreatePrizesQueryKey, fplPrizesCreatePrizesOptions } from "@/client/@tanstack/react-query.gen";

export const useGetLeaguePrizes = (leagueId: string) => {
  return useQuery({
    ...fplPrizesGetPrizesOptions({
      path: {
        league_id: leagueId,
        enabled: !!leagueId,
      },
    },
    )
  })
};

export const useCreateFPLRewardPrize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...fplPrizesCreatePrizesMutation(
  ),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    }
  },
  )
};

export const useUpdateFPLRewardPrize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...fplPrizesUpdatePrizeMutation(
  ),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    }
  },
  )
};

export const useDeleteFPLRewardPrize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...fplPrizesDeletePrizeMutation(
  ),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    }
  },
  )
};


