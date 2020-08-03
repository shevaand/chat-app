import React, { Component } from 'react';
import { Realtime } from 'ably/browser/static/ably-commonjs.js';
import CreateMessage from './CreateMessage/CreateMess';
import ViewMess from './ViewMessage/ViewMess';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            body: '',
        };

        const realtime = new Realtime({
            key: 'vWYADg.LFZqYg:sBvPQ6hwhJ8FkkrU', //Ably key
            clientId: props.username
        });

        this.channel = realtime.channels.get("chat");

        this.channel.presence.enter();

        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
    }

    componentDidMount(){
        this.channel.subscribe((msg) => {
            console.log(msg)
            this.setState({
                items: this.state.items.concat(msg.data),
            });
        });

        this.channel.presence.subscribe('enter', (member) => {
            this.setState({
                items: this.state.items.concat({
                    'username': member.clientId, 'body': 'Has entered', created_at: new Date()
                })
            });
        });
    }

    handleMessageChange(e) {
        this.setState({
            body: e.target.value
        });
    }

    handleMessageSubmit(e) {
        e.preventDefault();
        if (!this.state.body.length) {
            return;
        }
        const newItem = {
            username: this.props.username,
            body: this.state.body,
            created_at: new Date(),
        };
        this.channel.publish('message', newItem);

        this.setState({
            body: ''
        });
    }

    render() {
        return (
            <div>
                <CreateMessage  handleMessageSubmit={this.handleMessageSubmit}
                    handleMessageChange={this.handleMessageChange} bodyValue={this.state.body}/>

                <ViewMess items={this.state.items}/>
            </div>
        );
    }

}
export default Chat;