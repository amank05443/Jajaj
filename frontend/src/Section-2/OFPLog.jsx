import React,{useState,useEffect} from 'react';
import useTableApi from '../Utils/CustomHooks/useTableApi';
import CustomGrid from '../Utils/CustomComponents/CustomGrid';

const OFPLog = () => {

    const {data: softwaresData, loading: loadingSoftwares }= useTableApi('softwares');
    const {data: software_linesData, loading: loadingSoftwareLines }= useTableApi('software_lines');
    const {data: change_of_serviceability_logsData, loading: loadingChange_of_serviceability_logs }= useTableApi('change_of_serviceability_logs');
    const {data: systemsData, loading: loadingSystems }= useTableApi('systems');
    const {data: ranksData, loading: loadingRanks }= useTableApi('ranks');
    const {data: usersData, loading: loadingUsers }= useTableApi('users');
    const [gridData, setGridData] = useState([]);

    useEffect(() => {

    if (softwaresData && change_of_serviceability_logsData && systemsData && software_linesData && ranksData && usersData){

        const merged = software_linesData.map(line => {

            const software = softwaresData.find(sw => sw.id === line.software);
            const system= software ? systemsData.find(sys => sys.id === software.system): null;
            const change_of_serviceability_log = change_of_serviceability_logsData.find(c => c.id === line.change_of_serviceability_log);
            const user = line ? usersData.find((u) => u.id === line.created_by) : null;
            const rank = user ? ranksData.find((r) => r.id === user.rank) : null;
            return{
                id:line.id,
                systems:system ? system.system : "",
                softwareDescription:software ? software.software_description : "",
                version:line.new_version,
                date:line.date_created,
                snow:change_of_serviceability_log ? change_of_serviceability_log.snow : "",
                notes:line.notes,
                authorisedby:user.user_name + " , " + rank.abbreviation ,
            };
    });
    setGridData(merged);
    }
    },[softwaresData,software_linesData,change_of_serviceability_logsData,systemsData,ranksData,usersData]);

console.log(softwaresData);
    const columns = [
        {field:"systems",headerName:'System',sortable:true,filterable:true},
        {field:"softwareDescription",headerName:'Software Desc',sortable:true,filterable:true},
        {field:"version",headerName:'Version',sortable:true,filterable:true},
        {field:"date",headerName:'Date',sortable:true,filterable:true},
        {field:"snow",headerName:'SNOW',sortable:true,filterable:true},
        {field:"notes",headerName:'Notes',sortable:true,filterable:true},
        {field:"authorisedby",headerName:'Authorised By',sortable:true,filterable:true},
    ];
        if(loadingSoftwares || loadingChange_of_serviceability_logs || loadingSystems || loadingSoftwareLines) return <p>Loading...</p>;
    return (
        <div >
            <CustomGrid data={gridData} theme='Forest_Fog' columns={columns} heading="OFP/ ONBOARD SOFTWARE LOG (MOD Form-703B)"/>
        </div>
    );
};
export default OFPLog;