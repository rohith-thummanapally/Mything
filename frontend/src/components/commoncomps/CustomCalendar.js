import React from 'react';
import { Calendar } from 'primereact/calendar';

export default function CustomCalendar({
    value,
    onChange,
    placeholder,
    className = '',
    id
}) {
    return (
        <Calendar
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full h-11 flex ${className}`}
            inputClassName="w-full h-full border border-gray-300 rounded-lg px-4 bg-white text-gray-800 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 hover:border-gray-400"
            pt={{
                panel: { className: 'bg-white rounded-xl shadow-2xl border border-gray-100 mt-1 p-3' },
                header: { className: 'pb-3 border-b border-gray-100 flex justify-between items-center text-gray-800 font-medium' },
                tableHeaderCell: { className: 'p-2 text-xs text-gray-500 font-medium' },
                day: { className: 'p-2 text-sm text-center text-gray-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer' },
            }}
        />
    );
}
