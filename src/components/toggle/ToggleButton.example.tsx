// ToggleButton Usage Examples

import React, { useState } from 'react';
import ToggleButton, { ToggleOption } from './ToggleButton';

export const ToggleButtonExamples = () => {
    const [view, setView] = useState('table');
    const [status, setStatus] = useState('active');
    const [size, setSize] = useState('medium');

    // Example 1: View Mode Toggle (Default)
    const viewOptions: ToggleOption[] = [
        { value: 'table', label: 'Table', icon: '☰' },
        { value: 'card', label: 'Card', icon: '⊞' },
        { value: 'list', label: 'List', icon: '≡' }
    ];

    // Example 2: Status Toggle (Compact)
    const statusOptions: ToggleOption[] = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'archived', label: 'Archived' }
    ];

    // Example 3: Size Toggle (Pills)
    const sizeOptions: ToggleOption[] = [
        { value: 'small', label: 'S' },
        { value: 'medium', label: 'M' },
        { value: 'large', label: 'L' },
        { value: 'xlarge', label: 'XL' }
    ];

    // Example 4: Icon Only Toggle
    const actionOptions: ToggleOption[] = [
        { value: 'grid', label: '', icon: '⊞' },
        { value: 'list', label: '', icon: '☰' }
    ];

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
                <h3>Default Variant</h3>
                <ToggleButton
                    options={viewOptions}
                    value={view}
                    onChange={setView}
                    size="medium"
                />
            </div>

            <div>
                <h3>Compact Variant</h3>
                <ToggleButton
                    options={statusOptions}
                    value={status}
                    onChange={setStatus}
                    variant="compact"
                    size="small"
                />
            </div>

            <div>
                <h3>Pills Variant</h3>
                <ToggleButton
                    options={sizeOptions}
                    value={size}
                    onChange={setSize}
                    variant="pills"
                    size="medium"
                />
            </div>

            <div>
                <h3>Large Size</h3>
                <ToggleButton
                    options={viewOptions}
                    value={view}
                    onChange={setView}
                    size="large"
                />
            </div>

            <div>
                <h3>Full Width</h3>
                <ToggleButton
                    options={statusOptions}
                    value={status}
                    onChange={setStatus}
                    fullWidth
                />
            </div>
        </div>
    );
};

export default ToggleButtonExamples;

