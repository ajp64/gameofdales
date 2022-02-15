import { ChooseTime } from "./ChooseTime";
import "antd/dist/antd.css";
import css from "./App.module.css";

function App() {
  return (
    <div className={css.mainTitle}>
      <h1 className={css.mainTitle}>Games for Dale</h1>
      <ChooseTime />
    </div>
  );
}

export default App;
