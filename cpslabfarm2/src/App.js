import React, {Component} from 'react'
import './App.css';
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import M5stack from './M5Stack/App';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }



    render() {

        return (
            <Provider store={store}>
                <M5stack />
            </Provider>
        )
    }
}

export default App;
// export default App;
