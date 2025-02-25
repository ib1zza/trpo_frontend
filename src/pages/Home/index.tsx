import CategoryCards from "../../components/CategoriesList";
import {Divider, Space, Typography} from "antd";
const {Title} = Typography;

const Home = () => {
    return (
        <div>
            <Divider style={{marginBottom: 40}}>
                <Title title="Home" level={1}>Категории</Title>
            </Divider>
            <CategoryCards/>
        </div>
    );
};

export default Home;
