import { render, screen } from "@testing-library/react";
import SelectCustom from "./SelectCustom.jsx";

test("SelectCustom component", () => {
    render(
        <SelectCustom multiple={false} value='Category 1' data={['Category 1', 'Category 2']} onChange={jest.fn()} />
    );

  expect(screen.getByTestId('select-custom-data-testid')).toBeInTheDocument();
  expect(screen.getByTestId('select-custom-data-testid')).toHaveTextContent('Category 1')
});
