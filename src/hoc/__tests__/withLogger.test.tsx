import React from 'react';
import { render } from '@testing-library/react';

import withLogging from '../withLogger';

// Mock console.log to capture log messages
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock component for testing
const MockComponent: React.FC<{ message?: string }> = ({ message }) => {
  return <div>{message || 'MockComponent'}</div>;
};

describe('withLogging HOC', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  it('should logs the default message', () => {
    const WrappedComponent = withLogging(MockComponent);

    render(<WrappedComponent />);

    expect(mockConsoleLog).toHaveBeenCalledWith('Hello from MockComponent');
  });

  it('should logs the provided message', () => {
    const loggingMessage = 'Custom logging message';
    const WrappedComponent = withLogging(MockComponent);

    render(<WrappedComponent logMessage={loggingMessage} />);

    expect(mockConsoleLog).toHaveBeenCalledWith(`${loggingMessage} MockComponent`);
  });
});
