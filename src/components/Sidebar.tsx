import { Checkbox, DatePicker, Divider, Layout, Menu, PageHeader } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useState } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const groupFilterOptions = ['1', '2', '3'];

export const Sidebar = (props: any) => {

    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [checkedList, setCheckedList] = useState(new Array<any>());
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const onChange = (list: any[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < groupFilterOptions.length);
        setCheckAll(list.length === groupFilterOptions.length);
    };

    const onCheckAllChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setCheckedList(e.target.checked ? groupFilterOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const onOpenChange = (keys: any) => {
        const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const listFilters = () => {

        return (
            <>
                <SubMenu key="sub1" title="Address">
                    <Menu.Item key="1.1">Address Filter</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="Date">
                    <Menu.Item key="2.1">
                        <DatePicker defaultValue={moment(new Date(), 'DD/MM/YYYY')} format={'DD/MM/YYYY'} onChange={(m: any) => props?.handleDateFilter(m ? m.format('DD/MM/YYYY') : '')} />
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title="Status">
                    <Menu.Item key="3.1">Status Filter</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title="Group">
                    <Menu.Item key="4.1">
                        <>
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Check all
                        </Checkbox>
                        <Divider />
                        <Checkbox.Group options={groupFilterOptions} value={checkedList} onChange={onChange} />
                        </>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" title="Date Range">
                    <Menu.Item key="5.1">
                        <RangePicker
                            defaultValue={[moment(new Date(), 'DD/MM/YYYY'), moment(new Date(), 'DD/MM/YYYY')]}
                            format={'DD/MM/YYYY'}
                        />
                    </Menu.Item>
                </SubMenu>
            </>
        );
    };

    return (
        <>
            <Layout.Sider width={200} className="site-layout-background">
                <PageHeader
                    className="site-page-header site-layout-background"
                    title="Filters"
                />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                >
                    {listFilters()}
                </Menu>
            </Layout.Sider>

        </>
    )
};
