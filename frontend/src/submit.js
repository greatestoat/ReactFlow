
import React from 'react';
import { DraggableNode } from './draggableNode';

export const SubmitButton = () => {
    return (
        <div style={styles.container}>
            {/* Nodes Section */}
            <div style={styles.nodesWrapper}>
                <DraggableNode
                    type="nameMessage"
                    label="Block1"
                    //Name & Message nameMessage
                    style={styles.node}
                />
                <DraggableNode
                    type="variableMatch"
                    label="Block2"
                    //Variable Match,variableMatch
                    style={styles.node}
                />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: '20px auto',
    },
    nodesWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    node: {
        width: '120px',
        padding: '10px',
        fontSize: '14px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
};
