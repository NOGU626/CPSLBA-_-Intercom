import React, {Component} from 'react'
import './App.css';
import Modal from 'react-responsive-modal';

import {connect} from 'react-redux';
import {setName, deleteName} from '../Redux/actions';
import M5stack from './Dispaly';
import img from '../img/m5stack-logo.png'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalFlag: false,
            GraphData: "",
            ButtonDisplay: false,
            ButtonFire: false,
            M5stack_STATUS: {},
        };

    }


    handleOnChange = (e) => {
        const status = e.target.checked;
        if (!status) {
            this.cmdSent("turnOFF");
        } else {
            this.cmdSent("turnON");
        }
        this.setState({
            ...this.state,
            ButtonDisplay: status,
            ButtonFire: false,
        })
    };

    handleOnChange1 = (e) => {
        const status = e.target.checked;
        this.cmdSent("fire");
        this.setState({
            ...this.state,
            ButtonDisplay: false,
            ButtonFire: status,
        })
    };

    cmdSent(cmd_s) {
        fetch("http://127.0.0.1:8000/M5Stack/CMD", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-LABTOKEN': '4s-DpxhYHhLNtCtNryNaW7bBehiYtDnYmYPHB8-SB6MuDa-Mxt6zVWePjtBYjEuxxQ2',
            },
            body: JSON.stringify({"cmd": cmd_s}
            )
        })
    }

    // マウントされる時
    getSensorData() {
        fetch("http://127.0.0.1:8000/M5Stack/Status", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-LABTOKEN': '4s-DpxhYHhLNtCtNryNaW7bBehiYtDnYmYPHB8-SB6MuDa-Mxt6zVWePjtBYjEuxxQ2',
            },
        }).then(res => res.json())
            .then(json =>
                this.setState({
                    M5stack_STATUS: json,
                    ButtonFire: false,
                })
            );

        if (this.state.M5stack_STATUS[0]) {
            const flag = this.state.M5stack_STATUS[0].config3;
            console.log(flag);
            this.setState({
                ...this.state,
                ButtonDisplay: !flag,
            })
        }

    }

    componentDidMount() {
        this.intervalId = setInterval(this.getSensorData.bind(this), 1000);
    }

    render() {
        let data = this.state.M5stack_STATUS;
        return (
            <div>
                <header>
                    <h1><img src={`${process.env.PUBLIC_URL}/m5stack-logo.png`}/>MONIFIVE</h1>

                </header>
                <div className={"title"}>
                    <h1>M5Stack端末</h1>
                </div>
                <div className={"content"}>
                    {(() => {
                        const html = [];
                        for (let i = 0; i < data.length; i++) {
                            const Devdata = data[i];
                            html.push(
                                <M5stack
                                    deviceName={Devdata["DeviceName"]}
                                    StatusFlag_Dis={!Devdata["config3"]}
                                    StatusFlag_Fire={this.state.ButtonFire}
                                    IP={Devdata["IP"]}
                                    RSSI={Devdata["rssi"]}
                                    Battery={Devdata["Battery"]}
                                />
                            )
                        }
                        return html
                    })()}

                </div>
                <div className={"contorl_m5"}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <h3>Screen画面:</h3>
                            </td>
                            <td className="switch">
                                <input id="subscription1" type="checkbox" name="subscriptions[]" value="画面電源"
                                       checked={this.state.ButtonDisplay} onChange={e => this.handleOnChange(e)}/>
                                <label htmlFor="subscription1"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <h3>火災警報:</h3>
                            </td>
                            <td className="switch">
                                <input id="subscription2" type="checkbox" name="subscriptions[]" value="火災"
                                       checked={this.state.ButtonFire} onChange={e => this.handleOnChange1(e)}/>
                                <label htmlFor="subscription2"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    name: state.user.name
});

const mapDispatchToProps = {
    setName,
    deleteName
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// // export default App;
//
//
// function doPost(e) {
//     // WebHookで受信した応答用Token
//     var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
//     // ユーザーのメッセージを取得
//     var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
//     // ユーザーのメッセージを取得
//     var userId = JSON.parse(e.postData.contents).events[0].source.userId;
//
//     // 応答メッセージ用のAPI URL
//     var url = 'https://api.line.me/v2/bot/message/reply';
//     UrlFetchApp.fetch(url, {
//         'headers': {
//             'Content-Type': 'application/json; charset=UTF-8',
//             'Authorization': 'Bearer ' + ACCESS_TOKEN,
//         },
//         'method': 'post',
//         'payload': JSON.stringify({
//             'replyToken': replyToken,
//             'messages': [{
//                 'type': 'text',
//                 'text': userMessage + ':',
//             }],
//         }),
//     });
//     sendHttpPost();
//
//     return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
// }
