import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className="bg-blue-500 min-h-screen flex justify-center items-center">
            {children}
        </div>
    )
}

export default Layout