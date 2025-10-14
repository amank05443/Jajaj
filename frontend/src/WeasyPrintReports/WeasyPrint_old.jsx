import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
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
  const handlePrintMod703B = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
     try {
      const response = await fetch(
        `http://localhost:8000/handlePrintMod703B/pdf/${aircraftMasterId}`,
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
      link.download = 'MOD Form 703B.pdf';
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
    const handlePrintMODForm704A = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
     try {
      const response = await fetch(
        `http://localhost:8000/handlePrintMODForm704A/pdf/${aircraftMasterId}`,
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
      link.download = 'MOD Form 704A.pdf';
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
     const handlePrintMODForm712A = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
     try {
      const response = await fetch(
        `http://localhost:8000/handlePrintMODForm712A/pdf/${aircraftMasterId}`,
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
      link.download = 'MOD Form 712A.pdf';
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

      <div className="m-5">
      <Button
        variant="contained"
        onClick={handlePrint}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={18} /> : null}
      >
        {isLoading ? 'Generating...' : 'Print MOD Form 701'}
      </Button>
      </div>
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
      <div className="m-5">
      <Button
        variant="contained"
        onClick={handlePrintMod703B}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={18} /> : null}
      >
        {isLoading ? 'Generating...' : 'Print MOD Form 703B'}
      </Button>
      </div>
      <div className="m-5">
      <Button
        variant="contained"
        onClick={handlePrintMODForm704A}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={18} /> : null}
      >
        {isLoading ? 'Generating...' : 'Print MOD Form 704A'}
      </Button>
      </div>
      <div className="m-5">
      <Button
        variant="contained"
        onClick={handlePrintMODForm712A}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={18} /> : null}
      >
        {isLoading ? 'Generating...' : 'Print MOD Form 712A'}
      </Button>
      </div>
    </div>
  );
};

export default PrintReport;
