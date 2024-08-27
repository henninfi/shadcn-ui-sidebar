import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJoinFPLRewardLeague } from "@/hooks/useFPLRewardLeague";
import type { LeagueData } from "../../../../SDK/projects_api/client";
import { LeagueJoin } from "../../../../SDK/projects_api/client";
import { Loader2 } from "lucide-react"

interface JoinFPLeagueDialogProps {
  open: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export default function JoinFPLeagueDialog({ open, onClose, onJoin }: JoinFPLeagueDialogProps) {
  const [joinCode, setJoinCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const joinFPLRewardLeague = useJoinFPLRewardLeague();

  const handleJoinLeague = async () => {
    if (!joinCode) {
      setError("Please enter a join code.");
      return;
    }

    try {
      const leagueJoinData: LeagueJoin = { join_code: joinCode };
      await joinFPLRewardLeague.mutateAsync(leagueJoinData);
      onJoin(); // Call the onJoin callback to indicate success
      onClose(); // Close the dialog
    } catch (err) {
      setError("Failed to join the league. Please check the join code and try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="overflow-y-scroll max-w-screen max-h-screen w-[400px] sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Join FPL Reward League</DialogTitle>
          <DialogDescription>
            Enter the join code to join an existing FPL Reward League.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Join Code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <Button type="button" onClick={handleJoinLeague}>
            {joinFPLRewardLeague.isPending ? <Loader2/> : 'Join League' }
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
