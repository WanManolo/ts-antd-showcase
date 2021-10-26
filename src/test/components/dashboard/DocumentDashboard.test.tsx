import { render, screen } from "@testing-library/react";
import {
    DocumentDashboard,
    Props
} from "../../../components/dashboard/DocumentDashboard";
import "./matchMedia.mock";

//TODO - Review - Test fails because of [TypeError: window.matchMedia is not a function]
// Ref. https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
describe("<DocumentDashboard />", () => {
  function renderDashboard(props: Partial<Props> = {}) {
    return render(<DocumentDashboard {...props} />);
  }

  it("should render a sidebar and a table components", async () => {
    const { findByTestId } = renderDashboard();
    const sidebar = await findByTestId("sidebar");
    expect(sidebar).toBeVisible();
    const table = await findByTestId("table-component");
    expect(table).toBeVisible();
    const button = screen.getByText("Add Document");
    expect(button).toBeVisible();
  });
});
