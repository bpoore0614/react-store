import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendFlashMessage } from '../../redux/ActionTypes'

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
  }

  this.timer = null;
}



componentWillUnmount(){
  clearTimeout(this.timer);
}

componentWillUpdate(nextProps, nextState) {
  if (nextProps.flashMessage.message !== this.props.flashMessage.message) {
    clearTimeout(this.timer);
  }
}


render() {
  const { message, className } = this.props.flashMessage;
  const { show } = this.state;
  const timer = null



  if (!message) {
    return null;
  }

  this.timer = setTimeout(() => {
    this.props.sendFlashMessage('', '')
  }, 3000);

    return (
      <div className="row" key={this.state.key}>
        <div
          className={'col-md-12 alert text-center ' + className}
          role="alert"> 
          {message}
        </div>
      </div>
    );
}
}

const mapStateToProps = state => {
  return {
    flashMessage: state.FlashMessage,
  }
}

const mapDispatchToProps = dispatch => ({
  sendFlashMessage: (message, className) => dispatch(sendFlashMessage(message, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);  