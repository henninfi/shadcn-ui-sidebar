import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

  const fantasyTeams = [
    {
      teamName: "The Busby Babes",
      name: "Stian Aasmundsen",
      gameweeksWon: [1, 3, 5],
      prize: 100.50,
      teamValue: 105.75,
    },
    {
      teamName: "Firman FC",
      name: "Henning Firman",
      gameweeksWon: [2, 4],
      prize: 80.25,
      teamValue: 102.30,
    },
    {
      teamName: "Kings of Mosserød",
      name: "Oliver Holmøy",
      gameweeksWon: [1, 2, 3],
      prize: 120.00,
      teamValue: 107.00,
    },
    {
      teamName: "Team Leddalappen",
      name: "Mats Tonheim Jørgensen",
      gameweeksWon: [4, 5],
      prize: 90.75,
      teamValue: 104.50,
    },
    {
      teamName: "Team Herdis",
      name: "Siv Egeberg",
      gameweeksWon: [3, 6],
      prize: 75.50,
      teamValue: 101.20,
    },
    {
      teamName: "De Bryne",
      name: "Lars Bryne",
      gameweeksWon: [1, 6],
      prize: 85.60,
      teamValue: 103.75,
    },
    {
      teamName: "Golden Hammers",
      name: "Sindre Grading",
      gameweeksWon: [2, 5, 7],
      prize: 110.30,
      teamValue: 108.40,
    },
    {
      teamName: "The Cottagers",
      name: "Øyvind Østby",
      gameweeksWon: [3, 4],
      prize: 95.40,
      teamValue: 106.50,
    },
    {
      teamName: "HSH",
      name: "Simen Larsen",
      gameweeksWon: [5, 6, 7],
      prize: 130.00,
      teamValue: 109.20,
    },
  ];
  
  
  
  export function FantasyTable() {
    return (
      <Table>
        <TableCaption>A list of Fantasy Premier League players and their performance.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Team Name</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Gameweeks Won</TableHead>
            <TableHead className="text-right">Prize</TableHead>
            <TableHead className="text-right">Team Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fantasyTeams.map((team, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{team.teamName}</TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>{team.gameweeksWon.join(", ")}</TableCell>
              <TableCell className="text-right">${team.prize.toFixed(2)}</TableCell>
              <TableCell className="text-right">${team.teamValue.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Prize Money</TableCell>
            <TableCell className="text-right">
              ${fantasyTeams.reduce((total, team) => total + team.prize, 0).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
  