import './App.css';
import StudentProfiles from './pages/StudentProfiles/StudentProfiles';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <div className="max-w-7xl mx-auto">
      <StudentProfiles></StudentProfiles>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
