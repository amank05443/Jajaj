import React, { useState, useEffect } from 'react';
import {ModForm701, ModForm703B,ModForm704A,ModForm707, ModForm712A, ModForm702, ModForm710} from "../WeasyPrintReports/WeasyPrint";
import {
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';

const PrintReport = () => {

    return (
        <>
<div style={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Download e700
      </Typography>
      <ModForm701 />
      <ModForm703B />
      <ModForm704A />
      <ModForm707 />
      <ModForm712A />
      <ModForm702 />
      <ModForm710 />
    </div>
  );
        </>
        )
    }
export default PrintReport;