import React from 'react'

function GradientBox({children}) {
    return (
        <div className="gradientbox" style={{
            height:360,
            color:"white",
        }}>
            {children}
        </div>
    )
}

export default GradientBox