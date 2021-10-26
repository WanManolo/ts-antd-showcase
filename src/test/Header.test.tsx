import { render, screen } from "@testing-library/react";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { Props } from "../components/breadcrumb/BreadCrumb";
import { Header } from "../components/Header";

describe("<Header />", () => {
  function renderHeader(props: Partial<Props> = {}) {
    const routerProps = { history: createBrowserHistory() };
    const defaultProps: Props = {
      selectedEntry: "",
      setSelectedEntry() {
        return;
      },
    };
    return render(
      <Router {...routerProps}>
        <Header {...defaultProps} {...props} />
      </Router>
    );
  }

  it("should render all the menu entries", () => {
    renderHeader();

    const homeElement = screen.getByText(/Home/i);
    const documentsElement = screen.getByText(/Documents/i);

    expect(homeElement).toBeInTheDocument();
    expect(documentsElement).toBeInTheDocument();
  });
});
