import styled from "styled-components";
import Instruction from "./components/Instruction";
import RichEditor from "./components/RichEditor2";
import Title from "./components/Title";


function App() {

  const Edit = styled.div`
    /* display: flex; */
    /* justify-content: space-around; */
  `
  return (
    <div className="App">
      <header className="App-header">
        <Title/>
        <Edit>

        <RichEditor/>
        <Instruction/>
        </Edit>
      </header>
    </div>
  );
}

export default App;
