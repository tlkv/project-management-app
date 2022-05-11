import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders App', async () => {
    render(<App />);
    const footer = document.getElementById('footer');
    expect(footer).toBeInTheDocument();
  });
});
