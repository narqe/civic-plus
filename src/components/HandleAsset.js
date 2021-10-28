import React from 'react'
import { useSelector, useDispatch }  from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import './HandleAsset.css'
import { addItem, editItem, resetData } from '../reducers/assetsReducer';
import { useSnackbar } from 'notistack';
import { Transition } from './shared/Transition/Transition';
import ListOfAssets from './Assets/ListOfAssets';
import Form from './Form/Form';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

const HandleAsset = ({status, onClose}) => { 
    const { enqueueSnackbar } = useSnackbar();
    const form = useSelector(state => state.assets.form)
    const assets = useSelector(state => state.assets.items)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(resetData())
        onClose()
    }

    const handleSave = () => {
        const id = uuidv4();
        dispatch(addItem({...form, id }));
        dispatch(resetData())
        enqueueSnackbar('Assets saved successfuly', { variant: 'success'}); 
    }

    const handleEdit = () => { 
        if(form.id !== '') {
            dispatch(editItem(form))
            dispatch(resetData())   
            enqueueSnackbar('Assets edited successfuly', { variant: 'success'});
        } else {
            enqueueSnackbar('Error editing asset (ID not found)', { variant: 'error'});
        }
    }

    const isValid = 
        !!form.name && form.name !== '' &&
        !!form.description && form.description !== '' &&
        !!form.publishedStatus && form.publishedStatus !== '' 
        && !!form.files.selectedFiles.length
    
    return (
        <Dialog 
            open={status} 
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogContent className="container">
                <div className="content-panel">
                    <Form dataForm={form} />
                    <ListOfAssets assets={assets} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' size="large">Cancel</Button>
                {form.id === '' && (<Button onClick={handleSave} variant='contained' disabled={!isValid} size="large" data-testid="test-button-save">Save</Button>)}
                {form.id !== '' && (<Button onClick={handleEdit} disabled={!isValid} variant='contained' size="large" data-testid="test-button-edit">Edit</Button>)}
            </DialogActions>
        </Dialog>
    )
}


HandleAsset.propTypes = {
    status: PropTypes.bool,
    onClose: PropTypes.func,
}

export default HandleAsset
