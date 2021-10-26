import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Props, Sidebar } from "../../../components/dashboard/Sidebar";

describe("<Sidebar />", () => {
  function renderSidebar(props: Partial<Props> = {}) {
    const defaultProps: Props = {
      handleAddressFilter() {
        return;
      },
      handleDateFilter() {
        return;
      },
      handleDateRangeFilter() {
        return;
      },
      handleStatusFilter() {
        return;
      },
      handleGroupFilter() {
        return;
      },
      dateFilter: "",
      addressFilter: "",
      statusFilter: [],
      groupFilter: "",
    };
    return render(<Sidebar {...defaultProps} {...props} />);
  }

  it("should render all the filters entries", () => {
    renderSidebar();

    const addressElement = screen.getByText(/Address/i);
    const dateElement = screen.getByText("Date", { exact: true });
    const statusElement = screen.getByText(/Status/i);
    const groupElement = screen.getByText(/Group/i);
    const dateRangeElement = screen.getByText(/Date Range/i);

    expect(addressElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(groupElement).toBeInTheDocument();
    expect(dateRangeElement).toBeInTheDocument();
  });

  it("should reflect changes on address input", async () => {
    const onAddressChange = jest.fn();
    const { findByTestId } = renderSidebar({
      handleAddressFilter: onAddressChange,
    });
    const address = await findByTestId("input-address");

    fireEvent.change(address, { target: { value: "Address" } });
    expect(onAddressChange).toHaveBeenCalledWith("Address");
  });

  it("should contain group select options", async () => {
    const onGroupChange = jest.fn();
    const { findByTestId } = renderSidebar({
      handleGroupFilter: onGroupChange,
    });

    fireEvent.click(screen.getByText(/Group/i));
    const group = await findByTestId("select-group");
    const element = group.firstElementChild;

    element && fireEvent.mouseDown(element);
    await waitFor(() =>
      expect(screen.getByText("Group 3", { exact: true })).toBeInTheDocument()
    );
  });
});
