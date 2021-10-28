import React from 'react'
import { addData, setData, setFileData } from '../../reducers/assetsReducer';
import { Button, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useDispatch }  from 'react-redux';
import SelectCustom from '../shared/SelectCustom/SelectCustom';
import PropTypes from 'prop-types'
import DownloadContainer from '../DownloadContainer/DownloadContainer';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import './Form.css'

const tags = [
    'Tag 1',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    'Tag 5',
];

const categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
];

const publishedStatus = [
    'Draft',
    'Published',
    'Deleted',
];

const Form = ({dataForm}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

	const changeHandler = (event) => {
        dispatch(setFileData('isSelected', true))
		dispatch(addData(Array.from(event.target.files)))
	};

    const onChange = (property) => ({target: {value}}) => {
        if(property === 'tags' || property === 'categories') {
            dispatch(setData(property, typeof value === 'string' ? value.split(',') : value))
        } else {
            dispatch(setData(property, value))
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="left-panel">
            <TextField
                margin="dense"
                id="name"
                label="Name"
                data-testid="test-tag-name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={onChange('name')}
                value={dataForm.name || '' }
                required
                inputProps={{ maxLength: 30 }}
            />
            <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                data-testid="test-tag-description"
                fullWidth
                variant="outlined"
                onChange={onChange('description')}
                value={dataForm.description || ''}
                required    
                inputProps={{ maxLength: 45 }}

            />
            <FormControl sx={{my: 1, width: '100%' }} data-testid="test-tag-categories">
                <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
                <SelectCustom 
                    multiple={true} 
                    value={dataForm.categories} 
                    data={categories} 
                    onChange={onChange('categories')}
                />
            </FormControl>
            <FormControl sx={{my: 1, width: '100%' }} data-testid="test-tag-tags">
                <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                <SelectCustom 
                    multiple={true} 
                    value={dataForm.tags} 
                    data={tags} 
                    onChange={onChange('tags')}
                />
            </FormControl>
            <FormControl sx={{my: 1, width: '100%' }} data-testid="test-tag-publishedStatus">
                <InputLabel id="demo-multiple-chip-label">Published Status</InputLabel>
                <SelectCustom 
                    multiple={false} 
                    value={dataForm.publishedStatus} 
                    data={publishedStatus} 
                    onChange={onChange('publishedStatus')}
                />
            </FormControl>
            <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fa fa-cloud-upload"></i> 
                {dataForm.files?.isSelected && !!dataForm.files.selectedFiles.length ? (`${dataForm.files.selectedFiles.length} file${dataForm.files.selectedFiles.length === 1 ? '' : 's'} selected`) : 'Tap here to upload files (0 files selected) *' }
            </label>
            <input 
                data-testid="test-tag-uploader"
                id="file-upload"
                type="file" 
                multiple 
                name="file" 
                required
                onChange={changeHandler} 
            /><hr />
            {dataForm.id !== '' && dataForm.files && (
                <Button 
                    variant="outlined" 
                    onClick={handleClickOpen}
                >
                    <FileCopyIcon /> View Updated Files
                </Button>
            )}
            <DownloadContainer data={dataForm} status={open} onClose={handleClose} />
        </div>
    )
}

SelectCustom.propTypes = {
    dataForm: PropTypes.object,
}

export default Form
