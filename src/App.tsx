import './App.css'
import AppRouter from "./components/AppRouter";
import HeaderUI from "./components/ui/Header";
import {Layout} from "antd";
const {Content, Footer} = Layout;

function App() {


    return (
        <div className={'App'}>
            <Layout className={'layout'}>
            <HeaderUI/>
            <Content className="content">
                <AppRouter/>
            </Content>
            </Layout>
        </div>

    )
}

export default App
