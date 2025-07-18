'use client';
import React, { useState } from 'react';
import clsx from 'clsx';

const ToastHover = ({ children, message }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}

            {/* Tooltip */}
            {visible && (
                <div
                    className={clsx(
                        'absolute z-50 left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded text-xs text-white bg-[#0a0a0a] border border-neutral-900',
                        'whitespace-nowrap'
                    )}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default ToastHover;