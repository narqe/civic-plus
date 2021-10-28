import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './BoxAssets.css'

const BoxAsset = ({item, onEditFn, onDeleteFn}) => {
    return (
        <div className="box-asset" data-testid="box-asset-testid">
            <h4 className="box-asset--title">{item.name}</h4>
            <p className="box-asset--status"><span className={`status-${item.publishedStatus}`}>{item.publishedStatus}</span></p>
            <p className="box-asset--categories">{item.categories ? `Category: ${item.categories}` : 'Uncategorized'}</p>
            <div className="box-asset-actions">
                <IconButton variant="contained" color="default" onClick={onDeleteFn} data-testid="delete-asset">
                    <DeleteIcon />
                </IconButton>
                <IconButton variant="contained" color="default" onClick={onEditFn} data-testid="edit-asset">
                    <EditIcon />
                </IconButton>
            </div>
        </div>
    )
}

BoxAsset.propTypes = {
    item: PropTypes.object,
    onEditFn: PropTypes.func,
    onDeleteFn: PropTypes.func,
}

export default BoxAsset
