import React from 'react';
import '../Layout/JqWidget';
import JqxGrid from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";  // ✅ Importing all Jq-Widgets for JQXGrid.


 export const FuelGrid=({olg_gases_fuel})=>{
     if (olg_gases_fuel && olg_gases_fuel.length>0){
         const source={
             datatype: 'array',
             localdata: olg_gases_fuel,
             datafields: [
                 {name: 'system_name', type: 'string'},
                 {name: 'description', type: 'string'},
                 {name: 'nato_code', type: 'string'},
             ],
         };
         const columns=[
             {text: 'Type', datafield: 'system_name',align: 'center', width: '35%'},
             {text: 'Store Ref.', datafield: 'description',align: 'center', width: '22%'},
             {text: 'GOST/ NATO Symbol', datafield: 'nato_code',align: 'center', width: '43%'}
         ];
             // const dataAdapter= new window.jqx.dataAdapter(source);
         return (
             <div className={'fuelGrid'}>
                  <JqxGrid
                     width={'100%'}
//                      height={'230'}
                     autoheight={true}
                     source={source}
                     columns={columns}
                     pageable={false}
                     sortable={true}
                     altrows={true}
                 />
                 <style jsx global>{`
                     .fuelGrid .jqx-grid-column-header {
                         background-image: url("./images/N.jpeg");
                         background-repeat: repeat;
                         background-size: cover;
                         background-position: center;
                     }
                     .fuelGrid .jqx-grid {
                         background: transparent !important;
                     }
                     .fuelGrid .jqx-grid-content {
                         background: transparent !important;
                     }
                     .fuelGrid .jqx-grid-table {
                         background: transparent !important;
                     }
                     .fuelGrid .jqx-grid-cell {
                         background: transparent !important;
                         color: black;
                     }
                     .fuelGrid .jqx-grid-cell-alt {
                         background: transparent !important;
                     }
                      .fuelGrid .jqx-grid-cell-hover {
                         background: rgba(255, 255, 255, 0.3) !important;
                         //color: #000 !important;
                     }
                      .fuelGrid .jqx-grid-pager {
                         font-family: 'Poppins', sans-serif;
                         background: #f1f1f1;
                         border-top: 1px solid #ddd;
                     }
                 `}
                 </style>
             </div>
         );
     }
 };

 export const OilAndGasesGrid=({olg_gases})=>{
     if (olg_gases && olg_gases.length>0) {
         const source = {
             datatype: 'array',
             localdata: olg_gases,
             datafields: [
                 {name: 'system_name', type: 'string'},
                 {name: 'type_of_pol', type: 'string'},
                 {name: 'description', type: 'string'},
                 {name: 'nato_code', type: 'string'},
                 {name: 'substitute_id', type: 'number'},
             ],
         };
         const columns = [
             {text: 'System', datafield: 'system_name', align: 'center', width: '31%', editable: true},
             {text: 'Type', datafield: 'type_of_pol', columngroup: 'main', align: 'center', cellsalign: 'center', width: '11%'},
             {text: 'Store Ref', datafield: 'description', columngroup: 'main', align: 'center', cellsalign: 'center', width: '14%'},
             {text: 'GOST / NATO', datafield: 'nato_code', columngroup: 'main', align: 'center', cellsalign: 'center', width: '20%'},
             {text: 'Alternate/ Substitute', datafield: 'substitute_id', align: 'center', cellsalign: 'center', width: '23%'}
         ];
         const columngroups =[
             {text:'Standard', align: 'center', name: 'main'},
         ];
         return (
             <div className="oilGrid">
                 <JqxGrid
                     width={'100%'}
                     autoheight={true}
                     source={source}
                     columns={columns}
                     columngroups={columngroups}
                     pageable={false}
                     sortable={true}
                     pageSize={10}
                     altrows={true}
                 />
                 <style jsx global>{`
                     .oilGrid .jqx-grid-column-header {
                         background-image: url("./images/N.jpeg");
                         background-repeat: repeat;
                         background-size: cover;
                         background-position: center;
//                       background: #660210;
//                       background: rgba(50,40,78,0.2)
                     }
                     .oilGrid .jqx-grid {
                         background: transparent !important;
                     }
                     .oilGrid .jqx-grid-content {
                         background: transparent !important;
                     }
                     .oilGrid .jqx-grid-table {
                         background: transparent !important;
                     }
                     .oilGrid .jqx-grid-cell {
                         background: transparent !important;
                         color: black;
                     }
                     .oilGrid .jqx-grid-cell-alt {
                         background: transparent !important;
                     }
                     //.oilGrid .jqx-grid-row-alt {
                     //    background: #e9ecef;
                     //}
                      .oilGrid .jqx-grid-cell-hover {
                         background: rgba(255, 255, 255, 0.3) !important;
                         //color: #000 !important;
                     }
                     //.oilGrid .jqx-fill-state-pressed {
                     //    background: #5cb85c !important;
                     //    color: white !important;
                     //}
                     //
                      .oilGrid .jqx-grid-pager {
                         font-family: 'Poppins', sans-serif;
                         background: #f1f1f1;
                         border-top: 1px solid #ddd;
                     }
                 `}
                  </style>
             </div>
         );
     }
};