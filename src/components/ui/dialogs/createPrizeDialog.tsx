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
import {
  useCreateFPLRewardPrize,
  useUpdateFPLRewardPrize,
  useDeleteFPLRewardPrize,
} from "@/hooks/useFPLPrizes";
import { LeaguePrizeCreate, PrizeType, PrizeDistributionCreate, LeaguePrizeOut } from "../../../../SDK/projects_api/client";
import { useGetLeagueId } from "@/hooks/useGetLeagueId";
import { Trash } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface CreatePrizeDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  selectedPrize: LeaguePrizeOut | null;  // for updating an existing prize
}

export default function CreatePrizeDialog({
  open,
  onClose,
  onCreate,
  selectedPrize,
}: CreatePrizeDialogProps) {
  const leagueId = useGetLeagueId();

  // Initial states
  const [totalPrize, setTotalPrize] = useState<number | null>(null);
  const [prizeType, setPrizeType] = useState<PrizeType>("total_points");
  const [fromGw, setFromGw] = useState<number | null>(null);
  const [toGw, setToGw] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  const [distributions, setDistributions] = useState<PrizeDistributionCreate[]>([
    { rank: 1, percentage: 100 },
  ]);
  const [isPercentageValid, setIsPercentageValid] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSelectedId, setIsSelectedId] = useState<string | null>(null);

  // Hooks for creating, updating, and deleting prizes
  const createLeaguePrize = useCreateFPLRewardPrize(leagueId);
  const updateLeaguePrize = useUpdateFPLRewardPrize(leagueId, isSelectedId as string);
  const deleteLeaguePrize = useDeleteFPLRewardPrize(leagueId, isSelectedId as string);

  console.log('selectedPrize.id', isSelectedId)
  const prizePerGameweek =
    prizeType === "gw_points" && totalPrize && toGw && fromGw
      ? totalPrize / (toGw - fromGw + 1)
      : "";

  // Update state when editing an existing prize
  useEffect(() => {
    if (selectedPrize) {
      setIsSelectedId(selectedPrize.id);
      setTotalPrize(selectedPrize.total_prize);
      setPrizeType(selectedPrize.prize_type as PrizeType);
      setFromGw(selectedPrize.from_gw as number);
      setToGw(selectedPrize.to_gw as number);
      setCurrency(selectedPrize.currency as string);
      setDistributions(selectedPrize.distributions as PrizeDistributionCreate[]);
    } else {
      // Reset state for creating a new prize
      setTotalPrize(null);
      setPrizeType("total_points");
      setFromGw(null);
      setToGw(null);
      setCurrency("USD");
      setDistributions([{ rank: 1, percentage: 100 }]);
    }
  }, [selectedPrize]);

  useEffect(() => {
    if (prizeType === "cup") {
      setFromGw(38);
      setToGw(38);
    }
  }, [prizeType]);

  useEffect(() => {
    const totalPercentage = distributions.reduce(
      (sum, distribution) => sum + (distribution.percentage ?? 0),
      0
    );
    setIsPercentageValid(totalPercentage === 100);

    setIsValid(
      totalPrize !== null &&
      fromGw !== null &&
      toGw !== null &&
      fromGw >= 1 &&
      fromGw <= 38 &&
      toGw >= fromGw &&
      toGw <= 38 &&
      isPercentageValid
    );
  }, [totalPrize, fromGw, toGw, distributions, isPercentageValid]);

  const handleSavePrize = () => {
    if (!isValid) return;

    const newPrize: LeaguePrizeCreate = {
      total_prize: totalPrize ?? 0,
      prize_type: prizeType,
      prize_goal: "points",
      from_gw: fromGw!,
      to_gw: toGw!,
      currency: currency,
      distributions: distributions.map((d) => ({
        rank: d.rank,
        percentage: d.percentage ?? 0,
      })),
    };

    if (selectedPrize) {
      updateLeaguePrize.mutate(newPrize);
    } else {
      createLeaguePrize.mutate(newPrize);
    }

    onClose();
    onCreate();
  };

  const handleDeletePrize = () => {
    if (selectedPrize) {
      deleteLeaguePrize.mutate();
      deleteLeaguePrize.isSuccess && onClose();
    }
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
    if (prizeType === "cup" && distributions.length >= 2) return;
    setDistributions([
      ...distributions,
      { rank: distributions.length + 1, percentage: 0 },
    ]);
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
          <DialogTitle>
            {selectedPrize ? "Edit Prize" : "Create a New Prize"}
          </DialogTitle>
          <DialogDescription>
            {selectedPrize ? "Update the details of the prize." : "Fill in the details to create a new prize for the league."}
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
          {prizeType === "gw_points" && totalPrize !== null && (
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
          {prizeType !== "cup" && (
            <>
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
            </>
          )}
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
                    Prize: {totalPrize ? (totalPrize * (distribution.percentage ?? 0)) / 100 : 0}{" "}
                    {currency}
                  </p>
                </div>
              </div>
            ))}
            {(prizeType !== "cup" || distributions.length < 2) && (
              <Button
                onClick={handleAddDistribution}
                variant="secondary"
                className="mt-2"
              >
                + Add Distribution
              </Button>
            )}
            {!isPercentageValid && (
              <p className="text-red-500 text-xs">
                Distribution percentage must sum up to exactly 100%.
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          {selectedPrize && (
            <div className="flex justify-between w-full">
              <Button
                variant="destructive"
                className="w-8 p-0 bg-red-800"
                onClick={handleDeletePrize}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          )}
          <Button onClick={handleSavePrize} disabled={!isValid}>
            {selectedPrize ? "Update Prize" : "Create Prize"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
