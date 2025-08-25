//Purpose :- React context for handling alerts
// added by :- Abhishek Singh,LAM

import React,{createContext,useContext,useState} from 'react';
import CustomAlert from './CustomAlert';

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({children}) => {
    const [alert,setAlert] = useState({open:false});
    const showAlert = (config)=> {
        setAlert({open:true,...config});
    };
    const handleClose = () => setAlert({...alert,open:false});

    return (
        <AlertContext.Provider value={{showAlert}}>
            {children}
            <CustomAlert {...alert} onClose={handleClose} />
        </AlertContext.Provider>
    );
};