import React, { useState, useEffect } from "react";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { Button } from "@mui/material";
const TestQuals = () => {
  const { params } = useParams();
  const { data, loading } = useTableApi("quals");
  const [formData, setFormData] = useState({abbreviation: '', })
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleOks = (id) => {
    console.log(id);
  };

  return (
    <>
{/*       <div> */}
{/*         <form onSubmit={handleSubmit}> */}
{/*           <h2>Quals Form</h2> */}
{/*           <input */}
{/*             type="text" */}
{/*             name="Abbreviation" */}
{/*             placeholder="Enter Abbreviation" */}
{/*             value={formData.abbreviation} */}
{/*             onChange={handleChange} */}
{/*             required */}
{/*           /> */}
{/*           <input */}
{/*             type="text" */}
{/*             name="Qualification" */}
{/*             placeholder="Enter Qualification" */}
{/*             value={formData.qual} */}
{/*             onChange={handleChange} */}
{/*             required */}
{/*           /> */}
{/*           <input */}
{/*             type="text" */}
{/*             name="User Type" */}
{/*             placeholder="Enter User Type" */}
{/*             value={formData.user_type} */}
{/*             onChange={handleChange} */}
{/*             required */}
{/*           /> */}
{/*           <button type="submit"> Save</button> */}
{/*         </form> */}
{/*       </div> */}
      {!loading && data && (
        <table>
          <thead>
            <tr>
              <td> ID </td>
              <td> Abbreviation </td>
              <td> Qual </td>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={index}>
                <td> {d.id} </td>
                <td> {d.abbreviation} </td>
                <td> {d.qual} </td>
                <td>
                  {" "}
                  <Button onClick={() => handleOks(d.id)}> view</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>{}</div>
    </>
  );
};
export default TestQuals;
