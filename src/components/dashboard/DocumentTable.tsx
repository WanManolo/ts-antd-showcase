
import { FC, Key, useEffect, useState } from "react";
import { Button, Col, Form, Input, Layout, PageHeader, Row, Select, Table } from 'antd';
import moment from 'moment';
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { TablePaginationConfig, TableRowSelection } from "antd/lib/table/interface";

/**
 * @name Document specification for the Document objects.
 * @summary Holds the attributes definitions for the Document objects to be displayed on the {@link DocumentDashboard} component.
 *
 * @param key Holds the value for the Document key attribute.
 * @param name Holds the value for the document's name attribute.
 * @param group Holds the value for the document's group attribute.
 * @param type Holds the value for the document's type attribute.
 * @param address Holds the value for the document's address attribute.
 * @param status Holds the value for the document's status attribute.
 * @param date Holds the string representation for the document's date attribute.
 * @param channel Holds the value for the document's channel attribute.
 * @param content Holds the value for the document's content attribute.
 * @function action Holds a function that could be applied to the owner document. Nullable.
 */
interface Document {
    key: string | number;
    name: string;
    group: string;
    type: string;
    address: string;
    status: string;
    date: string;
    channel: string;
    content: string;
    action: (() => void) | null;
}

// Static values
const dateFormat = 'DD/MM/YYYY';
const documents: Document[] = [
    { key: 0, name: 'Name Document 1', group: 'Group 1', type: 'type 1', status: 'Printed', address: 'Address 1', date: moment(new Date('01/31/2021'), dateFormat).format(dateFormat).toLocaleString(), channel: 'PDF', content: 'This is the content of the document 1', action: null, },
    { key: 1, name: 'Name Document 2', group: 'Group 2', type: 'type 2', status: 'Printed', address: 'Address 12', date: moment(new Date('01/01/2021'), dateFormat).format(dateFormat).toLocaleString(), channel: 'SMS', content: 'This is the content of the document 2', action: null, },
    { key: 2, name: 'Name Document 3', group: 'Group 3', type: 'type 1', status: 'Sorted', address: 'Address 123', date: moment(new Date('09/28/2021'), dateFormat).format(dateFormat).toLocaleString(), channel: 'PDF', content: 'This is the content of the document 3', action: null, },
    { key: 3, name: 'Name Document 4', group: 'Group 4', type: 'type 3', status: 'Received', address: 'Address 1234', date: moment(new Date('10/11/2021'), dateFormat).format(dateFormat).toLocaleString(), channel: 'SMS', content: 'This is the content of the document 4', action: null, }
];

/**
 * @name Props for {@link DocumentTable}
 * @summary Holds the props definition for the DocumentTable component
 *
 * @param dateFilter holds state for the date-picker component filter.
 * @param addressFilter holds state for the address input component filter.
 * @param statusFilter holds the state list of checked statuses on the checkbox group component filter.
 * @param groupFilter holds the state for the select group component filter.
 * @param dateRangeFilter holds the satte for the range-picker component filter.
 *
 * @function resetFilters Function to reset the values of a selected filter.
 */
interface Props {
    dateFilter: string;
    addressFilter: string;
    statusFilter: CheckboxValueType[];
    groupFilter: string;
    dateRangeFilter: string[];
    resetFilters: (filter: string) => void;
}

/**
 * @name DocumentTable Function Component extends {@link FC}
 * @summary Function component that will display a {@link Table} and an input form to add {@link Document} elements.
 *
 * @param props {@link Props} to include. All mandatory.
 *
 * @returns Fragment {@link React.Fragment} containing the composition of elements to display the {@link Table} with the array of {@link Document} and the form to add new ones.
 */
