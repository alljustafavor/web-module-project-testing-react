import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

test('renders without errors with no props', async () => {
    render(<Display />);
    const img = screen.getByAltText(/header image/i);
    expect(img).toBeInTheDocument();
});

test('renders Show component when the button is clicked ', async () => { 
    render(<Display />);
    const btn = screen.getByTestId("btnClick");
    fireEvent.click(btn);
    const afterBtnClick = await screen.findByText(/A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl./i);
    expect(afterBtnClick).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    render(<Display />);
    const btn = screen.getByTestId("btnClick");
    fireEvent.click(btn);
    const showContainer = await waitFor(() => screen.getByTestId("show-container"));
    const seasonOptions = screen.getAllByTestId("season-option");
    expect(seasonOptions.length).toBe(5); // replace with the actual number of seasons
});
