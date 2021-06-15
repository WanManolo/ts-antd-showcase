import { Layout } from "antd";
import { FC, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { DocumentTable } from "./DocumentTable";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

interface Props {

}

export const DocumentDashboard: FC<Props> = () => {
    const [dateFilter, setDateFilter] = useState<string>('');
    const [addressFilter, setAddressFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [groupFilter, setGroupFilter] = useState<string>('');
    const [checkboxGroupStatus, setCheckBoxGroupStatus] = useState<CheckboxValueType[]>([]);

    const clearFilters = (column: string) => {
        switch (column) {
            case 'date':
                setDateFilter('');
                break;
            case 'address':
                setAddressFilter('');
                break;
            case 'status':
                setStatusFilter([]);
                break;
            case 'group':
                setGroupFilter('');
                break;
            default:
                break;
        }
    }

    const handleStatusFilter = (options: CheckboxValueType[]) => {
        setCheckBoxGroupStatus(options);
    };

    const handleDateFilter = (date: string) => {
        setDateFilter(date);
    }

    const handleAddressFilter = (address: string) => {
        setAddressFilter(address);
    };

    const handleGroupFilter = (group: string) => {
        setGroupFilter(group);
    };

    const handleDateRangeFilter = () => {

    }

    useEffect(() => {
        let states: string[] = [];
        checkboxGroupStatus.forEach((cs) => { states.push(cs.toString()) });
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
                        resetFilters={clearFilters}
                    />
                </Layout.Content>
            </Layout>
        </>
    );
};
