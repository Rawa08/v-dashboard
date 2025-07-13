import React, { useState, useEffect, useRef } from 'react';

interface ComboBoxProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    options: T[];
    searchKey: keyof T;
    onOptionSelect?: (option: T) => void;
    placeholder?: string;
}

export default function ComboBox<T extends Record<string, any>>({
    options,
    searchKey,
    onOptionSelect,
    placeholder = 'Search…',
    className = 'max-w-sm',
    ...rest
}: ComboBoxProps<T>) {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filtered = filter
        ? options.filter((opt) =>
            String(opt[searchKey])
                .toLowerCase()
                .includes(filter.toLowerCase())
        )
        : options;


    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);

    }, []);

    const handleSelect = (opt: T) => {
        setFilter(String(opt[searchKey]));
        setOpen(false);
        onOptionSelect?.(opt);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFilter(value);
        setOpen(true);
    };

    const handleFocus = () => {
        setOpen(true);
        setFilter('');
    };

    return (
        <div ref={containerRef} className={`relative ${className}`} {...rest}>
            <input
                type="text"
                value={filter}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder={placeholder}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {open && (
                <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded shadow-lg">
                    {filtered.length > 0 ? (
                        filtered.map((opt, i) => (
                            <div
                                key={i}
                                onMouseDown={() => handleSelect(opt)}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            >
                                {String(opt[searchKey])}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-500">No matches</div>
                    )}
                </div>
            )}
        </div>
    );
}
