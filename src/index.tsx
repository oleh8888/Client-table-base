import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider} from 'react-query'
import './index.css';
import { ReactQueryDevtools } from "react-query/devtools";

 const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <App />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>,
  document.getElementById('root')
);