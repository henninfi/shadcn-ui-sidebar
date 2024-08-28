import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { LeaguePrizeOut } from "@/client/types.gen";
import { Edit } from "lucide-react"; // Import the Edit icon from lucide-react

interface PrizeCardProps {
  prize: LeaguePrizeOut;
  setPrize: (prize: LeaguePrizeOut) => void; // Function to set the current prize
  setOpenCreatePrizeModal: (open: boolean) => void; // Function to open the create prize modal
}

const PrizeCard: React.FC<PrizeCardProps> = ({ prize, setPrize,setOpenCreatePrizeModal }) => {
  const getPrizeTitle = (prizeType: string) => {
    switch (prizeType) {
      case "total_points":
        return "Total Points";
      case "gw_points":
        return "Gameweek Points";
      case "cup":
        return "Cup";
      default:
        return "Unknown Prize";
    }
  };

  // Calculate the number of gameweeks
  const numberOfGameweeks = prize.to_gw as number - (prize.from_gw as number) + 1;

  // Calculate the adjusted prize amount based on the prize type
  const adjustedPrize = prize.prize_type === "gw_points"
    ? (prize.total_prize / numberOfGameweeks).toFixed(0)
    : prize.total_prize;

  // Adjust the currency display for "gw_points" type
  const adjustedCurrency = prize.prize_type === "gw_points"
    ? `${prize.currency} per gameweek`
    : prize.currency;

  return (
    <Card key={prize.id}>
      <div className="flex justify-between items-center">
        <CardTitle className="m-4">{getPrizeTitle(prize.prize_type as string)}</CardTitle>
        <button onClick={() => (setPrize(prize), setOpenCreatePrizeModal(true))} className="m-2 p-1 text-gray-500 hover:text-gray-700">
          <Edit className="w-4 h-4" />
        </button>
      </div>
      <CardContent>
        {prize.prize_type === "cup" ? (
          <p className="text-sm text-gray-500">Winner of the Cup</p>
        ) : (
          <p className="text-sm text-gray-500">
            {`From Gameweek ${prize.from_gw} to ${prize.to_gw}`}
          </p>
        )}
        <p className="text-sm font-medium mt-2">
          {prize.total_prize} {prize.currency}
        </p>
        {prize.distributions && prize.distributions.length > 0 && (
          <div className="mt-2 space-y-2">
            {prize.distributions.map((distribution) => (
              <div key={distribution.id} className="flex justify-between text-sm">
                <p>Rank {distribution.rank}</p>
                <p>{distribution.percentage}%</p>
                <p>
                  {(
                    ((distribution.percentage as number) / 100) *
                    Number(adjustedPrize)
                  ).toFixed(1)}{" "}
                  {adjustedCurrency}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrizeCard;
