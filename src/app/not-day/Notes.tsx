import React from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";

// components
import { ContentText } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content, FAB, Card, CardHeader } from "../_shared/styled";

export const Notes = () => {
    const history = useHistory();

    const homeIconAction = () => {
        history.push("/");
    };

    const getFABAction = () => {
        history.push("/add-note");
    };

    return (
        <AppContainer>
            <Header title="my notes" leftSideIcon="home-grey" leftSideIconAction={homeIconAction} />
            <Content>
                <Card>
                    <CardHeader style={{ marginBottom: "10px" }}>consectetur</CardHeader>
                    <ContentText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor hutnke fnjnks plifthar sit
                        amet, consectetur adipisicing elit, sed do eiusmod. Donec vitae tristique erat. Mauris at lorem
                        sed ipsum pharetra tristique in a lectus. Proin sapien elit, dictum sed massa ut, auctor sodales
                        lacus. Suspendisse potenti.
                    </ContentText>
                </Card>
                <Card>
                    <CardHeader style={{ marginBottom: "10px" }}>hutnke fnjnks</CardHeader>
                    <ContentText>
                        Ut accumsan nulla eget turpis malesuada, eget aliquet enim faucibus. Phasellus id mauris vitae
                        risus tempus tristique. Sed vehicula quam consectetur convallis feugiat. Fusce dapibus a diam
                        sed molestie. Nam et vulputate urna, sed volutpat lectus. Donec viverra turpis nec velit
                        consectetur pretium. Quisque quis ligula sit amet urna sollicitudin elementum sit amet aliquam
                        lacus. Mauris ut mattis tortor. Sed ex nulla, pretium ut vulputate sit amet, blandit et elit.
                        Praesent in vestibulum risus, quis ultricies ante. Aliquam sit amet nibh sit amet sapien ornare
                        ultrices eget ac sem. Nulla facilisi. Integer bibendum, sapien sed accumsan imperdiet, dolor
                        odio dapibus tortor, in luctus ipsum diam sit amet diam.
                    </ContentText>
                </Card>
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
            </FAB>
        </AppContainer>
    );
};
