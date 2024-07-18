
import React, { useEffect } from 'react';

export default function Loader(props) {
  useEffect(() => {
    
    var parent = document.getElementById(props.parent);
    if (parent) {
      parent.style.pointerEvents = 'none';
    }
    return () => {
      if (parent) {
        parent.style.pointerEvents = 'auto';
      }
    };
  }, []);

  return (
       <div className="loader">
            <div className="icon">
                <div className="bar" style={{ backgroundColor: '#3498db', marginLeft: '0px' }}></div>
                <div className="bar" style={{ backgroundColor: '#e74c3c', marginLeft: '25px' }}></div>
                <div className="bar" style={{ backgroundColor: '#f1c40f', marginLeft: '50px' }}></div>
                <div className="bar" style={{ backgroundColor: '#2eB869', marginLeft: '75px' }}></div>
            </div>  
        {/* //     <p className='mt-3'>Loading...</p> */}
        </div>
   

  );
}

