import React, {createContext, useState} from 'react';

export const E700DataContext = createContext();

export const E700DataProvider = ({ children}) => {
 const [formData, setFormData] = useState({
  leadingParticulars:{},
  weightBalance:{},
  limitations:{},
  inspectionForecast:{},
  RoutineServicing:{},
  compassData:{},
 });

 return (
  <E700DataContext.Provider value={{ formData, setFormData }}>
   {children}
  </E700DataContext.Provider>
 );
}