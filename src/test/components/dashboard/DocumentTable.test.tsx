
import './matchMedia.mock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DocumentTable, Props } from '../../../components/dashboard/DocumentTable';

// Test fails because of [TypeError: window.matchMedia is not a function]
// Ref. https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
describe("<DocumentTable />", () => {

    function renderDocumentTable(props: Partial<Props> = {}) {
        const defaultProps: Props = {
            resetFilters() {
                return;
            },
            dateFilter: '',
            addressFilter: '',
            statusFilter: [],
            groupFilter: '',
            dateRangeFilter: [],
        };
        return render(<DocumentTable {...defaultProps} {...props} />);
    }

    it('should render a table component with a button', async () => {
        const { findByTestId } = renderDocumentTable();
        const table = await findByTestId('table-component');
        expect(table).toBeVisible();
        const button = screen.getByText('Add Document');
        expect(button).toBeVisible();
    });

});
