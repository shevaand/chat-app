import React from 'react'

class CreateMessage extends React.Component {


    render() {
        return (
            <form onSubmit={this.props.handleMessageSubmit}>
                    <div className="row">
                        <div className="col-sm-8">
                            <input
                                id="new-message"
                                className="form-control"
                                onChange={this.props.handleMessageChange}
                                value={this.props.bodyValue}
                                placeholder='Type Message'
                            />
                            <div className="col-sm-4">
                            </div>
                            <button className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </form>
        )
    }

}

export default CreateMessage;