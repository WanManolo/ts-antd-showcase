import {
  Checkbox,
  DatePicker,
  Input,
  Layout,
  Menu,
  PageHeader,
  Select,
} from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import SubMenu from "antd/lib/menu/SubMenu";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { FC, Key, useState } from "react";

const { RangePicker } = DatePicker;

// Static values
const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5"];
const checkboxKeys = ["Received", "Printed", "Folded", "Sorted", "Delivered"];
const dateFormat = "DD/MM/YYYY";

/**
 * @name Props for Sidebar filtering component
 * @summary Holds the props definition for the table filters.
 *
 * @param dateFilter holds state for the date-picker component filter.
 * @param addressFilter holds state for the address input component filter.
 * @param statusFilter holds the state list of checked statuses on the checkbox group component filter.
 * @param groupFilter holds the state for the select group component filter.
 *
 * @function handleAddressFilter holds the function that will handle the input value for the address component filter.
 * @function handleDateFilter holds the function that will handle the input value for the date-picker component filter.
 * @function handleDateRangeFilter holds the function that will handle the range values for the range-picker component filter.
 * @function handleStatusFilter holds the function that will handle the list of values for the checkbox group component filter.
 * @function handleGroupFilter holds the function that will handle the select group component filter.∫
 */
export interface Props {
  dateFilter: string;
  addressFilter: string;
  statusFilter: CheckboxValueType[];
  groupFilter: string;
  handleAddressFilter: (value: string) => void;
  handleDateFilter: (dateString: string) => void;
  handleDateRangeFilter: (
    values: RangeValue<Moment>,
    formatString: [string, string]
  ) => void;
  handleStatusFilter: (options: CheckboxValueType[]) => void;
  handleGroupFilter: (group: string) => void;
}

/**
 * @name Sidebar Function Component extends {@link FC}
 * @summary Function component that will display a sider with a menu list containing filters to apply on the {@link DocumentTable} component.
 *
 * @param props {@link Props} to include. All mandatory.
 *
 * @returns Fragment {@link React.Fragment} containing the composition of elements to display the {@link Layout.Sider} with the filters.
 */
export const Sidebar: FC<Props> = ({
  dateFilter,
  addressFilter,
  statusFilter,
  groupFilter,
  handleAddressFilter,
  handleDateFilter,
  handleDateRangeFilter,
  handleStatusFilter,
  handleGroupFilter,
}) => {
  const [openKeys, setOpenKeys] = useState<Key[]>(["sub1"]);

  /**
   * @name onOpenChange
   * @summary identifies and sets the currently open meny entry to collapse all non active menu entries.
   * @param keys Array with active keys, only 1 should be present.
   */
  const onOpenChange = (keys: Key[]) => {
    const latestOpenKey: Key | undefined = keys.find(
      (key: Key) => openKeys.indexOf(key) === -1
    );
    if (
      latestOpenKey &&
      rootSubmenuKeys.indexOf(latestOpenKey.toString()) === -1
    ) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  /**
   * @name listFilters
   * @summary Helper function to render the {@link SubMenu} component structure for the {@link Menu} on the {@link Layout.Sider}
   * @returns Fragment {@link React.Fragment} containing the menu list and filters for the {@link DocumentTable} component.
   */
  const listFilters = () => {
    return (
      <>
        <SubMenu key="sub1" title="Address">
          <Menu.Item key="1.1">
            <Input
              data-testid="input-address"
              value={addressFilter}
              placeholder="Search Address"
              onChange={(e: any) => handleAddressFilter(e.target.value)}
            />
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Date" data-testid="menu-date-picker">
          <Menu.Item key="2.1">
            <DatePicker
              value={dateFilter === "" ? null : moment(dateFilter, dateFormat)}
              format={dateFormat}
              onChange={(m: any) =>
                handleDateFilter(m ? m.format(dateFormat).toLocaleString() : "")
              }
            />
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title="Status" data-testid="menu-status">
          <Checkbox.Group
            value={statusFilter}
            options={checkboxKeys}
            onChange={handleStatusFilter}
          />
        </SubMenu>
        <SubMenu key="sub4" title="Group" data-testid="menu-select-group">
          <Menu.Item key="4.1">
            <Select
              data-testid="select-group"
              value={groupFilter}
              defaultValue=""
              style={{ width: 120 }}
              onChange={(value: string) => handleGroupFilter(value)}
            >
              <Select.Option value="">None</Select.Option>
              <Select.Option value="1">Group 1</Select.Option>
              <Select.Option value="2">Group 2</Select.Option>
              <Select.Option value="3">Group 3</Select.Option>
              <Select.Option value="4">Group 4</Select.Option>
              <Select.Option value="5">Group 5</Select.Option>
            </Select>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" title="Date Range" data-testid="menu-range">
          <Menu.Item key="5.1">
            <RangePicker
              format={"DD/MM/YYYY"}
              onChange={(
                values: RangeValue<Moment>,
                formatString: [string, string]
              ) => {
                handleDateRangeFilter(values, formatString);
              }}
            />
          </Menu.Item>
        </SubMenu>
      </>
    );
  };

  return (
    <>
      <Layout.Sider
        data-testid="sidebar"
        width={"20%"}
        className="site-layout-background"
      >
        <PageHeader
          className="site-page-header site-layout-background"
          title="Filters"
        />
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          openKeys={openKeys.map((key: Key) => key.toString())}
          onOpenChange={onOpenChange}
        >
          {listFilters()}
        </Menu>
      </Layout.Sider>
    </>
  );
};
