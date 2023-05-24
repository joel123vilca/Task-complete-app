import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "../componentes/tasks";
import Detail from "../componentes/detail";
import { Provider } from "react-redux";
import { store } from "../redux";

const AppRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks />}></Route>
          <Route path="/update-item/:id" element={<Detail />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRouter;
