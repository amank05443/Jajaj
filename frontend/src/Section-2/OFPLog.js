import React,{useState,useEffect} from 'react';
import useTableApi from '../Utils/CustomHooks/useTableApi';
import CustomGrid from '../Utils/CustomComponents/CustomGrid';

const OFPLog = () => {

    const {data:gridData,loading:gridLoading,update:gridUpdate,create:gridCreate} = useTableApi('softwares');
    const columns = [
        {field:'',headerName:'System',sortable:true,filterable:true},
        {field:'',headerName:'Software Description',sortable:true},
        {field:'',headerName:'Software Standard/ Version and Date'},
        {field:'',headerName:'MF 707 Ref/SNOW'},
        {field:'',headerName:'Notes/ Compatibility'},
        {field:'',headerName:'Signature of ATO and Date'},
    ];

//        const columns = [
//    {field:'side_no',headerName:'Date SNOW',sortable:true, width: 80},
//    {field:'aircraft_mark',headerName:'WEIGHING, CHANGE OR MODIFICATION',sortable:true},
//    {group:'DETAILS OF CHANGE',children:[
//        {field:'max_auw',headerName:'Weight(Kg)'},
//        {group:'Moment',children:[
//            {field:'max_auw',headerName:'Long'},
//            {field:'max_auw',headerName:'Lat/Vert'},
//        ]},
//    ]},
//
//    {group:'CORRECTED BASIC DATA',children:[
//        {field:'max_auw',headerName:'Weight(Kg)'},
//        {group:'LONGITUDINAL',children:[
//            {field:'max_auw',headerName:'CG POSITION'},
//            {field:'max_auw',headerName:'MOMENT'},
//        ]},
//        {group:'LATERAL % MAC ABOUT X ORIGIN',children:[
//            {field:'max_auw',headerName:'CG POSITION'},
//            {field:'max_auw',headerName:'MOMENT'},
//        ]},
//    ]},
//
//    {field:'max_fuel_capacity',headerName:'AUTH CODE'},
//    ];
        if(gridLoading) return <p>Loading...</p>;
    return (
        <div >
            <CustomGrid data={gridData} theme='Forest_Fog' columns={columns} heading="OPERATIONAL FLIGHT PROGRAM (MOD Form-703B)"/>
        </div>

    );



};
export default OFPLog;