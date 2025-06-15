import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from '../FromInput';

describe('FormInput', () => {
  const baseProps = {
    id: 'email',
    label: 'Email',
    value: '',
    onChange: jest.fn(),
  };

  it('renders label and input', () => {
    render(<FormInput {...baseProps} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows error class when error is true', () => {
    render(<FormInput {...baseProps} error />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onChange when typing', () => {
    render(<FormInput {...baseProps} />);
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('calls onBlur when blurred', () => {
    const onBlur = jest.fn();
    render(<FormInput {...baseProps} onBlur={onBlur} />);
    const input = screen.getByLabelText('Email');
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('renders helper text if provided', () => {
    render(<FormInput {...baseProps} helperText="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
