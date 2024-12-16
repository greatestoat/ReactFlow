import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const VariableMatchNode = ({ id, data }) => {
  const [fields, setFields] = useState([
    { type: 'variable', value: '' },
    { type: 'variable2', value: '' }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fieldType, setFieldType] = useState('');

  const handleAddField = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFieldSubmit = () => {
    const newField = { type: fieldType, value: '' };
    setFields([...fields, newField]);
    setIsDialogOpen(false);
    setFieldType('');
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = fields.map((f, i) =>
      i === index ? { ...f, value } : f
    );

    // Check for `variable` and `variable2` matching logic
    const variableField = updatedFields.find((f) => f.type === 'variable');
    const variable2Field = updatedFields.find((f) => f.type === 'variable2');

    if (variableField && variable2Field) {
      const varValue = parseFloat(variableField.value);
      const var2Value = parseFloat(variable2Field.value);

      if (!isNaN(varValue) && !isNaN(var2Value)) {
        const resultFieldIndex = updatedFields.findIndex((f) => f.type === 'result');
        const result = varValue === var2Value ? 'match' : 'No match';

        if (resultFieldIndex !== -1) {
          updatedFields[resultFieldIndex].value = result;
        } else {
          updatedFields.push({ type: 'result', value: result });
        }
      }
    }

    setFields(updatedFields);
  };

  useEffect(() => {
    localStorage.setItem('fields', JSON.stringify(fields));
  }, [fields]);

  return (
    <div style={styles.nodeContainer}>
      <Handle type="target" position={Position.Left} style={styles.handle} />
      <div style={styles.header}>
        <span style={styles.headerText}>New Block 1</span>
      </div>
      <div style={styles.body}>
        {/* Render Variable Fields */}
        {fields.map((field, index) => (
          <div key={index} style={styles.fieldContainer}>
            <label style={styles.label}>
              {field.type.charAt(0).toUpperCase() + field.type.slice(1)}:
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                style={styles.input}
                disabled={field.type === 'result'}
              />
            </label>
          </div>
        ))}

        {/* Add Field Button */}
        <button style={styles.addButton} onClick={handleAddField}>
          + Add
        </button>
      </div>
      <Handle type="source" position={Position.Right} style={styles.handle} />

      {/* Dialog for Selecting Field Type */}
      {isDialogOpen && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialog}>
            <h4 style={styles.dialogTitle}>Select Field Type</h4>
            <select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              style={styles.select}
            >
              <option value="" disabled>
                Choose a field type
              </option>
              <option value="variable">Variable</option>
              <option value="variable2">Variable2</option>
            </select>
            <div style={styles.dialogActions}>
              <button onClick={handleFieldSubmit} style={styles.addButton} disabled={!fieldType}>
                Add
              </button>
              <button onClick={handleDialogClose} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  nodeContainer: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    width: 300,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#555',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  input: {
    padding: 8,
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 4,
  },
  addButton: {
    marginTop: 10,
    padding: '8px 12px',
    backgroundColor: '#3182ce',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
  },
  cancelButton: {
    padding: '8px 12px',
    backgroundColor: '#e53e3e',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  dialogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  dialogTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  select: {
    width: '100%',
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 16,
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  handle: {
    width: 10,
    height: 10,
    background: '#555',
  },
};

