import React from 'react'
import PropTypes from 'prop-types'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button, IconButton } from '@mui/material';
import './Download.css'

const DownloadBox = ({item, index, onEditFn, onDeleteFn, onDownloadFn}) => {
    return (
        <div className="download-buttons">
            <Button onClick={onDownloadFn} size="small" variant='outlined'>
                <CloudDownloadIcon /> {item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name }
            </Button>    
            <IconButton variant="contained" color="default" onClick={onDeleteFn}>
                <DeleteIcon />
            </IconButton>
            <IconButton component="label" variant="contained" color="default" htmlFor={`file-upload-${index}`}>
                <EditIcon />
            </IconButton>
            <input 
                id={`file-upload-${index}`}
                data-testid={`button-download-${index}`}
                type="file" 
                name="file" 
                required
                onChange={onEditFn} 
            />
        </div>
    )
}

DownloadBox.propTypes = {
    item: PropTypes.object, 
    onEditFn: PropTypes.func, 
    onDeleteFn: PropTypes.func, 
    onDownloadFn: PropTypes.func
}

export default DownloadBox
