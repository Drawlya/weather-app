import React from "react";
import { Provider } from "react-redux";
// core components
import Main from "./components/layout/Main.js";

import { interceptor } from "./services";
import store from "./store";

interceptor(store);

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Main />
      </Provider>
    </React.Fragment>
  );
}

export default App;
