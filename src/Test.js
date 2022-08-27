import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastSuccess } from './component/base/base';
import Convert from './component/Convert';

function Test(){
  const notify = () => toast.success('🦄 Wow so easy!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  return (
    <div>
      <button onClick={() => notify("Happy")}>Notify!</button>
      <Convert text="xong" language="en" source="vi"></Convert>
      <ToastContainer />
    </div>
  );
}

export default Test;