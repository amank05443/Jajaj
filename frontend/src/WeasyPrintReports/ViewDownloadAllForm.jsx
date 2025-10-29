import React, { useState, useEffect } from 'react';
import {ModForm701, ModForm703B,ModForm707, ModForm712A, ModForm702, ModForm710, ModForm703, ModForm704, ModForm704A, InstructionsButton, BlankForm} from "../WeasyPrintReports/WeasyPrint";
import {
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';


const PrintReport = () => {

    return (
        <>

<div className="bg-gray-100 min-h-screen items-center justify-center" style={{ padding: '2rem', textAlign: 'left' }}>
{/*       <Typography style={{textAlign:'center'}} fontSize="35px" fontFamily="algerian"fontWeight="bold" color="black" gutterBottom> */}
{/*        📑 Download MOD Form 700C */}
{/*       </Typography> */}
       <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-16 p-1 m-1 ml-2 mr-2 shadow-md ">
        <h2
          className=" absolute text-md font-bold"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "35px",
            margin: 0,
            fontFamily: "algerian",
          }}
        >
           📑 Download MOD Form 700C
        </h2>
      </div>

      <div className="flex justify-between items-center p-3 ">
          <InstructionsButton />
          <BlankForm />
      </div>

{/*       <div style={{textAlign:'left'}} variant="h4" fontWeight="bold" color="primary" gutterBottom> */}
{/*           <span style={{textAlign:'left'}}> <InstructionsButton />  </span> <span style={{textAlign:'right'}} ><BlankForm /> </span> */}
{/*       </div> */}
        <div className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] ">
      <div className ="flex items-center gap-3 p-1 border rounded-1g shadow-sm ">
          <div className="m-5">
              <Typography style={{textAlign:'left'}}  fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Section 1</Typography>
          </div>
          <div>
              <ModForm701 />
          </div>
          <div className="m-5">
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Leading Particulars</Typography>
          </div>
      </div>

      <div className ="flex items-center gap-3 p-1 border rounded-1g shadow-sm">
          <div className="m-5">
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Section 2</Typography>
          </div>
          <div>
              <ModForm703/><ModForm703B/>
          </div>
          <div className="m-5">
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Limitations Log </Typography>
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Operational Flight Program Log/ Onboard Software Log  </Typography>

          </div>
      </div>

      <div className ="flex items-center gap-3 p-1 border rounded-1g shadow-sm">
          <div className="m-5">
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Section 3</Typography>
          </div>
          <div>
              <ModForm704/><ModForm704A/>
          </div>
          <div className="m-5">
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Acceptable Deferred Defects Log</Typography>
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Acceptable Husbandry Deferred Defects Log </Typography>

          </div>
      </div>

      <div className ="flex items-center gap-3 p-1 border rounded-1g shadow-sm">
          <div className="m-5">
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Section 5</Typography>
          </div>
          <div>
              <ModForm707/>
          </div>
          <div className="m-5">
              <Typography style={{textAlign:'left'}} fontFamily="algerian"fontWeight="bold" color="black" gutterBottom>Change of Serviceability Log</Typography>

          </div>
      </div>
      </div>









{/*       <ModForm701 /> */}
{/*       <ModForm703/> */}
{/*       <ModForm703B /> */}
{/*       <ModForm704 /> */}
{/*       <ModForm704A /> */}
{/*       <ModForm707 /> */}
{/*       <ModForm710 /> */}
{/*       <ModForm702 /> */}
{/*       <ModForm712A /> */}
    </div>
        </>
        )
    }
export default PrintReport;