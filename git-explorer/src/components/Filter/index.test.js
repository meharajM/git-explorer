import { render, screen, act, fireEvent } from '@testing-library/react';
import Filter from './index';

describe("Filter", () => {
  test('renders filter, sets and applies filter values', async () => {
    const onSince = jest.fn()
    const onUntil = jest.fn()
    const onApplyFilter = jest.fn()

    render(<Filter onSince ={onSince}  onUntil={onUntil} onApplyFilter={onApplyFilter} since="01/06/1994" until="01/06/2021"/>);
    
    const dateEvent = {target: {value: '01/01/2021'}};

    const since = screen.getByTestId('since');
    expect(since).toBeInTheDocument();
    fireEvent.change(since, dateEvent);
    expect(onSince).toHaveBeenCalled();

    const until = screen.getByTestId('until');
    expect(until).toBeInTheDocument('until');
    fireEvent.change(until, dateEvent)
    expect(onUntil).toHaveBeenCalled()

    const applyFilterButton = screen.getByTestId('apply-filter');
    fireEvent.click(applyFilterButton);
    expect(onApplyFilter).toHaveBeenCalled();

  });
})




