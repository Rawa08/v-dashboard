type Props = {
    id: string;
    type?: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    error?: boolean;
    helperText?: string;
    required?: boolean;
    autoComplete?: string;
}

const FormInput = ({
    id,
    type = 'text',
    label,
    value,
    onChange,
    onBlur,
    error = false,
    helperText,
    required = false,
    autoComplete,
}: Props) => {
    const base = 'w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring';
    const borderClass = error
        ? 'border-rose-600 focus:ring-rose-600'
        : 'border-gray-300 focus:ring-blue-500';

    const labelClass = `block text-sm mb-1 font-medium ${error ? 'text-rose-600 animate-bounce' : 'text-gray-600'
        }`;
    return (
        <div>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                className={`${base} ${borderClass}`}
                aria-invalid={error}
                autoComplete={autoComplete}
            />
            {helperText && (
                <p className={`text-sm mt-1 px-1 ${error ? 'text-rose-600' : 'text-gray-500'}`}>
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default FormInput;
