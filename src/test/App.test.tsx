import { render, screen } from "@testing-library/react";
import App from "../App";

// Test Suite for App component
describe("<App />", () => {
  // Default boilerplate test
  it("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should contain a visible Header component", async () => {
    const { findByTestId } = render(<App />);
    const header = await findByTestId("header-component");
    expect(header).toBeVisible();
  });

  it("should contain a visible Breadcrumb component", async () => {
    const { findByTestId } = render(<App />);
    const breadcrumb = await findByTestId("breadcrumb-component");
    expect(breadcrumb).toBeVisible();
  });
});
