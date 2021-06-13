import { Button, Layout } from "antd";
import { useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";
import { DocumentTable } from "./DocumentTable";

const filters = [
    { name: 'Date Filter', type: 'string', value: '' },
    { name: 'Filter check 2', type: 'checkbox', value: false },
    { name: 'Filter select 1', type: 'select', value: '' },
    { name: 'Filter other 1', type: 'other', value: '' },
    { name: 'Filter other 2', type: 'other', value: '' }
];

export const DocumentDashboard = (props: any) => {
    const [filtersValues, setFiltersValues] = useState(filters);
    const [dateFilter, setDateFilter] = useState('');

    const handleDateFilter = (date: string) => {
        setDateFilter(date);
        console.log(date);
    }

    return (
        <>
            <Layout>
                <Sidebar
                    handleDateFilter={(date:string) => {handleDateFilter(date)}}
                    filters={filters}
                    filtersValues={filtersValues}
                    setFiltersValues={filtersValues} />
                <Layout.Content className="site-layout-background">
                    <DocumentTable
                        dateFilter={dateFilter}/>
                </Layout.Content>
            </Layout>
        </>
    );
};
