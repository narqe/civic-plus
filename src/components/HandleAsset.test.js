import HandleAsset from "./HandleAsset.js";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import {createStore, combineReducers} from 'redux'
import { assetsReducer } from "../reducers/assetsReducer.js";

test("HandleAsset component", () => {
    const reducer = combineReducers({
        assets: assetsReducer,
    })
  
    const store = createStore(reducer)
    
    render(
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <HandleAsset status={true} onClose={jest.fn()} />
            </SnackbarProvider>
        </Provider> 
    );

  expect(screen.getByTestId('test-tag-name')).toBeInTheDocument();
  expect(screen.getByTestId('test-tag-description')).toBeInTheDocument();
  expect(screen.getByTestId('test-tag-categories')).toBeInTheDocument();
  expect(screen.getByTestId('test-tag-tags')).toBeInTheDocument();
  expect(screen.getByTestId('test-tag-publishedStatus')).toBeInTheDocument();
  expect(screen.getByTestId('test-tag-uploader')).toBeInTheDocument();
  expect(screen.getByTestId('test-button-save')).toBeInTheDocument();
  expect(screen.getByTestId('test-button-save')).toBeDisabled();
});
