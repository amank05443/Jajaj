import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { useParams } from "../Utils/CustomHooks/useParams";

export const InstructionsButton = () => {
    const openPdf = () => {
        window.open("./images/instructions of e700.pdf","_blank", "noopener", "noreferrer");
        };
    return (
        <button fontFamily="algerian" variant="contained" onClick ={openPdf} className="flex items-center justify-center py-1 w-72 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md border border-green-500 dark:border-yellow-500 !backdrop-blur-lg">Instructions for MOD Form 700C</button>
        );
}

export const BlankForm = () => {
    const openPdf = () => {
        window.open("./images/Dornier e700.pdf","_blank", "noopener", "noreferrer");
        };
    return (
        <button fontFamily="algerian" variant="contained" onClick ={openPdf} className="flex items-center justify-center py-1 w-60 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg">Blank MOD Form 700C</button>
//         <Button fontFamily="algerian"fontWeight="bold"  variant="contained" onClick ={openPdf} className="bg-blue-500 text-white shadow-md px-4 py-2 rounded-lg hover:bg-blue-700 transition">Blank MOD Form 700C</button>
        );
}

export const ModForm701 = () => {
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
              const response = await fetch(`http://localhost:8000/aircraft/pdf/${aircraftMasterId}`,
                {method: 'GET'}
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
          }catch (error) {
              alert('Error generating the report');
          } finally {
              setIsLoading(false);
          }
      }
  };
  return (
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                style={{textAlign:'left'}}
                variant="contained"
                onClick={handlePrint}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 701'}
              </button>
          </div>
  );
 }


export const ModForm707 = () => {
  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      if(!loading){
          const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
      }
  },[params, loading]);
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
  return (
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                variant="contained"
                style={{textAlign:'left'}}
                onClick={handlePrintSec5}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 707'}
              </button>
          </div>
  );
 }

 export const ModForm703B = () => {
  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      if(!loading){
          const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
      }
  },[params, loading]);
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
  return (
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                variant="contained"
                style={{textAlign:'left'}}
                onClick={handlePrintMod703B}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 703B'}
              </button>
          </div>
  );
 }

 export const ModForm712A = () => {
  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      if(!loading){
          const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
      }
  },[params, loading]);
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
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                variant="contained"
                style={{textAlign:'left'}}
                onClick={handlePrintMODForm712A}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 712A'}
              </button>
          </div>
  );
 }

 export const ModForm702 = () => {
  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      if(!loading){
          const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
      }
  },[params, loading]);
   const handlePrintMODForm702 = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
     try {
      const response = await fetch(
        `http://localhost:8000/handlePrintMODForm702/pdf/${aircraftMasterId}`,
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
      link.download = 'MOD Form 702.pdf';
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
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                variant="contained"
                style={{textAlign:'left'}}
                onClick={handlePrintMODForm702}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 702'}
              </button>
          </div>
  );
 }

 export const ModForm710 = () => {
  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      if(!loading){
          const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
      }
  },[params, loading]);
   const handlePrintMODForm710 = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
     try {
      const response = await fetch(
        `http://localhost:8000/handlePrintMODForm710/pdf/${aircraftMasterId}`,
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
      link.download = 'MOD Form 710.pdf';
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
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                variant="contained"
                style={{textAlign:'left'}}
                onClick={handlePrintMODForm710}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 710'}
              </button>
          </div>
  );
 }
 export const ModForm703 = () => {
  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      if(!loading){
          const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
      }
  },[params, loading]);
   const handlePrintMODForm703 = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
     try {
      const response = await fetch(
        `http://localhost:8000/handlePrintMODForm703/pdf/${aircraftMasterId}`,
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
      link.download = 'MOD Form 703.pdf';
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
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                variant="contained"
                style={{textAlign:'left'}}
                onClick={handlePrintMODForm703}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 703'}
              </button>
          </div>
  );
 }

 export const ModForm704 = () => {
  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      if(!loading){
          const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
      }
  },[params, loading]);
   const handlePrintMODForm704 = async () => {
    setIsLoading(true);
    if(aircraftMasterId){
     try {
      const response = await fetch(
        `http://localhost:8000/handlePrintMODForm704/pdf/${aircraftMasterId}`,
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
      link.download = 'MOD Form 704.pdf';
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
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                variant="contained"
                style={{textAlign:'left'}}
                onClick={handlePrintMODForm704}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 704'}
              </button>
          </div>
  );
 }




 export const ModForm704A = () => {
  const { params, loading } = useParams();
  const [aircraftMasterId, setAircraftMasterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      if(!loading){
          const aircraft_master_id= params.aircraft_master_id
            setAircraftMasterId(aircraft_master_id)
      }
  },[params, loading]);
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
  return (
          <div className="m-5">
              <button fontFamily="algerian" className="flex items-center justify-center py-1 w-44 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md  border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
                variant="contained"
                style={{textAlign:'left'}}
                onClick={handlePrintMODForm704A}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={10} /> : null}
              >
                {isLoading ? 'Generating...' : 'MOD Form 704A'}
              </button>
          </div>
  );
 }
