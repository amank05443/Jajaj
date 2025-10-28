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
import useTableApi from './Utils/CustomHooks/useTableApi';
import useParams from './Utils/CustomHooks/useParams';

const UserList = () => {

  const {data,loading:tableLoading} = useTableApi('customers');
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedSubCustomer, setSelectedSubCustomer] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!tableLoading){
        setCustomerData(data);
    };
    console.log(customerData);
  }, [tableLoading,data]);

// Get unique customer names from active customers
  const uniqueCustomers = [
    ...new Set(
      customerData
        .filter((item) => item.active_yn === 'Y')
        .map((item) => item.customer_name)
    ),
  ];

  // Get unique sub-customers for selected customer
  const subCustomers = [
    ...new Set(
      customerData
        .filter(
          (item) =>
            item.customer_name === selectedCustomer &&
            item.active_yn === 'Y'
        )
        .map((item) => item.sub_customer_name)
    ),
  ];
  const customerId = [
    ...new Set(
      customerData
        .filter(
          (item) =>
            item.customer_name === selectedCustomer &&
            item.sub_customer_name === selectedSubCustomer &&
            item.active_yn === 'Y'
        )
        .map((item) => item.id)
    ),
  ];

  const handlePrint = async () => {
    if (!selectedCustomer) {
      alert('Please select customer.');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        customer_id: 201710168,
      });
      const response = await fetch(
        `http://localhost:8000/aircraft/pdf/?${params.toString()}`,
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
      console.error('Error fetching report:', error);
      alert('Error generating the report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Download Leading Particulars
      </Typography>

      <div style={{ marginBottom: '1rem' }}>
        <FormControl fullWidth style={{ maxWidth: 300, marginBottom: '1rem' }}>
          <InputLabel>Select MOD Form</InputLabel>
          <Select
            value="{selectedCustomer}"
            onChange={(e) => {
              setSelectedCustomer(e.target.value);
              setSelectedSubCustomer('');
              console.log(selectedSubCustomer);
            }}
            label="Select MOD Form"
          >
            {uniqueCustomers.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>

      <Button
        variant="contained"
        onClick={handlePrint}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={18} /> : null}
      >
        {loading ? 'Generating...' : 'Print User List'}
      </Button>
    </div>
  );
};

export default UserList;




