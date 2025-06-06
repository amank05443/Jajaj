import {useEffect, useState} from "react";
import axios from "axios";

const QualForm = () => {
    const [abbreviation, setAbbreviation] = useState('')
    const [qual, setQual] = useState('');
    const [user_type, setUser_type] = useState('');
    const [quals, setQuals] = useState([]);
    const [showModal, setShowModal] = useState('');

    useEffect(() =>{
        fetchQualsData();
        }, []);

    const fetchQualsData = () => {
        axios.get('http://localhost:8000/api/qualsData')
            .then(response => setQuals(response.data))
            .catch(error => console.error('Error Quals:' , error));
            console.log(quals)
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const data = {
            abbreviation,
            qual,
            user_type
        };
        try{
            const response = await
                fetch('http://localhost:8000/api/quals',
                    {
                        method : 'POST',
                        headers : {'Content-Type': 'application/json'},
                        body : JSON.stringify(data),
                    });
            if (response.ok) {
                const jsonData = await response.json();
                alert('New quals added successfully ' + JSON.stringify(jsonData.user_type) + ' Thank You. ')
            }
            else{
                const err = await response.json()
                 alert('Error saving data' + JSON.stringify(err))
            }
        }
        catch(error){
            alert('Network error: ' + error.message)
        }
    };
    return (
        <div align="center">
            <h2>Add Qualification</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Abbreviation" value={abbreviation} onChange={e =>setAbbreviation(e.target.value)} required/>
                <input type="text" placeholder="Qualification" value={qual} onChange={e =>setQual(e.target.value)} required/>
                <input type="text" placeholder="User Type" value={user_type} onChange={e =>setUser_type(e.target.value)} required/>
                <button type='submit'>Save Qualification</button>
            </form>
            <h2>Qualification List</h2>
            <table border="1" cellPadding="8" >
                <thead>
                <tr>
                    <th>Abbreviation</th>
                    <th>Qualification</th>
                    <th>User Type</th>
                </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>a</td>
                        <td>b</td>
                        <td>c</td>
                    </tr>
                {quals.map((qual,index) => (
                    <tr key={index}>
                        <td>{qual.abbreviation}</td>
                        <td>{qual.qual}</td>
                        <td>{qual.user_type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

};

export default QualForm;