export const DocumentTable: FC<Props> = ({
    dateFilter,
    addressFilter,
    statusFilter,
    groupFilter,
    dateRangeFilter,
    resetFilters }) => {

    const [form] = Form.useForm();
    const [selectedColumn, setSelectedColumn] = useState<string>('date');
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [documentList, setDocumentList] = useState(documents);
    const [filteredDocuments, setFilteredDocuments] = useState(documents);
    const [tablePagination, setTablePagination] = useState<TablePaginationConfig>({
        total: documentList.length,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize: 10,
        defaultCurrent: 1,
        showSizeChanger: true,
    });

    /**
     * Helper function to sort objects
     *
     * @param a object to test if greater than b
     * @param b object to test if lesser than a
     * @returns -1 if a > b ; 1 if b >= a;
     */
    const sortFunction = (a: any, b: any) => 0 - (a > b ? 1 : -1);

    // Columns declaration
    const columns = [
        {
            title: 'Channel',
            dataIndex: 'channel',
            sorter: sortFunction,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: sortFunction,
            render: (name: string) => (<><a>{name}</a></>),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: sortFunction,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: sortFunction,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: sortFunction,
        },
        {
            title: 'Group',
            dataIndex: 'group',
            sorter: sortFunction,
            render: (group: string) => (<><a>{group}</a></>),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: sortFunction,
        },
    ];

    /**
     * @name onSelectChange
     * @summary Helper function to handle the change event on the selection patterns and rows for the {@link Table} component.
     * @param selectedRowKeys holds the selectedRowKeys values in an array of {@link Key}.
     */
    const onSelectChange = (selectedRowKeys: Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    // Row Selection Configuration object
    const rowSelection: TableRowSelection<Document> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    /**
     * @name handleResetColumnChange
     * @summary Helper function to handle the selected column to reset its associated filter.
     * @param value column name to reset filter.
     */
    const handleResetColumnChange = (value: string) => {
        setSelectedColumn(value);
    };

    /**
     * @name handleAdd
     * @summary Helper function to add static objects with dynamic attributes like the key, the name and the date.
     * @see {@link Document}
     */
    const handleAdd = () => {
        const newData: Document = {
            key: documentList.length.toString(),
            name: form.getFieldValue("name") ? form.getFieldValue("name") : `New Document ${documentList.length + 1}`,
            group: 'Group 5',
            type: 'type 3',
            address: 'Address 1234',
            status: 'Sorted',
            date: moment(new Date(), dateFormat).format(dateFormat).toLocaleString(),
            channel: 'WEB',
            content: `This is the content of ${documentList.length + 1}`,
            action: null,
        };
        setDocumentList([...documentList, newData]);
        form.resetFields(["name"]);
    };

    /**
     * @name tableTitle
     * @summary Helper function to render the header composition to be included in the main {@link Table} component.
     * @returns a HTML structured {@link Row} component that contains the {@link Select} component and the reset {@link Button} to clear the filters of the selected column.
     */
    const tableTitle = () => {
        return (
            <Row>
                <Col span={3}>Dashboard</Col>
                <Col span={2} offset={17}>
                    <Select defaultValue="date" onChange={(value: string) => handleResetColumnChange(value)}>
                        <Select.Option value="date">Date</Select.Option>
                        <Select.Option value="address">Address</Select.Option>
                        <Select.Option value="status">Status</Select.Option>
                        <Select.Option value="group">Group</Select.Option>
                    </Select></Col>
                <Col span={2}><Button onClick={() => resetFilters(selectedColumn)}>Reset</Button></Col>
            </Row>
        );
    }

    /**
     * Effect to render the updates on filters and apply them to the displayed document list.
     */
    useEffect(() => {
        const newList = documentList
            .filter((doc: Document) => dateFilter === '' || doc.date === dateFilter)
            .filter((doc: Document) => addressFilter === '' || doc.address.includes(addressFilter))
            .filter((doc: Document) => statusFilter.length === 0 || statusFilter.some((sf) => doc.status === sf))
            .filter((doc: Document) => groupFilter === '' || doc.group.includes(groupFilter))
            .filter((doc: Document) => {
                return dateRangeFilter.length === 0 || dateRangeFilter[0] === '' || dateRangeFilter[1] === ''
                    || (moment(dateRangeFilter[0], dateFormat).unix() <= moment(doc.date, dateFormat).unix() && moment(dateRangeFilter[1], dateFormat).unix() >= moment(doc.date, dateFormat).unix())
            });
        setFilteredDocuments(newList);
        setTablePagination({
            total: filteredDocuments.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            defaultPageSize: 10,
            defaultCurrent: 1,
            showSizeChanger: true,
        });
    }, [documentList, addressFilter, dateFilter, statusFilter, groupFilter, dateRangeFilter, filteredDocuments.length]);

    return (
        <>
            <Layout>
                <PageHeader
                    className="site-page-header site-layout-background"
                    title="Document Browser"
                />
                <div>
                    <Layout>
                        <Layout.Content className="site-layout-background">
                            <Form form={form} layout='inline'>
                                <Form.Item name="name" label="Document Name">
                                    <Input placeholder="New Document" />
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                                        Add a Document
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Layout.Content>
                    </Layout>
                    <Layout>
                        <Layout.Content className="site-layout-background">
                            <Table
                                expandable={{ expandedRowRender: (record: any) => <p>{record.content}</p> }}
                                showHeader={true}
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={filteredDocuments}
                                title={tableTitle}
                                pagination={tablePagination}
                            />
                        </Layout.Content>
                    </Layout>
                </div>
            </Layout>
        </>
    );
}
