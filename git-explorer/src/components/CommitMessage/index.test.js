import { render, screen, act, fireEvent } from '@testing-library/react';
import CommitMessage from './index';

describe("Commit message", () => {
  test('renders message with multiple lines in multiple lines', async () => {
      const message = "first line \n second line \n third line"
    render(<CommitMessage>{message}</CommitMessage>);
    console.log(screen)
    const linkElement = screen.getByText("first line");
    expect(linkElement).toBeInTheDocument();
    const lines = screen.getAllByTestId("line");
    expect(lines.length).toBe(3)
  });
})




