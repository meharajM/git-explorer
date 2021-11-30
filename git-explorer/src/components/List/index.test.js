import { render, screen, act, fireEvent } from '@testing-library/react';
import List from './index';

describe("Commit List", () => {
  test('renders list of commits passed', async () => {
    const commits = [
        {commit: {message: "commit message",author: {date: "commit date"}},  author: {avatar_url: "avatar url", login:"ussr name"}, url: ""},
        {commit: {message: "commit message",author: {date: "commit date"}},  author: {avatar_url: "avatar url", login:"ussr name"}, url: ""},
        {commit: {message: "commit message",author: {date: "commit date"}},  author: {avatar_url: "avatar url", login:"ussr name"}, url: ""}
    ];
    const onCommitSelect = jest.fn();
    render(<List commits={commits} onCommitSelect={onCommitSelect}/>); 
    const commitsList = screen.getAllByTestId('commit');
    expect(commitsList.length).toBe(commits.length);
  });
  test("should make call to select appropriet commit", () => {
    const commits = [
        {commit: {message: "commit message",author: {date: "commit date"}},  author: {avatar_url: "avatar url", login:"ussr name"}, url: "url1"},
        {commit: {message: "commit message",author: {date: "commit date"}},  author: {avatar_url: "avatar url", login:"ussr name"}, url: ""},
        {commit: {message: "commit message",author: {date: "commit date"}},  author: {avatar_url: "avatar url", login:"ussr name"}, url: ""}
    ];
    const onCommitSelect = jest.fn();
    render(<List commits={commits} onCommitSelect={onCommitSelect}/>); 
    const commitList = screen.getAllByTestId('commit');
    fireEvent.click(commitList[0]);
    expect(onCommitSelect).toHaveBeenCalledWith('url1')
  })
})




