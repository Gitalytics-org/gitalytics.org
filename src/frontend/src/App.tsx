import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

export default function App() {
    return (
        <div>
            <h1 className='text-4xl text-center'>Hello World</h1>
        </div>
    );
}
