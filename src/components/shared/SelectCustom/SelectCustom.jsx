import React from 'react'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Chip, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectCustom = ({multiple, value, data, onChange}) => {
    return (
        <Select 
            data-testid="select-custom-data-testid"
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            margin="dense"
            fullWidth
            variant="outlined"
            value={value}
            onChange={onChange}
            input={<OutlinedInput id="select-multiple-chip" label="Published Status" />}
            renderValue={(selected) => 
                multiple ? 
                    (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>)
                 : selected
            }
            MenuProps={MenuProps}
            required
        >
        {data.map((status) => (
            <MenuItem
                key={status}
                value={status}
            >
                {status}
            </MenuItem>
        ))}
        </Select>
    )
}

SelectCustom.propTypes = {
    data: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
    multiple: PropTypes.bool
}

export default SelectCustom
