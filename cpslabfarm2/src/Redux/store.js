// store.js
// storeは巨大なjsonです。storeの中身を取り出すにはgetStateメソッドを使います。
import {reducers} from "./reducer";
import {createStore} from "redux";

export const store = createStore(reducers);



// エミュレータでcommand + dを押し、enable remote debugをクリックしましょう。
// debuggerが現れるので、consoleタブをクリックし、エミュレータ上でアプリをcommandd + rで再起動しましょう。
console.log(store.getState);

// arrayやobjectを綺麗に表示したい時はconsole.tableが便利です。
console.table(store.getState);

// storeはjsonです。つまりjsのオブジェクトです。 jsの関数のtypeofでstoreのstateがオブジェクトであることを確かめましょう。
console.log(typeof store.getState);

// storeもまたjsのオブジェクトであり、４つしかメソッドを持たないことを確認しておきましょう。
console.log(store);

