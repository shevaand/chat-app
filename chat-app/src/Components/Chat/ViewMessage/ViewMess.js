import React from 'react'

class ViewMess extends React.Component {

    render() {
        return (
            <div className='col-sm-12'>
                {this.props.items.map(item => (
                    <div key={item.created_at + item.username} className="row message-item">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-10 text-left">
                                    <b>{item.username}:</b>
                                </div>
                                <div className="col-sm-2 text-right">
                                    <small>{item.created_at.toString()}</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 text-left">
                            {item.body}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ViewMess