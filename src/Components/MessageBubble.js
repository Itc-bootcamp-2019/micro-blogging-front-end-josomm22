import React from 'react';

export const Messagebubble = (props) => {

    return (
        <div id={props.key} className='bubble'>
            <div className='bubbleSection'>
                <div id='login' className='bubbleDetails'>
                    <span>
                        {props.login}
                    </span>
                </div>
                <div id='date' className='bubbleDetails'>
                    <span>
                        {props.createdOn}
                    </span>
                </div>
            </div>
            <div className='bubbleSection'>
                <p>{props.content}</p>
            </div>
        </div>

    )

}