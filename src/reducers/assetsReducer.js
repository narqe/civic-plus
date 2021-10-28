const initialState = {
    form: {
        id: '',
        name: '',
        description: '',
        categories: '',
        tags: '',
        publishedStatus: '',
        files: {
            isSelected: false,
            selectedFiles: []
        }
    },
    items: []
}

export const setSelected = (content) => {
    return {
        type: '@assets/set_selected',
        content
    }
}

export const deleteSelected = (id) => {
    return {
        type: '@assets/delete_selected',
        id
    }
}

export const setData = (filter, content) => {
    return {
        type: '@assets/set_data',
        filter,
        content
    }
}

export const setFileData = (filter, content) => {
    return {
        type: '@assets/set_fileData',
        filter,
        content
    }
}

export const replaceFileData = (content, index) => {
    return {
        type: '@assets/replace_fileData',
        content,
        index
    }
}

export const deleteFileData = (index) => {
    return {
        type: '@assets/delete_fileData',
        index
    }
}

export const addData = (content) => {
    return {
        type: '@assets/add_data',
        content
    }
}


export const resetData = () => {
    return {
        type: '@assets/reset_data',
    }
}


export const addItem = (content) => {
    return {
        type: '@assets/add_item',
        content,
    }
}

export const editItem = (content) => {
    return {
        type: '@assets/edit_item',
        content
    }
}


export const assetsReducer = (state = initialState, action) => {

    if(action.type === '@assets/set_data') {
        return {
            ...state,
            form: {
                ...state.form,
                [action.filter]: action.content
            }
        }
    }

    if(action.type === '@assets/set_selected') {
        return {
            ...state,
            form: action.content
        }
    }

    if(action.type === '@assets/delete_selected') {
        const newArray = [...state.items];
        const objectToDelete = newArray.findIndex(match => match.id === action.id)

        newArray.splice(objectToDelete, 1)

        return {
            ...state,
            items: newArray
        }
    }

    if(action.type === '@assets/set_fileData') {
        return {
            ...state,
            form: {
                ...state.form,
                files: {
                    ...state.form.files,
                    [action.filter]: action.content
                }
            }
        }
    }


    if(action.type === '@assets/replace_fileData') {
        const newObject = {...state.form.files};
        newObject.selectedFiles[action.index] = action.content
        
        return {
            ...state,
            form: {
                ...state.form,
                files: newObject
            }
        }
    }

    if(action.type === '@assets/delete_fileData') {
        const newObject = {...state.form.files}
        newObject.selectedFiles.splice(action.index, 1)

        return {
            ...state,
            form: {
                ...state.form,
                files: newObject
            }
        }
    }

    if(action.type === '@assets/add_data') {
        return {
            ...state,
            form: {
                ...state.form,
                files: {
                    ...state.form.files,
                    selectedFiles:state.form.files.selectedFiles.concat(action.content),
                }
            }
        }
    }

    if(action.type === '@assets/add_item') {
        return {
            ...state,
            items: [
                ...state.items,
                action.content
            ]
        }
    }

    if(action.type === '@assets/edit_item') {
        let newItems = [...state.items];

        const itemIndex = newItems.findIndex((item) => {
            return item.id === action.content.id;
        });

        if (itemIndex >= 0) {
            newItems.splice(itemIndex, 1, action.content);
        }

        return {
            ...state,
            items: newItems
        };
    }

    if(action.type === '@assets/reset_data') {
        return  {
            ...state,
            form: initialState.form
        };
    }

    return state;
}
