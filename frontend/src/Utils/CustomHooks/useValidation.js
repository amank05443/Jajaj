import { useState } from "react";
const useValidation = (initialValues = {}, rules = {}) => {
  const [formData, setFormData] = useState(initialValues);
//  const [prevFormData, setPrevFormData] = useState(initialValues);
  const [validValues, setValidValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const fieldRules = rules[name] || {};
    const customMessages = fieldRules.messages || {};
    let err = "";
    if (!value && fieldRules.required) err = customMessages.required || " This field is required";
    else if (fieldRules.numbersOnly && !/^[0-9]*$/.test(value)) err = customMessages.numbersOnly || " Numbers only";
    else if (fieldRules.capsOnly && !/^[A-Z]*$/.test(value)) err = customMessages.capsOnly || " Uppercase letters only";
    else if (fieldRules.lettersOnly && !/^[A-Za-z]*$/.test(value)) err = customMessages.lettersOnly || " Letters only";
    else if (fieldRules.alphaNumeric && !/^[A-Za-z0-9 ]*$/.test(value)) err = customMessages.alphaNumeric || " Letters and Numbers only";
    else if (fieldRules.noSpecial && !/^[A-Za-z0-9]*$/.test(value)) err = customMessages.noSpecial || " No Special Characters";
    else if (fieldRules.decimal && !/^\d+(\.\d+)?$/.test(value)) err = customMessages.decimal || " Must be a valid number (decimals allowed)";

//    else if (fieldRules.passkey && !/^[0-9]{6}$/.test(value)) err = customMessages.phone || " Passkey must be 06 digits";
    else if (fieldRules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = customMessages.email || " Invalid email format";
    else if (fieldRules.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value))
        err = customMessages.password || " Password must be 8+ chars, include upper, lower, number & special char";
    else if (fieldRules.matchField && value !== formData[fieldRules.matchField]) err = customMessages.matchField || "Fields do not match";
    else if (fieldRules.maxLength && value.length > fieldRules.maxLength) err = customMessages.maxLength || `Max ${fieldRules.maxLength} characters`;
    else if (fieldRules.minLength && value.length < fieldRules.minLength && value.length > 0 ) err = customMessages.minLength || `Min ${fieldRules.minLength} characters`;
    else if (fieldRules.range && value) {
      const num = Number(value);
      const {min, max} = fieldRules.range;
      if (num < min || num > max ) err = customMessages.range || `Value must be between ${min} and ${max}`;
    }
    else if (fieldRules.phone) {
        if(!value) err= "Phone is required";
        else if (!/^[0-9]*$/.test(value)) err= "Only digits allowed"
        else if (value.length > 10) err= "Phone must be 10 digits"
    }
    else if (fieldRules.passkey) {
        if(!value) err= "Passkey is required";
        else if (!/^[0-9]*$/.test(value)) err= "Only digits allowed"
        else if (value.length > 6) err= "Passkey must be 06 digits"
    }
    else if (fieldRules.dateNotAfterToday && value) {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate > today) err = customMessages.dateNotAfterToday || "Date must not be later than today";
    }
    else if (fieldRules.dateNotBeforeToday && value) {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate < today) err = customMessages.dateNotBeforeToday || "Date must not be before to Date.";
    }
    else if (fieldRules.dateTimeNotAfterNow && value) {
      const inputDateTime = new Date(value);
      const now = new Date();
      if (inputDateTime > now) err = customMessages.dateTimeNotAfterNow || "Date and time must not be in the future.";
    }
    else if (fieldRules.dateTimeNotBeforeNow && value) {
      const inputDateTime = new Date(value);
      const now = new Date();
      if (inputDateTime < now) err = customMessages.dateTimeNotBeforeNow || "Date and time can not before to Date.";
    }
    return err;
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((name) => {
      newErrors[name] = validateField(name, formData[name]);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  //    const handleChange = (e) => {
  //        const {name, value} = e.target;
  //        setFormData((prev) => ({ ...prev, [name]: value}));
  //        setErrors((prev) => ({ ...prev, [name]: validateField(name, value)}));
  //    };
  const handleChange = (e) => {
    const { name, value } = e.target;
    //        const newFormData ={ ...formData, [name]: value};
    const error = validateField(name, value);

    if (error) {
      //            setFormData(prevFormData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      const newFormData = { ...formData, [name]: value };
      setFormData(newFormData);
      setValidValues(newFormData);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  return {
    formData,
    errors,
    handleChange,
    validateAll,
    setFormData,
    setErrors,
    validateField,
  };
};
export default useValidation;
