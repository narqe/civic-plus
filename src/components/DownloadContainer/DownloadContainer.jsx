import React from 'react'
import PropTypes from 'prop-types'
import DownloadBox from './DownloadBox'
import { replaceFileData, deleteFileData } from '../../reducers/assetsReducer';
import { useDispatch }  from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Transition } from '../shared/Transition/Transition';
import { DialogTitle } from '@mui/material';
import './Download.css'

const DownloadContainer = ({data, status, onClose}) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        onClose()
    }

    const downloadFile = (file) => {
        var data = new Blob([file], {type: file.type});
        var fileUrl = window.URL.createObjectURL(data);
        var tempLink = document.createElement('a');
        tempLink.href = fileUrl;
        tempLink.setAttribute('download', `${file.name}`);                
        tempLink.click();   

        return tempLink
    }

    const replaceHandler = (index) => (event) => {
		dispatch(replaceFileData(event.target.files[0], index))
	};

    const deleteHandler = (index) => (event) => {
		dispatch(deleteFileData(index))
	};
    
    return (
        <Dialog 
            open={status} 
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>{`Files for ${data.name}`}</DialogTitle>
            <DialogContent>
                <div className="download-container">
                    {!!data.files?.selectedFiles.length ? 
                        data.files.selectedFiles.map((file, i) => 
                            <DownloadBox
                                key={`download__${file.id}-${Math.random()}`} 
                                item={file}
                                onDownloadFn={() => downloadFile(file)}
                                onDeleteFn={deleteHandler(i)} 
                                onEditFn={replaceHandler(i)}
                                index={i}
                            />
                        ) : <h4>There is not files uploaded</h4>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

DownloadContainer.propTypes = {
    data: PropTypes.object,
    status: PropTypes.bool,
    onClose: PropTypes.func,
}

export default DownloadContainer
