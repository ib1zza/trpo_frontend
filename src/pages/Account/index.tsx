import {Button, Card, Divider, Space, Typography} from "antd";
import {useUser} from "../../hooks/data/useUser.ts";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../services/store.ts";
import {clearUser} from "../../services/slices/userSlice.ts";
import {AppRoutes} from "../../components/AppRouter";
import {UserRole} from "../../api/User.ts";

const AccountPage = () => {
    const {resources, user} = useUser();

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    function handleSignOut() {
        dispatch(clearUser());
        localStorage.removeItem('user');
        navigate(AppRoutes.HOME);
    }
    return (
        <div>
            <Divider style={{marginBottom: 40}}>
                <Typography.Title title="Home" level={1}>Профиль</Typography.Title>
            </Divider>

            <Space direction={"vertical"} style={{
                marginBottom: 20
            }}>
                <Space>
                    <Typography.Title level={3}>Email: {user?.email}</Typography.Title>
                </Space>
                {user?.user_type === UserRole.RESOURCE_OWNER && <Space>
                    <Typography.Title level={3}>Ваш аккаунт {user?.approved ? "подтвержден" : "не подтвержден"}</Typography.Title>
                </Space>}
                <Space>
                    <Button color={"danger"} variant={"solid"} onClick={handleSignOut}>
                        Выйти из аккаунта
                    </Button>
                </Space>
            </Space>

            <Typography.Title level={2}>Ваши ресурсы</Typography.Title>

            {resources.length ? <Space direction={"vertical"} style={{
                width: "100%",
                marginTop: 20
            }}>
                {
                    resources.map((resource) => (
                        <Card
                            key={resource.id}
                            title={<a href={resource.url}>{resource.title}</a>}
                            style={{marginBottom: 16, textAlign: "left"}}
                            extra={
                            <Space>
                                <Link to={`/resources/${resource.id}`}>Подробнее</Link>
                                <Link to={`/resources/edit/${resource.id}`}>Редактировать</Link>
                            </Space>
                            }
                        >
                            <p><strong>Описание:</strong> {resource.description}</p>
                            <p><strong>Последнее обновление:</strong> {new Date(resource.updatedAt).toLocaleString()}
                            </p>
                            <p><strong>Контакт:</strong> {resource.contact_info}</p>
                            <p><strong>Ключевые слова:</strong> {resource.keywords.join(", ")}</p>
                        </Card>
                    ))
                }
            </Space> : <Space>
                <Typography.Text>У вас еще нет ресурсов</Typography.Text>
                <Link to={AppRoutes.CREATE_RESOURCE}>Создать ресурс</Link>
            </Space>}

        </div>
    );
};

export default AccountPage;
