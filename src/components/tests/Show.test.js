import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';


const mockShowData = {
    name: "Gen-V",
    summary: "Gen-V: Superpowered teens combat dangers, navigating abilities while facing adversaries in a world full of challenges and uncertainties.",
    seasons: [
        { id: 0, name: "Season 1", episodes: [] },
    ]
}

test('renders without errors', () => {
    render(<Show show={mockShowData} selectedSeason={"none"} />)
    const name = screen.getByText(mockShowData.name);
    const summary = screen.getByText(mockShowData.summary);
    expect(name).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />)
    const loadingElement = screen.getByText(/Fetching data.../i)
    expect(loadingElement).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={mockShowData} selectedSeason={"none"} />);
    const options = screen.getAllByTestId("season-option").length;
    expect(options).toBe(1);
});



test('handleSelect is called when a season is selected', () => {
    const handleSelect = jest.fn();
    const { rerender, getByTestId } = render(<Show show={mockShowData} selectedSeason={"none"} handleSelect={handleSelect} />);
    const opt = screen.getAllByTestId("season-option").length;
    expect(opt).toBe(1)
    rerender(<Show show={mockShowData} selectedSeason={0} handleSelect={handleSelect}/>)
    fireEvent.change(getByTestId("seasons"), { target: { value: '0' } });
    expect(handleSelect).toHaveBeenCalled();
});

// ^ kinda combinded these into the one above
test('component renders when no seasons are selected and when rerenders with a season passed in', () => { });
