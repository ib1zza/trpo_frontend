import CategoryCards from "../../components/CategoriesList";
import {Divider, Space, Typography} from "antd";
import SearchBar from "../../components/SearchBar";
const {Title} = Typography;

const Home = () => {
    return (
        <div>
            <SearchBar/>
            <Divider style={{marginBottom: 40}}>
                <Title title="Home" level={1}>Категории</Title>
            </Divider>
            <CategoryCards/>
        </div>
    );
};

export default Home;
