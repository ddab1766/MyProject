import React from 'react';
import './Chat.scss';
import TextareaAutosize from "@material-ui/core/TextareaAutosize/TextareaAutosize";
// import TabPanel from "@material-ui/lab/TabPanel";

// class Chat extends Component {
const MessageForm = ({messageChangeHandler, message, sendMessageHandler}) => {
  return (
      <div className='container message-form'>
        <div className='input-group'>
          <TextareaAutosize className="form-control" rowsMin={5}
                            type='text'
                            onChange={messageChangeHandler}
                            value={message}
                            placeholder='메시지를 입력해주세요.'
                            required />
          <button onClick={(e) => sendMessageHandler(e, message)}>
            전송
          </button>
        </div>
      </div>
  )
}
export default React.memo(MessageForm)
