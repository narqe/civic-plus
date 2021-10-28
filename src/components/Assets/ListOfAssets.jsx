import React from 'react'
import PropTypes from 'prop-types'; 
import { useDispatch }  from 'react-redux';
import { setSelected, deleteSelected } from '../../reducers/assetsReducer';
import BoxAsset from './BoxAsset';
import './ListOfAssets.css'

const ListOfAssets = ({assets}) => {
    const dispatch = useDispatch()

    const editAsset = (id) => () => {
        const itemSelected = assets.find(asset => asset.id === id);
        dispatch(setSelected(itemSelected))
    }

    const deleteAsset = (id) => () => {
        dispatch(deleteSelected(id))
    }

    return (
        !!assets.length ? 
            <div className="right-panel"> {
                assets.map(asset => 
                    <BoxAsset 
                        item={asset} 
                        key={`${asset.id}-${Math.random()}`} 
                        onEditFn={editAsset(asset.id)} 
                        onDeleteFn={deleteAsset(asset.id)} 
                    />
                )
            }
            </div> 
        : 
            <div className="right-panel empty">
                <h1>There's not assets uploaded. Complete the form to see results</h1>
            </div>
    )
}

ListOfAssets.propTypes = {
    assets: PropTypes.array,
}

export default ListOfAssets
