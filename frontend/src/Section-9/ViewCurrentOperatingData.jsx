import React,{useState,useEffect} from 'react';
import useTableApi from '../Utils/CustomHooks/useTableApi';
import CustomGrid from '../Utils/CustomComponents/CustomGrid';

const ViewCurrentOperatingData = () => {
       const [gridData, setGridData] = useState([]);
       const fixRows = [
                {description:"Weight"},
                {description:"Long Moment"},
                {description:"Lat/ Vert Moment"},
           ];
        const columns = [
        {field:"snow",headerName:'SNOW',sortable:true,filterable:true},
        {field:"description",headerName:'Description',sortable:true,filterable:true},
        {field:"cabwm",headerName:'Current aircraft basic weight and moment',sortable:true,filterable:true},
        {field:"minus",headerName:'minus',sortable:true,filterable:true},
        {field:"teir",headerName:'total effect of items removed',sortable:true,filterable:true},
        {field:"plus",headerName:'plus',sortable:true,filterable:true},
        {field:"teif",headerName:'total effect of items fitted',sortable:true,filterable:true},
        {field:"equals",headerName:'equals',sortable:true,filterable:true},
        {field:"cowm",headerName:'current operating weight and moment',sortable:true,filterable:true},
        {group: "Current operating cg position",children: [
            { field: "long", headerName: "Long", sortable:true,filterable:true },
            { field: "latvert", headerName: "Lat/ Vert", sortable:true,filterable:true },
            { field: "mac", headerName: "% MAC", sortable:true,filterable:true },
            ],
        },
    ];
    return (
        <div>
            <CustomGrid data={gridData} theme='Forest_Fog' columns={columns} heading="VIEW CURRENT OPERATION DATA (MOD Form-703B)"/>
        </div>
    );
};
export default ViewCurrentOperatingData;