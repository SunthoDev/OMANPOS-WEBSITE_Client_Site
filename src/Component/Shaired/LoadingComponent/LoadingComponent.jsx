import React from 'react';
import "./LoadingComponent.css"

const LoadingComponent = () => {
    return (
        <div className="LoadingComponentParent">
            <div className="loading-overlay">
                <div className="loading-container">
                    <span
                        className="loading loading-spinner loading-lg"
                        style={{ color: '#3F51B5', width: '100px', height: '100px', fontWeight: 300 }}
                    ></span>
                </div>
            </div>
        </div>
    );
};

export default LoadingComponent;