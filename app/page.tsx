import Bg from './components/Bg';
import Header from './components/Header';
import TaskBar from './components/TaskBar';

export default function page() {
  return (
    <div className="relative">
        <Bg />
        <Header />
        <TaskBar />
    </div>
  )
}