import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateFPLRewardPrize } from "@/hooks/useFPLPrizes";
import { LeaguePrizeCreate, PrizeType, PrizeDistributionCreate } from "../../../../SDK/projects_api/client";
import { useGetLeagueId } from "@/hooks/useGetLeagueId";

interface CreatePrizeDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export default function CreatePrizeDialog({
  open,
  onClose,
  onCreate,
}: CreatePrizeDialogProps) {
  const leagueId = useGetLeagueId();
  const [totalPrize, setTotalPrize] = useState<number | null>(null);
  const [prizeType, setPrizeType] = useState<PrizeType>("total_points");
  const [fromGw, setFromGw] = useState<number | null>(null);
  const [toGw, setToGw] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  const [distributions, setDistributions] = useState<PrizeDistributionCreate[]>([
    { rank: 1, percentage: 100 }, // Ensure percentage is always initialized
  ]);
  const [isPercentageValid, setIsPercentageValid] = useState<boolean>(true);

  const createLeaguePrize = useCreateFPLRewardPrize(leagueId);
  const prizePerGameweek =
    prizeType === "gw_points" && totalPrize && toGw && fromGw
      ? totalPrize / (toGw - fromGw + 1)
      : "";

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const totalPercentage = distributions.reduce(
      (sum, distribution) => sum + (distribution.percentage ?? 0),
      0
    );
    setIsPercentageValid(totalPercentage === 100);

    if (
      totalPrize &&
      fromGw &&
      toGw &&
      fromGw >= 1 &&
      fromGw <= 38 &&
      toGw >= fromGw &&
      toGw <= 38 &&
      isPercentageValid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [totalPrize, fromGw, toGw, distributions, isPercentageValid]);

  const handleCreatePrize = () => {
    if (!isValid) {
      return;
    }

    const newPrize: LeaguePrizeCreate = {
      total_prize: totalPrize ? totalPrize : 0,
      prize_type: prizeType,
      prize_goal: "points",
      from_gw: fromGw!,
      to_gw: toGw!,
      currency: currency,
      distributions: distributions.map(d => ({
        rank: d.rank,
        percentage: d.percentage ?? 0, // Ensure percentage is always present
      }))
    };

    createLeaguePrize.mutate(newPrize);
    onClose();
  };

  const handleDistributionChange = (
    index: number,
    field: keyof PrizeDistributionCreate,
    value: number
  ) => {
    const newDistributions = [...distributions];
    newDistributions[index][field] = value;
    setDistributions(newDistributions);
  };

  const handleAddDistribution = () => {
    setDistributions([...distributions, { rank: distributions.length + 1, percentage: 0 }]);
  };

  const handleRemoveDistribution = (index: number) => {
    if (distributions.length > 1) {
      const newDistributions = distributions.filter((_, i) => i !== index);
      setDistributions(newDistributions);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="overflow-y-scroll max-w-screen max-h-screen w-[400px] sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Create a New Prize</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new prize for the league.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="prizeType"
              className="block text-sm font-medium text-gray-700"
            >
              Prize Type
            </label>
            <select
              id="prizeType"
              value={prizeType}
              onChange={(e) => setPrizeType(e.target.value as PrizeType)}
              className="mt-1 block h-6 text-sm w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value={"total_points"}>Total Points</option>
              <option value={"gw_points"}>Gameweek Points</option>
              <option value={"cup"}>Cup</option>
            </select>
          </div>
          {prizeType === "gw_points" && (
            <div className="text-xs">
              When set to gameweek points, a prize will be created for every
              gameweek, won by the player with the highest points in that
              gameweek.
            </div>
          )}
          {prizeType === "total_points" && (
            <div className="text-xs">
              When set to total points the winner is the player with the highest accumulated points within the selected gameweeks.
            </div>
          )}
          <Input
            type="number"
            placeholder="Total Prize Amount"
            value={totalPrize ? totalPrize.toString() : ""}
            onChange={(e) => setTotalPrize(parseFloat(e.target.value))}
          />
          {prizeType === "gw_points" && totalPrize != 0 && (
            <div className="text-xs">
              Total prize amount divided by the number of gameweeks gives the
              prize per gameweek.
            </div>
          )}

          <Input
            type="text"
            placeholder="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <Input
            type="number"
            placeholder="From Gameweek"
            value={fromGw ?? ""}
            onChange={(e) => setFromGw(parseInt(e.target.value, 10))}
          />
          <Input
            type="number"
            placeholder="To Gameweek"
            value={toGw ?? ""}
            onChange={(e) => setToGw(parseInt(e.target.value, 10))}
          />
          {prizePerGameweek !== "" && (
            <p className="text-xs">Prize per Gameweek: {prizePerGameweek}</p>
          )}

          {/* Distribution Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prize Distributions
            </label>
            {distributions.map((distribution, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1/2">
                  <Input
                    type="number"
                    placeholder="Rank"
                    value={distribution.rank}
                    onChange={(e) =>
                      handleDistributionChange(
                        index,
                        "rank",
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">Rank</span>
                </div>
                <div className="w-1/2">
                  <Input
                    type="number"
                    placeholder="Percentage (%)"
                    value={distribution.percentage ?? 0} // Provide default value
                    onChange={(e) =>
                      handleDistributionChange(
                        index,
                        "percentage",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">Percent</span>
                </div>
               
                {distributions.length > 1 && (
                  <Button
                    onClick={() => handleRemoveDistribution(index)}
                    variant="destructive"
                    className="ml-2 mb-6"
                  >
                    Remove
                  </Button>
                )}
                 <div className="w-1/2">
                  <p className="text-xs mb-6">
                    Prize: {totalPrize ? (totalPrize * (distribution.percentage ?? 0)) / 100 : 0} {currency}
                  </p>
                </div>
              </div>
            ))}
            <Button
              onClick={handleAddDistribution}
              variant="secondary"
              className="mt-2"
            >
              + Add Distribution
            </Button>
            {!isPercentageValid && (
              <p className="text-red-500 text-xs">
                Distribution percentage must sum up to exactly 100%.
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreatePrize} disabled={!isValid}>
            Create Prize
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
