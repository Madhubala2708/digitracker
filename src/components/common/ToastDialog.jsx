import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import successLogo from "../../assets/images/success-tick-white.svg";
import warning from "../../assets/images/warning.svg";
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../../store/slice/toast';
import { resetMessages } from '../../store/slice/kanban';

const ToastDialog = () => {
  const { title, message, hint, variant, showToast } = useSelector((state) => state.toast);
  
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideToast());
    dispatch(resetMessages());
  };

  return (    
    <ToastContainer className="top-70" position="top-end">
      <Toast className="d-inline-block m-1" bg={variant.toLowerCase()} show={showToast} onClose={handleClose} delay={3000} autohide >
      {/* {
        (header) &&
        <Toast.Header>
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
      } */}
        <Toast.Body className={variant === 'success' || variant === 'danger' && 'text-white'}>
          <div className="toast-body-container">
            <div className="toast-body-container-icon">
              { (variant.toLowerCase()==="success") && <img src={successLogo} className="rounded me-2" alt="" />}
              { (variant.toLowerCase()==="danger") && <img src={warning} className="rounded me-2" alt="" />}
            </div>
            <div className="toast-body-container-content">
              <p>{title}</p>
              <span>{message}</span>
              { hint && (<span className='hint'><label>Note:</label> {hint}</span>) }
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastDialog;