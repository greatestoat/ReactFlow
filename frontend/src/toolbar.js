import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faVolumeUp, faCogs } from '@fortawesome/free-solid-svg-icons';

export const PipelineToolbar = () => {
    return (
        <div style={styles.toolbar}>
            {/* Icons Section */}
            <div style={styles.iconContainer}>
                {/* ChatGPT Icon */}
                <div style={styles.iconBox}>
                    <img
                        src="https://img.icons8.com/?size=100&id=FBO05Dys9QCg&format=png&color=000000"
                        alt="ChatGPT"
                        style={styles.icon}
                    />
                    <div style={styles.iconLabel}>AI</div>
                </div>

                {/* Talk Icon */}
                <div style={styles.iconBox}>
                    <FontAwesomeIcon icon={faCommentDots} style={styles.icon} />
                    <div style={styles.iconLabel}>Talk</div>
                </div>

                {/* Listen Icon */}
                <div style={styles.iconBox}>
                    <FontAwesomeIcon icon={faVolumeUp} style={styles.icon} />
                    <div style={styles.iconLabel}>Listen</div>
                </div>

                {/* Logic Icon */}
                <div style={styles.iconBox}>
                    <FontAwesomeIcon icon={faCogs} style={styles.icon} />
                    <div style={styles.iconLabel}>Logic</div>
                </div>

                {/* Dev Icon */}
                <div style={styles.iconBox}>
                    <img
                        src="https://img.icons8.com/?size=100&id=LIAl3xYMkKeC&format=png&color=000000"
                        alt="Dev"
                        style={styles.icon}
                    />
                    <div style={styles.iconLabel}>Dev</div>
                </div>

                {/* Nodes Section */}
                <div style={styles.nodeContainer}>
                </div>
            </div>
        </div>
    );
};

const styles = {
    toolbar: {
        position: 'fixed',
        left: '20px',
        top: '40px',
        height: '60vh',
        width: '70px',
        backgroundColor: '#FFFFFF',
        padding: '5px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        overflow: 'auto',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    nodeContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        marginTop: '20px', // Added spacing below the icons
    },
    draggableNode: {
        width: '100%',
        padding: '5px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',      
        border: '1px solid #ddd',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '30px',
    },
    iconBox: {
        width: '30px',
        height: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '5px',
        textAlign: 'center',
    },
    icon: {
        width: '20px',
        height: '20px',
        objectFit: 'contain',
    },
    iconLabel: {
        marginTop: '5px',
        fontSize: '10px',
        color: '#333',
    },
};

