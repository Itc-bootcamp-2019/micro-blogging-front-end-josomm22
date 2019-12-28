import React from 'react';
import { sortDescending, listenToTweetsChange, getUserNameFromUID } from '../api/api';
import { Messagebubble } from '../Components/MessageBubble';
import Messageinput from '../Components/Messageinput';
import Messagedisplay from '../Components/Messagesdisplay';

import '../css/messages.css';

function Messages() {

        // const { isValid, hasError } = this.validateField(value)
        return (
            <div className='mainWrapper' >
                <Messageinput/>

                <Messagedisplay/>
                
            </div>
        )
    }


export default Messages;