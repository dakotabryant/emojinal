import React from 'react';

const AuthIcons = (props) => {
    return (
        <div onClick={props.onClick} className={props.className}>
            <img src={props.image} alt=""/>
        </div>
    );
}

export default AuthIcons;