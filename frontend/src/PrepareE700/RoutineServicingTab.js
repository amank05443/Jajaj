import React, {useState,useEffect} from 'react';
import CustomGrid from'../Utils/CustomComponents/CustomGrid';
import useTableApi from'../Utils/CustomHooks/useTableApi';
export default function RoutineServicingTab() {
 const {data:gridData,loading:gridLoading,update:gridUpdate,create:gridCreate} = useTableApi('aircraft_masters');
       const columns = [
    {field:'side_no',headerName:'Operation/Task (Routine/Component change)'},
    {field:'aircraft_mark',headerName:'Time/ Date Commenced',sortable:true,filterable:true},
    {field:'airframe_serial_no',headerName:'Time/ Date Completed',sortable:true,filterable:true},
    {field:'basic_weight',headerName:'A/F Hours',sortable:true},
    {field:'airframe_serial_no',headerName:'Trade'},
    {field:'airframe_serial_no',headerName:'Cross Reference to MOD Form 707(SNOW)/Job Card',sortable:true,filterable:true},
    {field:'airframe_serial_no',headerName:' Signature of Authorised Personnel'},
];
if (gridLoading) return <p> Loading ...</p>;
  return (

      <div >
             <CustomGrid data={gridData} theme='Forest_Fog' columns={columns} heading="ROUTINE SERVICING CERTIFICATE (Form 710)"/>
      </div>

  );
};