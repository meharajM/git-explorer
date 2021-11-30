import { render, screen, act, fireEvent } from '@testing-library/react';
import {getCommits} from './apis/git';
import App from './App';
jest.mock();
jest.mock('./apis/git', () => {
  const originalModule = jest.requireActual('./apis/git');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    getCommits: () => Promise.resolve([{commit: {message: "commit message",author: {date: "commit date"}},  author: {avatar_url: "avatar url", login:"ussr name"}, url: ""}]),
  };
});
describe("App", () => {
  test('renders loading text along with filter when app loads', async () => {
    render(<App />);
    const linkElement = screen.getByText(/loading/i);
    expect(linkElement).toBeInTheDocument();
    const filter = screen.getByTestId('filter');
    expect(filter).toBeInTheDocument();
  });
  test("rebders list on successful api call", async () => {
    await act(async () => render(<App/>));
    const commitMessage = screen.getByText("commit message");
    expect(commitMessage).toBeInTheDocument();
  })
  // test("click on list item should show details of commit", async () => {
  //   await act(async () => render(<App/>));
  //   const commitMessage = screen.getByTestId('commit')
  //   fireEvent.click(commitMessage);
  //   const details = screen.getAllByTestId('commit-details');
  //   expect(details).toBeInTheDocument();
  // })
})




