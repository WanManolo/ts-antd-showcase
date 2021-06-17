import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Header } from '../components/Header';
import { Props } from '../components/breadcrumb/BreadCrumb';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

describe("<Header />", () => {

    function renderHeader(props: Partial<Props> = {}) {
        const routerProps = { history: createBrowserHistory() };
        const defaultProps: Props = {
            selectedEntry: '',
            setSelectedEntry() {
                return;
            },
        };
        return render(<Router {...routerProps} ><Header {...defaultProps} {...props} /></Router>);
    }

    it('should render all the menu entries', () => {
        renderHeader();

        const homeElement = screen.getByText(/Home/i);
        const documentsElement = screen.getByText(/Documents/i);

        expect(homeElement).toBeInTheDocument();
        expect(documentsElement).toBeInTheDocument();

    });

});

