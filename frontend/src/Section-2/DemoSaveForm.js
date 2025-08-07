import React,{useState} from 'react';
import {Button} from '@mui/material';
import {useAlert} from '../Utils/Alerts/AlertContext';
import {useConfirm} from '../Utils/Alerts/ConfirmContext';
import LimitationLog from '../Section-2/LimitationLog';
import ViewLeadingParticulars from '../LeadingParticulars/ViewLeadingParticulars'

const DemoSaveForm = () => {
    const {showAlert} = useAlert();
    const {confirm} = useConfirm();

    const [open,setOpen] = useState(false);

    const handleSuccess = () => {
        showAlert('Saved successfully!','success');
        setOpen(false);
    };

    const fakeFormData = {name:'Abhishek Singh',email:'abhshdsjdkj@gamil.com'};
    const handleSave= () => {
//        confirm({
//            title:'Confirm Save',
//            message:'Are you sure you want to add new Entry into Section-5 (UNSERVICEABILITY LOG) ?',
//            onConfirm:() => {
                showAlert({
                    type:'warning',
                    title:'New Entry added to Section-5',
                    message:'Data saved successfully.',
                    data:fakeFormData
                });
//            }
//        });
    };

    const openPageWindow = () => {
        window.FloatingWindowAPI.open(
            "Leading Particulars",
            <ViewLeadingParticulars />
        );
    };
    return (
        <>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="contained" onClick={openPageWindow}>
                Open Form Window
            </Button>

        </>
    )
};
export default DemoSaveForm;