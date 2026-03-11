import React from 'react';
import { MultiSelect } from 'primereact/multiselect';

export default function CustomMultiSelect({
    value,
    options,
    onChange,
    optionLabel,
    placeholder,
    className = '',
    filter = true,
    id
}) {
    return (
        <MultiSelect
            id={id}
            filter={filter}
            value={value}
            onChange={onChange}
            options={options}
            optionLabel={optionLabel}
            placeholder={placeholder}
            className={`w-full h-11 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/15 flex items-center ${className}`}
            pt={{
                label: { className: 'text-sm text-gray-800 px-4' },
                trigger: { className: 'w-10 text-gray-500' },
                panel: { className: 'bg-white rounded-lg shadow-xl border border-gray-100 mt-1 pb-1' },
                item: { className: 'px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-3' },
                header: { className: 'p-3 bg-gray-50 border-b border-gray-100 rounded-t-lg' },
                filterInput: { className: 'text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md py-2' }
            }}
        />
    );
}
