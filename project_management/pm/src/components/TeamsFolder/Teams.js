import { Button, Table, TableCell, TableContainer, TableRow } from "@mui/material";
import { NavLink } from "react-router-dom";


function TeamsList() {
    
    return (

        <TableContainer>
            <Table>
                <TableRow>

                    <TableCell>
                        <NavLink>
                            <Button sx={{color:"white"}}>
                            Add Team
                            </Button>
                    </NavLink>
                    </TableCell>

                </TableRow>
            </Table>
        </TableContainer>


    )

}


export default TeamsList;