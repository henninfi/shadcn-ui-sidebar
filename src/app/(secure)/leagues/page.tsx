"use client";
import { useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { MyFPLRewardLeaguesTable } from "@/components/ui/tables/myFPLRewardLeaguesTable";
import { Button } from "@/components/ui/button";
import LinkNewFPLeafueDialog from "@/components/ui/dialogs/createMyFPLRewardLeagueDialog";
import JoinFPLeagueDialog from "@/components/ui/dialogs/joinFPLRewardLeagueDialog";

export default function DashboardPage() {
  const [openCreateLeagueModal, setOpenCreateLeagueModal] = useState(false);
  const [openJoinLeagueModal, setOpenJoinLeagueModal] = useState(false);

  return (
    <ContentLayout title="My FPL Reward Leagues">
      <div className="flex justify-end items-center mb-4 space-x-2">
        <Button variant="default" onClick={() => setOpenJoinLeagueModal(true)}>
          Join League
        </Button>
        <Button variant="default" onClick={() => setOpenCreateLeagueModal(true)}>
          New League
        </Button>
      </div>
      <LinkNewFPLeafueDialog
        open={openCreateLeagueModal}
        onClose={() => setOpenCreateLeagueModal(false)}
        onCreate={() => setOpenCreateLeagueModal(false)}
      />
      <JoinFPLeagueDialog
        open={openJoinLeagueModal}
        onClose={() => setOpenJoinLeagueModal(false)}
        onJoin={() => setOpenJoinLeagueModal(false)}
      />
      <MyFPLRewardLeaguesTable />
    </ContentLayout>
  );
}
