import { Box } from "@mui/material";
import Mention from "./Mention";
import MembersList from "./MembersList";

export default function Members({ teamDetails, setTeamDetails }) {
  return (
      <Box display="flex" flexDirection="column" rowGap="5vh"
      >
      <Mention teamDetails={teamDetails} setTeamDetails={setTeamDetails} />

      <MembersList id={teamDetails.id} />
    </Box>
  );
}
