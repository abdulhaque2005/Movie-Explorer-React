import { useEffect, useState } from 'react'
import { IoCheckmarkCircle, IoInformationCircle } from 'react-icons/io5'

function Toast({ message, type, onClose }) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
            setTimeout(onClose, 300)
        }, 2500)
        return () => clearTimeout(timer)
    }, [onClose])

    const Icon = type === 'success' ? IoCheckmarkCircle : IoInformationCircle

    return (
        <div className={`toast ${type} ${visible ? 'show' : 'hide'}`}>
            <Icon className="toast-icon" />
            <span>{message}</span>
        </div>
    )
}

export default Toast