//import React, { useState, useEffect } from 'react';
//import {
//  Typography,
//  Button,
//  CircularProgress,
//  MenuItem,
//  FormControl,
//  Select,
//  InputLabel,
//} from '@mui/material';
//import useTableApi from './Utils/useTableApi';
//
//const UserList = () => {
//  const { data, loading: tableLoading } = useTableApi('customers');
//  const [customerData, setCustomerData] = useState([]);
//  const [selectedCustomer, setSelectedCustomer] = useState('');
//  const [selectedSubCustomer, setSelectedSubCustomer] = useState('');
//  const [loading, setLoading] = useState(false);
//
//  useEffect(() => {
//    if (!tableLoading) {
//      setCustomerData(data);
//    }
//  }, [tableLoading, data]);
//
//  // Get unique customer names from active customers
//  const uniqueCustomers = [
//    ...new Set(
//      customerData
//        .filter((item) => item.active_yn === 'Y')
//        .map((item) => item.customer_name)
//    ),
//  ];
//
//  // Get unique sub-customers for selected customer
//  const subCustomers = [
//    ...new Set(
//      customerData
//        .filter(
//          (item) =>
//            item.customer_name === selectedCustomer &&
//            item.active_yn === 'Y'
//        )
//        .map((item) => item.sub_customer_name)
//    ),
//  ];
//
//  const handlePrint = async () => {
//    if (!selectedCustomer || !selectedSubCustomer) {
//      alert('Please select both customer and sub-customer.');
//      return;
//    }
//
//    setLoading(true);
//
//    try {
//      // Find the record matching both customer and sub-customer
//      const matchedCustomer = customerData.find(
//        (item) =>
//          item.customer_name === selectedCustomer &&
//          item.sub_customer_name === selectedSubCustomer
//      );
//
//      if (!matchedCustomer || !matchedCustomer.customer_id) {
//        alert('Matching customer ID not found.');
//        return;
//      }
//
//      const customerId = Number(matchedCustomer.customer_id);
//
//      const params = new URLSearchParams({
//        customer_id: customerId.toString(), // Ensure it's string in URL, but number in logic
//      });
//
//      const response = await fetch(
//        `http://localhost:8000/print-report/?${params.toString()}`,
//        {
//          method: 'GET',
//        }
//      );
//
//      if (!response.ok) {
//        throw new Error('Failed to generate report');
//      }
//
//      const blob = await response.blob();
//      const url = window.URL.createObjectURL(blob);
//
//      const link = document.createElement('a');
//      link.href = url;
//      link.download = 'user_list.pdf';
//      document.body.appendChild(link);
//      link.click();
//      document.body.removeChild(link);
//    } catch (error) {
//      console.error('Error fetching report:', error);
//      alert('Error generating the report');
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  return (
//    <div style={{ padding: '2rem', textAlign: 'center' }}>
//      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
//        Download User List
//      </Typography>
//
//      <div style={{ marginBottom: '1rem' }}>
//        <FormControl fullWidth style={{ maxWidth: 300, marginBottom: '1rem' }}>
//          <InputLabel>Customer</InputLabel>
//          <Select
//            value={selectedCustomer}
//            onChange={(e) => {
//              setSelectedCustomer(e.target.value);
//              setSelectedSubCustomer('');
//            }}
//            label="Customer"
//          >
//            {uniqueCustomers.map((name, index) => (
//              <MenuItem key={index} value={name}>
//                {name}
//              </MenuItem>
//            ))}
//          </Select>
//        </FormControl>
//
//        {selectedCustomer && (
//          <FormControl fullWidth style={{ maxWidth: 300 }}>
//            <InputLabel>Sub-Customer</InputLabel>
//            <Select
//              value={selectedSubCustomer}
//              onChange={(e) => setSelectedSubCustomer(e.target.value)}
//              label="Sub-Customer"
//            >
//              {subCustomers.map((subName, index) => (
//                <MenuItem key={index} value={subName}>
//                  {subName}
//                </MenuItem>
//              ))}
//            </Select>
//          </FormControl>
//        )}
//      </div>
//
//      <Button
//        variant="contained"
//        onClick={handlePrint}
//        disabled={loading}
//        startIcon={loading ? <CircularProgress size={18} /> : null}
//      >
//        {loading ? 'Generating...' : 'Print User List'}
//      </Button>
//    </div>
//  );
//};
//
//export default UserList;



//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import {
//  Typography,
//  Button,
//  CircularProgress,
//  MenuItem,
//  FormControl,
//  Select,
//  InputLabel,
//} from '@mui/material';
//import useTableApi from './Utils/useTableApi';
//
//const UserList = () => {
//  const { data, loading: tableLoading } = useTableApi('customers');
//  const [customerData, setCustomerData] = useState([]);
//  const [selectedCustomer, setSelectedCustomer] = useState('');
//  const [selectedSubCustomer, setSelectedSubCustomer] = useState('');
//  const [loading, setLoading] = useState(false);
//
//  useEffect(() => {
//    if (!tableLoading) {
//      setCustomerData(data);
//    }
//  }, [tableLoading, data]);
//
//  // Get unique customer names from active customers
//  const uniqueCustomers = [
//    ...new Set(
//      customerData
//        .filter((item) => item.active_yn === 'Y')
//        .map((item) => item.customer_name)
//    ),
//  ];
//
//  // Get unique sub-customers for selected customer
//  const subCustomers = [
//    ...new Set(
//      customerData
//        .filter(
//          (item) =>
//            item.customer_name === selectedCustomer && item.active_yn === 'Y'
//        )
//        .map((item) => item.sub_customer_name)
//    ),
//  ];
//
//  // Get customer ID for selected customer and sub-customer
//  const customerIds = [
//    ...new Set(
//      customerData
//        .filter(
//          (item) =>
//            item.customer_name === selectedCustomer &&
//            item.sub_customer_name === selectedSubCustomer &&
//            item.active_yn === 'Y'
//        )
//        .map((item) => item.id)
//    ),
//  ];
//
//  const handlePrint = async () => {
//    if (!selectedCustomer || !selectedSubCustomer) {
//      alert('Please select both customer and sub-customer.');
//      return;
//    }
//
//    const selectedCustomerId = customerIds[0];
//    if (!selectedCustomerId) {
//      alert('Customer ID not found. Please check your selection.');
//      return;
//    }
//
//    setLoading(true);
//    try {
//      const response = await axios.get('http://localhost:8000/print-report/', {
//        params: {
//          customer_id: selectedCustomerId,
//        },
//        responseType: 'blob', // important for binary data
//      });
//
//      // Create blob link to download
//      const url = window.URL.createObjectURL(new Blob([response.data]));
//      const link = document.createElement('a');
//      link.href = url;
//      link.setAttribute('download', 'user_list.pdf');
//      document.body.appendChild(link);
//      link.click();
//      link.remove();
//    } catch (error) {
//      console.error('Error fetching report:', error);
//      alert('Error generating the report');
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  return (
//    <div style={{ padding: '2rem', textAlign: 'center' }}>
//      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
//        Download User List
//      </Typography>
//
//      <div style={{ marginBottom: '1rem' }}>
//        <FormControl fullWidth style={{ maxWidth: 300, marginBottom: '1rem' }}>
//          <InputLabel>Customer</InputLabel>
//          <Select
//            value={selectedCustomer}
//            onChange={(e) => {
//              setSelectedCustomer(e.target.value);
//              setSelectedSubCustomer('');
//            }}
//            label="Customer"
//          >
//            {uniqueCustomers.map((name, index) => (
//              <MenuItem key={index} value={name}>
//                {name}
//              </MenuItem>
//            ))}
//          </Select>
//        </FormControl>
//
//        {selectedCustomer && (
//          <FormControl fullWidth style={{ maxWidth: 300 }}>
//            <InputLabel>Sub-Customer</InputLabel>
//            <Select
//              value={selectedSubCustomer}
//              onChange={(e) => setSelectedSubCustomer(e.target.value)}
//              label="Sub-Customer"
//            >
//              {subCustomers.map((subName, index) => (
//                <MenuItem key={index} value={subName}>
//                  {subName}
//                </MenuItem>
//              ))}
//            </Select>
//          </FormControl>
//        )}
//      </div>
//
//      <Button
//        variant="contained"
//        onClick={handlePrint}
//        disabled={loading}
//        startIcon={loading ? <CircularProgress size={18} /> : null}
//      >
//        {loading ? 'Generating...' : 'Print User List'}
//      </Button>
//    </div>
//  );
//};
//
//export default UserList;
