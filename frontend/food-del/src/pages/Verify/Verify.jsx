
import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Verify.css';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const query = new URLSearchParams(useLocation().search);
  const success = query.get('success');
  const orderId = query.get('orderId');
  const navigate = useNavigate();
  const { setCartItem } = useContext(StoreContext);

  useEffect(() => {
    if (success === 'true') {
      setCartItem({}); // Clear cart in UI
      setTimeout(() => {
        navigate('/myorders');
      }, 2000); // 2 seconds delay for user feedback
    }
  }, [success, navigate, setCartItem]);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      {success === 'true' ? (
        <>
          <h2>Payment Successful!</h2>
          <p>Your order (ID: {orderId}) has been placed.</p>
          <p>Redirecting to your orders...</p>
        </>
      ) : (
        <>
          <h2>Payment Failed</h2>
          <p>Please try again or contact support.</p>
        </>
      )}
    </div>
  );
};

export default Verify;
