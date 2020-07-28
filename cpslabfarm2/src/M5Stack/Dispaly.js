import React, {Component} from 'react'
import './Dispaly.css';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import {setName, deleteName} from '../Redux/actions';
// import M5Stack_iwai from '../img/M5Stack/M5Stack_iwai.png';
// import M5Stack_Gray_OFF from '../img/M5Stack/M5Stack_Gray_OFF.png';
// import M5Stack_interview from '../img/M5Stack/M5Stack_interview.png';
// import M5Stack_fire from '../img/M5Stack/M5Stack_fire.png';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalFlag: false,
            GraphData: "",
            DeviceName: this.props.deviceName,
            StatusFlag_Dis: this.props.StatusFlag_Dis,
            DisplayImg: "M5Stack_Gray_OFF",
            StatusFlag_Fire: this.props.StatusFlag_Fire,
            IP:this.props.IP,
            RSSI:this.props.RSSI,
            Battery:this.props.Battery,
        };

    }

    モーダルウィンドウのハンドラー
    onOpenModal = (e) => {
        console.log(e)
        this.setState({ModalFlag: true});
    };

    onCloseModal = (e) => {
        this.setState({ModalFlag: false});
    };

    displaySwich = () => {

        const Devices = {
            M5Stack_Room1: "M5Stack_iwai",
            M5Stack_Room2: "M5Stack_iwai",
            M5Stack_Door1: "M5Stack_interview",
        };

        if (Devices[this.state.DeviceName]) {
            this.setState({
                ...this.state,
                DisplayImg: Devices[this.state.DeviceName],
            });
        }
        ;
    };


    componentWillMount() {

        //画面電源のスイッチ
        if (this.state.StatusFlag_Dis) {
            this.displaySwich();
        } else {
            this.setState({
                ...this.state,
                DisplayImg: "M5Stack_Gray_OFF",
            });
        }

        //火災警報機のスイッチ
        if (this.state.StatusFlag_Fire) {
            this.setState({
                ...this.state,
                DisplayImg: "M5Stack_fire",
            });
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        // props.id が変更されたら再フェッチ
        this.setState({
                ...this.state,
                StatusFlag_Dis: nextProps.StatusFlag_Dis,
            }
        );

        //画面電源のスイッチ
        if (nextProps.StatusFlag_Dis) {
            this.displaySwich();
        } else {
            this.setState({
                ...this.state,
                DisplayImg: "M5Stack_Gray_OFF",
            });
        }

        //火災警報機のスイッチ
        if (nextProps.StatusFlag_Fire) {
            this.setState({
                ...this.state,
                DisplayImg: "M5Stack_fire",
            });
        }

    }



    render() {

        return (
            <div className={"contentsM5"}>
                    <table>
                        <tbody>
                        <tr>
                            <th>
                                <img src={`${process.env.PUBLIC_URL}/M5Stack/${this.state.DisplayImg}.png`} />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <p onClick={e =>this.onOpenModal(e)}>デバイス名:{this.state.DeviceName}</p>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                <Modal open={this.state.ModalFlag} onClose={e => this.onCloseModal(e)} closeIconSize={0} center>
                    <table>
                        <tbody>
                        <tr>
                            <th>
                                <p>IP:{this.state.IP}</p>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <p>RSSI:{this.state.RSSI}</p>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <p>Battery:{this.state.Battery}</p>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </Modal>
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
// export default App;
