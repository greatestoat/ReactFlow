import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const NameMessageNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [message, setMessage] = useState('');
  const [fields, setFields] = useState([]); // Dynamic fields
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fieldType, setFieldType] = useState('');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

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

  useEffect(() => {
    localStorage.setItem('currName', currName);
    localStorage.setItem('message', message);
    localStorage.setItem('fields', JSON.stringify(fields));
  }, [currName, message, fields]);

  return (
    <div style={styles.nodeContainer}>
      <Handle type="target" position={Position.Left} style={styles.handle} />
      <div style={styles.header}>
        <span style={styles.headerText}>New Block 1</span>
      </div>
      <div style={styles.body}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Message:
          <textarea
            value={message}
            onChange={handleMessageChange}
            style={styles.textarea}
            rows={3}
          />
        </label>

        {/* Render Dynamic Fields */}
        {fields.map((field, index) => (
          <div key={index} style={styles.fieldContainer}>
            <label style={styles.label}>
              {field.type.charAt(0).toUpperCase() + field.type.slice(1)}:
              <input
                type="text"
                value={field.value}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].value = e.target.value;
                  setFields(updatedFields);
                }}
                style={styles.input}
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
              <option value="message">Message</option>
              <option value="name">Name</option>
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
  textarea: {
    padding: 8,
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 4,
    resize: 'vertical',
    minHeight: '60px',
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

