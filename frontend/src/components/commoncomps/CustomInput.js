import React from 'react';

export default function CustomInput({
    value,
    onChange,
    placeholder,
    type = "text",
    id,
    className = '',
    required = false
}) {
    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`h-11 border border-gray-300 rounded-lg px-4 w-full bg-white text-gray-800 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 hover:border-gray-400 ${className}`}
        />
    );
}
