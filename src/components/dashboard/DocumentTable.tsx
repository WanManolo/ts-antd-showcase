
import { FC, Key, useEffect, useState } from "react";
import { Button, Col, Form, Input, Layout, PageHeader, Row, Select, Table } from 'antd';
import moment from 'moment';
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { TablePaginationConfig, TableRowSelection } from "antd/lib/table/interface";

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

const dateFormat = 'DD/MM/YYYY';

const documents: Document[] = [
    { key: 0, name: 'Name Document 1', group: 'Group 1', type: 'type 1', status: 'Printed', address: 'Address 1', date: moment(new Date('01/31/2021'), dateFormat).format(dateFormat).toLocaleString(), channel: 'PDF', content: 'This is the content of the document 1', action: null, },
    { key: 1, name: 'Name Document 2', group: 'Group 2', type: 'type 2', status: 'Printed', address: 'Address 12', date: moment(new Date('01/01/2021'), dateFormat).format(dateFormat).toLocaleString(), channel: 'SMS', content: 'This is the content of the document 2', action: null, },
    { key: 2, name: 'Name Document 3', group: 'Group 3', type: 'type 1', status: 'Sorted', address: 'Address 123', date: moment(new Date('09/28/2021'), dateFormat).format(dateFormat).toLocaleString(), channel: 'PDF', content: 'This is the content of the document 3', action: null, },
    { key: 3, name: 'Name Document 4', group: 'Group 4', type: 'type 3', status: 'Received', address: 'Address 1234', date: moment(new Date('10/11/2021'), dateFormat).format(dateFormat).toLocaleString(), channel: 'SMS', content: 'This is the content of the document 4', action: null, }
];

const sortFunction = (a: any, b: any) => 0 - (a > b ? 1 : -1);

interface Props {
    dateFilter: string;
    addressFilter: string;
    statusFilter: CheckboxValueType[];
    groupFilter: string;
    resetFilters: (filter: string) => void;
}

export const DocumentTable: FC<Props> = ({ dateFilter, addressFilter, statusFilter, groupFilter, resetFilters }) => {
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

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection: TableRowSelection<Document> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const handleDelete = (key: string | number) => {
        setDocumentList(documentList.filter((item: Document) => item.key !== key));
    };

    const handleResetColumnChange = (value: string) => {
        setSelectedColumn(value);
    };

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

    useEffect(() => {
        const newList = documentList
            .filter((doc: Document) => dateFilter === '' || doc.date === dateFilter)
            .filter((doc: Document) => addressFilter === '' || doc.address.includes(addressFilter))
            .filter((doc: Document) => statusFilter.length === 0 || statusFilter.some((sf) => doc.status === sf))
            .filter((doc: Document) => groupFilter === '' || doc.group.includes(groupFilter));
        setFilteredDocuments(newList);
        setTablePagination({
            total: documentList.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            defaultPageSize: 10,
            defaultCurrent: 1,
            showSizeChanger: true,
        });
    }, [documentList, addressFilter, dateFilter, statusFilter, groupFilter]);

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
