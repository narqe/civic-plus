import { render, screen } from "@testing-library/react";
import BoxAsset from "./BoxAsset.jsx";
import ListOfAssets from "./ListOfAssets.jsx";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import {createStore, combineReducers} from 'redux'
import { assetsReducer } from "../../reducers/assetsReducer.js";

test("BoxAsset component", () => {
    const item = {
        id: '12312313',
        name: 'BoxAsset component',
        description: 'Description test',
        categories: 'Category 1',
        tags: 'Tag 1',
        publishedStatus: 'Published',
        files: {
            isSelected: false,
            selectedFiles: []
        }
    }

    render(
      <BoxAsset 
        item={item}
        onEditFn={jest.fn()} 
        onDeleteFn={jest.fn()}
      />
    );

  expect(screen.getByText('BoxAsset component')).toBeInTheDocument()
  expect(screen.getByText('Category: Category 1')).toBeInTheDocument()
  expect(screen.getByText('Published')).toBeInTheDocument()
});

test("ListOfAssets component", () => {

    const items = [{
        id: '12312313',
        name: 'BoxAsset 1',
        description: 'Description 1',
        categories: 'Category 1',
        tags: 'Tag 1',
        publishedStatus: 'Published',
        files: {
            isSelected: false,
            selectedFiles: []
        }
    }, {
        id: '12312314',
        name: 'BoxAsset 2',
        description: 'Description 2',
        categories: 'Category 2',
        tags: 'Tag 2',
        publishedStatus: 'Published',
        files: {
            isSelected: false,
            selectedFiles: []
        }
    }]

    const reducer = combineReducers({
        assets: assetsReducer,
    })

    const store = createStore(reducer)

    render(
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <ListOfAssets 
                    assets={items}
                />
            </SnackbarProvider>
        </Provider>
    );

    expect(screen.getAllByTestId('box-asset-testid')).toHaveLength(2)
});
