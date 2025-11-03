import React, { useState } from 'react';

const SessionExpiredModal = ({ isOpen, onClose, onContinue, onLogout }) => {

  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  const handleContinue = async () => {
    setLoading(true);
    try {
      await onContinue();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="session-expired-modal-overlay">
      <div className="session-expired-modal">
        <div className="session-expired-modal-header">
          <h3>Session Expired</h3>
        </div>
        <div className="session-expired-modal-body">
          <p>Your session has expired. Click continue to stay signed in.</p>
        </div>
        <div className="session-expired-modal-footer">
          <button className="btn-primary" onClick={handleContinue} disabled={loading}>
            {loading ? "Refreshing..." : "Continue"}
          </button>
          <button className="btn-secondary" onClick={onLogout} disabled={loading}>
            Logout
          </button>
        </div>
      </div>

      {/* Inline styles for the modal */}
      <style jsx="true">{`
        .session-expired-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .session-expired-modal {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          width: 400px;
          max-width: 90%;
        }
        
        .session-expired-modal-header {
          padding: 15px 20px;
          border-bottom: 1px solid #e5e5e5;
        }
        
        .session-expired-modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }
        
        .session-expired-modal-body {
          padding: 20px;
        }
        
        .session-expired-modal-footer {
          padding: 15px 20px;
          border-top: 1px solid #e5e5e5;
          display: flex;
          justify-content: flex-end;
        }
        
        .btn-primary {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
        }
        
        .btn-primary:hover {
          background-color: #0069d9;
        }
      `}</style>
    </div>
  );
};

export default SessionExpiredModal;