import { render, screen, act, fireEvent } from '@testing-library/react';
import {getCommitDetails} from '../../apis/git';
import CommitDetails from './index';
jest.mock();
jest.mock('../../apis/git', () => {
  const originalModule = jest.requireActual('../../apis/git');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    getCommitDetails: () => Promise.resolve({commit: {message: "commit message",author: {date: "commit date"}},  author: {avatar_url: "avatar url", login:"ussr name"}, url: ""}),
  };
});
describe("Commit details", () => {
  test('renders loading text when component loads', async () => {
    render(<CommitDetails />);
    const linkElement = screen.getByText(/loading/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("rebders deatils on successful api call", async () => {
    await act(async () => render(<CommitDetails commit="commit"/>));
    console.log(screen)
    const commitMessage = screen.getByText("commit message");
    expect(commitMessage).toBeInTheDocument();
  })
  test("click show commits should call function to load commits", async () => {
    const backFunction = jest.fn();

    await act(async () => render(<CommitDetails commit="commit" onClose={backFunction}/>));

    const close = screen.getByText('Close')
    fireEvent.click(close);
    expect(backFunction).toHaveBeenCalled()
  })
})




