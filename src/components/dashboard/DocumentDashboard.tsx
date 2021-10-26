import { Layout } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { FC, useEffect, useState } from "react";
import { DocumentTable } from "./DocumentTable";
import { Sidebar } from "./Sidebar";

export interface Props {
  // No props
}

/**
 * @name DocumentDashboard Function Component extends {@link FC}
 * @summary Function component that will display a {@link DocumentTable} and a {@link Layout.Sider} component to filter the table.
 *
 * @param props {@link Props} to include. No props.
 *
 * @returns Fragment {@link React.Fragment} containing the composition of elements to display the {@link DocumentTable} and the {@link Sidebar} component.
 */
export const DocumentDashboard: FC<Props> = () => {
  const [dateFilter, setDateFilter] = useState<string>("");
  const [addressFilter, setAddressFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [groupFilter, setGroupFilter] = useState<string>("");
  const [dateRangeFilter, setDateRangeFilter] = useState<string[]>([]);
  const [checkboxGroupStatus, setCheckBoxGroupStatus] = useState<
    CheckboxValueType[]
  >([]);

  /**
   * @name clearFilters
   * @summary Helper function to reset the filters of a given column name.
   * @param column name.
   */
  const clearFilters = (column: string) => {
    switch (column) {
      case "date":
        setDateFilter("");
        break;
      case "address":
        setAddressFilter("");
        break;
      case "status":
        setStatusFilter([]);
        break;
      case "group":
        setGroupFilter("");
        break;
      default:
        break;
    }
  };

  /**
   * @name handleStatusFilter
   * @summary Helper function to handle the onChange event on the status filter.
   * @param options checked values.
   */
  const handleStatusFilter = (options: CheckboxValueType[]) => {
    setCheckBoxGroupStatus(options);
  };

  /**
   * @name handleDateFilter
   * @summary Helper function to handle the onChange event on the date filter.
   * @param date string representation.
   */
  const handleDateFilter = (date: string) => {
    setDateFilter(date);
  };

  /**
   * @name handleAddressFilter
   * @summary Helper function to handle the onChange event on the address filter.
   * @param address value.
   */
  const handleAddressFilter = (address: string) => {
    setAddressFilter(address);
  };

  /**
   * @name handleGroupFilter
   * @summary Helper function to handle the onChange event on the group filter.
   * @param group selected option.
   */
  const handleGroupFilter = (group: string) => {
    setGroupFilter(group);
  };

  /**
   * @name handleDateRangeFilter
   * @summary Helper function to handle the onChange event on the range date filter.
   * @param values date type parameter. Not used.
   * @param formatString array of formatted dates, used to parse the date range.
   */
  const handleDateRangeFilter = (
    values: RangeValue<Moment>,
    formatString: [string, string]
  ) => {
    setDateRangeFilter(formatString);
  };

  // Effect to handle the changes on the state filter list and prepare the state for the components.
  useEffect(() => {
    let states: string[] = [];
    checkboxGroupStatus.forEach((cs) => {
      states.push(cs.toString());
    });
    setStatusFilter(states);
  }, [checkboxGroupStatus]);

  return (
    <>
      <Layout>
        <Sidebar
          dateFilter={dateFilter}
          addressFilter={addressFilter}
          statusFilter={statusFilter}
          groupFilter={groupFilter}
          handleDateFilter={handleDateFilter}
          handleAddressFilter={handleAddressFilter}
          handleStatusFilter={handleStatusFilter}
          handleDateRangeFilter={handleDateRangeFilter}
          handleGroupFilter={handleGroupFilter}
        />
        <Layout.Content className="site-layout-background">
          <DocumentTable
            dateFilter={dateFilter}
            addressFilter={addressFilter}
            statusFilter={statusFilter}
            groupFilter={groupFilter}
            dateRangeFilter={dateRangeFilter}
            resetFilters={clearFilters}
          />
        </Layout.Content>
      </Layout>
    </>
  );
};
