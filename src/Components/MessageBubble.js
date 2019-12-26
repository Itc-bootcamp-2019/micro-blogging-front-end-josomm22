import React, { useState, useEffect } from 'react';
import {getUserNameFromUID } from '../api/api';


export const Messagebubble = (props) => {
    const [count,setcount] = useState(0);
    
    return (
        <div id={()=>setcount(count+1)} className='bubble'>
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