import { render, screen } from "@testing-library/react";
import DownloadBox from "./DownloadBox.jsx";
import DownloadContainer from "./DownloadContainer.jsx";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import {createStore, combineReducers} from 'redux'
import { assetsReducer } from "../../reducers/assetsReducer.js";

test("DownloadBox component", () => {
    const item = {
        id: '12312313',
        name: 'This is a name test with 25 chars',
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
      <DownloadBox 
        item={item}
        index={2}
        onEditFn={jest.fn()} 
        onDeleteFn={jest.fn()}
        onDownloadFn={jest.fn()} 
      />
    );

  expect(screen.getByTestId('button-download-2')).toBeInTheDocument();
  expect(screen.getByText('This is a name test with ...')).toBeInTheDocument()
});

test("DownloadContainer component", () => {
  const item = {
      id: '12312313',
      name: 'Test',
      description: 'Description test',
      categories: 'Category 1',
      tags: 'Tag 1',
      publishedStatus: 'Published',
      files: {
          isSelected: false,
          selectedFiles: [{
            lastModified: 1630960751972,
            name: "Business_Result_2ed_Pre_Intermediate_Students_Book.pdf",
            size: 10621633,
            type: "application/pdf",
            webkitRelativePath: ""
          }]
      }
  }

const reducer = combineReducers({
    assets: assetsReducer,
})

const store = createStore(reducer)

render(
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <DownloadContainer 
          data={item}
          status={true}
          onClose={jest.fn()}
        />
      </SnackbarProvider>
    </Provider>
  );

expect(screen.getByText('Files for Test')).toBeInTheDocument()
expect(screen.getByText('Business_Result_2ed_Pre_I...')).toBeInTheDocument()
expect(screen.getByTestId('button-download-0')).toBeInTheDocument();
});
