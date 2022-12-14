import {
    Paper, Switch,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {StyledTableRow} from "../primitives/Table/StyledTableRow";
import {StyledTableCell} from "../primitives/Table/StyledTableCell";
import {observer} from "mobx-react-lite";
import projectState from "../../state/ProjectState";
import useSWR from "swr";
import {getBlockedTests} from "../../requests/QAHubBackend";
import {useState, useEffect} from "react";
import FullNameTableHeaderCell from "./FullNameTableHeaderCell";
import BlockedTestTableRow from "./BlockedTestTableRow";


const BlockedTestsTable = observer(() => {
    let {selectedProject} = projectState
    const [blockedTests, setBlockedTests] = useState([])
    const [showFullName, setShowFullName] = useState(true)

    // let { data, error } = useSWR(selectedProject, getBlockedTests, { refreshInterval: 15000 } )
    // useEffect(() => {
    //     if (data?.data?.length > 0) {
    //         setBlockedTests(data.data)
    //     }
    // }, [data])

    useEffect(() => {
        updateBlockedTestsList()
    }, [selectedProject])

    function updateBlockedTestsList() {
        getBlockedTests(selectedProject).then(blockedTestsResponse => {
            setBlockedTests(blockedTestsResponse.data)
        })
    }

    // if (error) return <div>Failed to receive blocked tests: { JSON.stringify(error, null, 2) }</div>
    // if (!data) return <div>Blocked tests are loading </div>

    return <Paper elevation={3} style={{margin: "15px", maxHeight: "calc(100vh - 165px)", overflowY: "auto", minWidth: "35vw" }}>
        <TableContainer style={{minWidth: "max-content"}}>
            <Table size="small" stickyHeader >
                <TableHead style={{ height: "60px" }}>
                    <StyledTableRow>
                        <StyledTableCell align='center' style={{width: "50px"}}>№</StyledTableCell>
                        <StyledTableCell style={{width: "50px"}}/>
                        <StyledTableCell style={{width: "120px"}} align='center'>Trial</StyledTableCell>
                        <StyledTableCell style={{width: "200px"}} align='left'>TestcaseId</StyledTableCell>
                        <StyledTableCell style={{width: "200px"}} align='center'><label style={{position: "relative", left: "-25px"}}>Team</label></StyledTableCell>
                        <FullNameTableHeaderCell style={{width: "600px"}} showFullName={showFullName} setShowFullName={setShowFullName}/>
                        <StyledTableCell style={{minWidth: "400px"}} align='center'><label style={{position: "relative", left: "-25px"}}>Comment</label></StyledTableCell>
                        <StyledTableCell style={{width: "120px"}} align='center'><label style={{position: "relative", left: "-25px"}}>Issue</label></StyledTableCell>
                        <StyledTableCell style={{width: "150px"}} align='center'>Block date</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {
                        blockedTests.map((blockedTest, index) =>
                            <BlockedTestTableRow
                                key={blockedTest._id}
                                index={index}
                                blockedTestForRow={blockedTest}
                                showFullName={showFullName}
                                setShowFullName={setShowFullName}
                                updateBlockedTestsList={updateBlockedTestsList}
                            />
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
})

export default BlockedTestsTable