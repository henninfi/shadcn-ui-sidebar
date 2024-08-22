import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetClassicLeagueStandings } from "@/hooks/useGetClassicLeagueStanding";
import { useCreateFPLRewardLeague } from "@/hooks/useFPLRewardLeague";
import type { LeagueData } from "../../../../SDK/projects_api/client";
import { LeagueCreate } from "../../../../SDK/projects_api/client";


interface LinkNewFPLeagueDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export default function LinkNewFPLeagueDialog({ open, onClose, onCreate }: LinkNewFPLeagueDialogProps) {
  const [leagueId, setLeagueId] = useState<string>("");
  const [leagueDescription, setLeagueDescription] = useState<string>("");
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: fplClassicLeagueStanding } = useGetClassicLeagueStandings(leagueId);
  const createFPLRewardLeague = useCreateFPLRewardLeague();


  const handleFetchLeague = async () => {
    try {
      setLeagueData(fplClassicLeagueStanding ? fplClassicLeagueStanding : null);
      setError(leagueData === null ? null : "League not found or an error occurred.");
      console.log(leagueData);
    } catch (err) {
      setError("League not found or an error occurred.");
      setLeagueData(null);
    }
  };

  const handleSubmitLeague = async () => {
    const newLeague:LeagueCreate = {
      name: leagueData?.league.name ? leagueData?.league.name : "",
      description: leagueDescription,
      external_id_fpl: leagueData?.league.id ? leagueData?.league.id : 0,



    }
    createFPLRewardLeague.mutate(newLeague as LeagueCreate);
    console.log(newLeague);
    onClose();
  };



  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="overflow-y-scroll maw-w-screen max-h-screen w-[400px] sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Link New FPL League</DialogTitle>
          <DialogDescription>
            Enter the League ID to fetch the corresponding standings.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="League ID"
            value={leagueId}
            onChange={(e) => setLeagueId(e.target.value)}
          />
          <Button type="button" onClick={handleFetchLeague}>
            Fetch League
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {leagueData && (
          <div className="mt-4">
            <h3 className="font-bold"><p>Found League: </p></h3> <p className="text-sm">{leagueData.league.name}</p>
            {/* Display more league details as needed */}
            <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            className="mt-2"
            type="text"
            placeholder="Description [Optional]"
            value={leagueDescription}
            onChange={(e) => setLeagueDescription(e.target.value)}
          />
        </div>
          </div>
          
        )}
        <DialogFooter>
          <Button onClick={()=> handleSubmitLeague()}>Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
