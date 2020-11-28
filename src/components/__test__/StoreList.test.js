import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import StoreList from '../StoreList';

afterEach(cleanup)

describe('StoreList', () => {
  const mockLoadData = jest.fn();
  const stores = [
      { id: 1, address: "123abc" },
      { id: 2, address: "123abc" },
      { id: 3, address: "123abc" }
    ];

  it('renders "load more stores" button', () => {
    const stores = []
    const sale = true
    render(<StoreList
      stores={stores}
      sale={sale}
      loadData={mockLoadData}
    />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should apply a class of sale based on sale prop', () => {
    const { container, rerender } = render(<StoreList
      stores={[]}
      sale={true}
      loadData={mockLoadData}
    />);
    expect(container.firstChild.classList.contains('sale')).toBe(true)
    rerender(<StoreList
      stores={[]}
      sale={false}
      loadData={mockLoadData}
    />);
    expect(container.firstChild.classList.contains('sale')).toBe(false);
  });
  
  it("should render a list of StoreCards based on the stores prop", () => {
    
    render(<StoreList
      stores={stores}
      sale={true}
      loadData={jest.fn()}
    />);
    expect(screen.getAllByText(/123abc/).length).toEqual(stores.length);
  });

  it("should call loadData when button is clicked", () => {
    render(<StoreList
      stores={[]}
      sale={true}
      loadData={mockLoadData}
    />);
    userEvent.click(screen.getByText('load more stores'));
    expect(mockLoadData).toBeCalled();
  });

  it('matches the snapshot', () => { 
    const snapShot = render(<StoreList
      stores={stores}
      sale={true}
      loadData={mockLoadData}
    />);
    expect(snapShot).toMatchSnapshot();
  })
});


