import { useQuery } from "@tanstack/react-query"
import { FplApiService } from "../../SDK/projects_api/client";


export const useGetGameweekOverallInfo = () => {
    return useQuery({
    queryKey: ["Played_Gameweek_Overall_Info"],
    queryFn: () => FplApiService.getOverallGameweekInfo(),
},
)};