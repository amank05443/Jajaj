import React,{useState} from 'react';
import {
    TextField,Select,MenuItem,Button,Box,FormControl,InputLabel,FormHelperText,Alert,Checkbox,Typography
} from '@mui/material';
import useTableApi from './useTableApi';

const MAX_FILE_SIZE_MB = 2;
const ALLOWED_FILE_TYPES = ['image/png','image/jpeg'];

export default function CustomForm({
    fields,tableName,initialValues = {},
    onSuccess,submitButtonLabel = 'Submit',})
{
    const [formData,setFormData] = useState(initialValues);
    const [errors,setErrors] = useState({});
    const [formStatus,setFormStatus] = useState({type:'',message:''});
    const [submitting,setSubmitting] = useState(false);
    const {create,update} = useTableApi(tableName);

    const validate = () => {
        const newErrors = {}
        fields.forEach((field) => {
            const value = formData[field.name];
            if (field.required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))){
                newErrors[field.name] = `${field.label} is required.`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData(prev => ({...prev,[name]:value}));
    };

    const handleCheckboxChange = (e) => {
        const {name,checked} = e.target;
        setFormData(prev => ({...prev,[name]:checked}));
    };

    const handleMultiSelectChange = (name,value) => {
        setFormData(prev => ({...prev,[name]:value}));
    };

    const handleFileChange = (field,file) => {
        if(!file) return;

        if(!ALLOWED_FILE_TYPES.includes(file.type)){
            setErrors(prev => ({...prev,[field.name]:'Invalid file type'}));
            return;
        }

        const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
        if(file.size > maxBytes){
            setErrors(prev => ({...prev,[field.name]:`Max file size is ${MAX_FILE_SIZE_MB}MB`}));
            return;
        }

        const reader = new FileReader();
        reader.onloadend=() => {
            setFormData(prev => ({...prev,[field.name]:reader.result}));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!validate()) return;

        setSubmitting(true);
        const id = formData?.id;

        try {
            id ? await update(id,formData) : await create(formData);
            setFormStatus({type:'success',message:'saved successfully.'});
            if(onSuccess) onSuccess();
        } catch(err) {
            const detail = err.response?.data?.detail || 'Submission failed.';
            setFormStatus({type:'error',message:detail});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{display:'grid',gap:2}}>
            {formStatus.message && (
                <Alert severity={formStatus.type}>{formStatus.message}</Alert>
            )}

            {fields.map((field) => (
                <FormControl key={field.name} fullWidth error={Boolean(errors[field.name])}>
                    {field.type === 'text' || field.type === 'number' || field.type === 'email'? (
                        <TextField label={field.label} name={field.name} type={field.type} value={formData[field.name] || ''}
                            onChange={handleChange} required={field.required} fullWidth
                        />
                    ) : field.type === 'select' ? (
                        <>
                            <InputLabel>{field.label}</InputLabel>
                            <Select name={field.name} value={formData[field.name] || ''}
                                onChange={handleChange}
                            >
                                {field.options.map(opt => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                    ) : field.type === 'multi-select' ? (
                        <>
                            <InputLabel>{field.label}</InputLabel>
                            <Select multiple name={field.name} value={formData[field.name] || []}
                                onChange={(e) => handleMultiSelectChange(
                                    field.name,
                                    typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
                                )}
                                renderValue={(selected) => selected.map(id => field.options.find(opt => opt.value === id)?.label || id)
                                    .join(', ')
                                }
                            >
                                {field.options.map(opt => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                    ) : field.type === 'date' ? (
                        <TextField label={field.label} name={field.name} type="date" value={formData[field.name] || ''}
                            onChange={handleChange} InputLabelProps={{shrink:true}} fullWidth
                        />
                    ) : field.type === 'checkbox' ? (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Checkbox checked={formData[field.name] || false} onChange={handleCheckboxChange} name={field.name} />
                            <Typography>{field.label}</Typography>
                        </Box>
                    ) : field.type === 'file' ? (
                        <>
                            <InputLabel>{field.label}</InputLabel>
                            <input type="file" accept={ALLOWED_FILE_TYPES.join(',')} onChange={(e) =>handleFileChange(field, e.target.files[0])} />
                        </>
                    ) : null }
                    {errors[field.name] && (
                        <FormHelperText>{errors[field.name]}</FormHelperText>
                    )}
                </FormControl>
            ))}
            <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? 'Saving...' : submitButtonLabel}
            </Button>
        </Box>
    );
}