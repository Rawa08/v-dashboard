import { render, screen, waitFor } from '@testing-library/react';
import AuthGuard from '../AuthGuard';
import { useAuth } from '@context/AuthContext';
import { useRouter } from 'next/navigation';

jest.mock('lottie-react', () => ({
  __esModule: true,
  default: () => <div data-testid="lottie-mock" />,
}));

jest.mock('../LoadingAnimation', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-animation" />,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockPush = jest.fn();

describe('AuthGuard', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to signIn if no user is present', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
      isInitialized: true,
    });

    render(
      <AuthGuard>
        <div>Protected</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/signIn');
    });
  });

  it('shows loading animation when loading is true', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
      isInitialized: false,
    });

    render(
      <AuthGuard>
        <div>Protected</div>
      </AuthGuard>
    );

    expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {},
      loading: false,
      isInitialized: true,
    });

    render(
      <AuthGuard>
        <div>Protected</div>
      </AuthGuard>
    );

    expect(screen.getByText('Protected')).toBeInTheDocument();
  });
});
