import React from 'react'

const ConfirmAlert = ({title,message,onConfirm, onCancel}) => {
    const dialogStyle = {
        position: 'fixed',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
    };
  return (
    <div>
        <div style = {dialogStyle}>
            <h6>{title}</h6>
            <p>{message}</p>
            <div className='flex flex-row w-full justify-between mt-3'>
            <button onClick={onConfirm} className='bg-slate-400 p-1 w-12 text-white rounded hover:bg-teal-600' >OK</button>
            <button onClick={onCancel} className='bg-slate-400 p-1 text-white rounded hover:bg-teal-600'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmAlert;