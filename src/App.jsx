import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IssuesContextWrapper from "./store/IssuesContext";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import PageUpButton from "./component/common/PageUpButton";
function App() {
  return (
    <IssuesContextWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <PageUpButton />
    </IssuesContextWrapper>
  );
}

export default App;