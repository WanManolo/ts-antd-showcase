
import { useEffect, useState } from "react";
import { Button, Form, Input, Layout, PageHeader, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from "moment";

const documents: any = [
    { key: 0, name: 'Name Document 1', group: 'Group 1', type: 'type 1', status: 'Printed', address: 'Address 1', date: '31/01/2021', channel: 'PDF', content: 'This is the content of the document 1', action: null, },
    { key: 1, name: 'Name Document 2', group: 'Group 2', type: 'type 2', status: 'Printed', address: 'Address 12', date: '1/01/2021', channel: 'SMS', content: 'This is the content of the document 2', action: null, },
    { key: 2, name: 'Name Document 3', group: 'Group 3', type: 'type 1', status: 'Error', address: 'Address 123', date: '28/09/2021', channel: 'PDF', content: 'This is the content of the document 3', action: null, },
    { key: 3, name: 'Name Document 4', group: 'Group 4', type: 'type 3', status: 'Processing', address: 'Address 1234', date: '11/10/2021', channel: 'SMS', content: 'This is the content of the document 4', action: null, }
];

const sortFunction = (a: any, b: any) => 0 - (a > b ? 1 : -1);

export const DocumentTable = (props: any) => {
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [documentList, setDocumentList] = useState(documents);
    const [filteredDocuments, setFilteredDocuments] = useState(documents);

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
            render: (name: any) => (<><a>{name}</a></>),
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
            render: (group: any) => (<><a>{group}</a></>),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button className="ant-dropdown-link">
                        More actions <DownOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys: any) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key: any, index: any) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys: any) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key: any, index: any) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    const handleDelete = (key: any) => {
        setDocumentList(documentList.filter((item: any) => item.key !== key));
    };

    const handleAdd = () => {
        console.log(form);
        console.log();
        const newData: any = {
            key: documentList.length.toString(),
            name: form.getFieldValue("name") ? form.getFieldValue("name") : `New Document ${documentList.length + 1}`,
            group: 'Group 4',
            type: 'type 3',
            address: 'Address 1234',
            status: 'Processing',
            date: moment(new Date(), 'DD/MM/YYYY').format('DD/MM/YYYY'),
            channel: 'WEB',
            content: `This is the content of ${documentList.length + 1}`,
            action: null,
        };
        setDocumentList([...documentList, newData]);
        form.resetFields(["name"]);
    };

    useEffect(() => {
        const newList = documentList.filter((doc: any) => props.dateFilter === '' || doc.date === props.dateFilter);
        setFilteredDocuments(newList);
    }, [documentList, props.dateFilter]);

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
                                bordered={false}
                                loading={false}
                                expandable={{ expandedRowRender: (record: any) => <p>{record.content}</p> }}
                                showHeader={true}
                                rowSelection={rowSelection}
                                tableLayout={undefined}
                                columns={columns}
                                dataSource={filteredDocuments}
                                title={() => 'Dashboard'}
                            />
                        </Layout.Content>
                    </Layout>
                </div>
            </Layout>
        </>
    );
}
