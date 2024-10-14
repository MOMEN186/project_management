import { Box } from "@mui/material";
import Mention from "./Mention";
import MembersList from "./MembersList";


export default function Members({teamDetails,setTeamDetails}) {
    console.log("members components",teamDetails)

    return (

        <Box>
            <Mention teamDetails={teamDetails} setTeamDetails={setTeamDetails} />
          
            
                <MembersList id={teamDetails.id} />
            
            
        </Box>
    )

}