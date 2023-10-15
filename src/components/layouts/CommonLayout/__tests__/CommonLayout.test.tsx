import { screen, render } from '@testing-library/react';

import CommonLayout from '../CommonLayout';

describe('CommonLayout Component', () => {
  it('should render with title and content', () => {
    const title = 'Test Title';
    const content = 'Test content';

    render(<CommonLayout title={title}>{content}</CommonLayout>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
