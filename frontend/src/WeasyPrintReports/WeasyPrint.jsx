import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  CircularProgress,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import useTableApi from '../Utils/CustomHooks/useTableApi';
import { useParams } from "../Utils/CustomHooks/useParams";

const PrintReport = () => {

  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!loading){
            const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
        }
    },[params, loading]);

  const handlePrint = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
        console.log('aaaaaa' ,aircraftMasterId)
     try {
      const response = await fetch(
        `http://localhost:8000/aircraft/pdf/${aircraftMasterId}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'MOD Form 701.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Error generating the report');
    } finally {
      setIsLoading(false);
    }
    }
  };
  const handlePrintSec5 = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
        console.log('aaaaaa' ,aircraftMasterId)
     try {
      const response = await fetch(
        `http://localhost:8000/sec5/pdf/${aircraftMasterId}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'MOD Form 707.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Error generating the report');
    } finally {
      setIsLoading(false);
    }
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Download e700
      </Typography>

      <Button
        variant="contained"
        onClick={handlePrint}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={18} /> : null}
      >
        {isLoading ? 'Generating...' : 'Print MOD Form 701'}
      </Button>
      <div className="m-5">
      <Button
        variant="contained"
        onClick={handlePrintSec5}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={18} /> : null}
      >
        {isLoading ? 'Generating...' : 'Print MOD Form 707'}
      </Button>
      </div>
    </div>
  );
};

export default PrintReport;
