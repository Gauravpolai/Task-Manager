import { TaskList } from "./components/TaskList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const URL= process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="App">
     <div className="task-container">
      <TaskList />
      <ToastContainer />
     </div>
      
    </div>
  );
}

export default App;
