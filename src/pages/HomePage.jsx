import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    Container,
    Divider,
    Button,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    Card,
    List,
    Menu,
    Segment,
    Label,
} from 'semantic-ui-react'
import { withTranslation } from 'react-i18next'

class HomePage extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Container style={{ marginTop: "12em" }}>
                    <Item.Group >
                        <Item>
                            <Item.Image size='large' src='https://www.betterbuys.com/wp-content/uploads/2019/08/hrms-hero-intro.png' />

                            <Item.Content>
                                <Item.Header >{t("Human Resource Management System")}</Item.Header>
                                <Item.Meta style={{ marginTop: "1em" }}></Item.Meta>
                                <Item.Description style={{ marginTop: "2em" }}>
                                    {t("İnsan Kaynakları Yönetim Sistemi“Eğer bir tesis varsa, onu hayata geçirmeye başladığınızda. Bu, hemen düşünmenizi gerektirmez. Her gün küçük bir adım hareketi başlatacak.”")}
                                </Item.Description>
                                <Item.Extra style={{ marginTop: "2em" }}>{t("Vakit kaybetmeyin, Bize katılın ve İş/Şirket Uyumunu bulun!!!")}</Item.Extra>
                                <Menu.Item>
                                    <Button size="large" as={NavLink} to="/login" style={{ marginTop: "4em" }}>{t("Giriş Yap")}</Button>
                                    <Button size="large" as={NavLink} to="/recort" positive style={{ marginLeft: "0.6em" }}>{t("Kayıt Ol")}</Button>
                                </Menu.Item>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Container>
            </div>
        )
    }

}

const HomePageWithTranslation = withTranslation()(HomePage);
export default HomePageWithTranslation;