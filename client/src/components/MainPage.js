import React, { Component } from 'react';
import { Dimmer, Loader, Form, Input, Message, Grid, Segment, Divider, Image, Header } from 'semantic-ui-react';
import axios from 'axios';

import PriceInfo from './PriceInfo';

class MainPage extends Component {
    state = {
        barcode: '',
        isLoading: false,
        error: '',
        doc: null
    }

    constructor(props) {
        super(props);
        // создадим реф в поле `textInput` для хранения DOM-элемента
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.timer = null;
    };

    onFocusWindow = () => {
        this.focusTextInput();
    };

    focusTextInput() {
        // Установим фокус на текстовое поле с помощью чистого DOM API
        // Примечание: обращаемся к "current", чтобы получить DOM-узел
        this.textInput.current.focus();
    };

    componentDidMount() {
        this.focusTextInput();
        window.addEventListener("focus", this.onFocusWindow)
    };

    componentWillUnmount() {
        window.removeEventListener("focus", this.onFocusWindow)
    };

    handleChange = (e, d) => {
        this.setState({ barcode: d.value });
    };

    handleBlur = (e) => {
        setTimeout(() => {
            this.focusTextInput();
        }, 50);
    };

    handleSubmit = () => {

        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (this.state.barcode === '') {
            this.setState({ error: '', doc: null });
            return;
        }

        this.setState({ error: '', isLoading: true });
        const url = `/api/price?barcode=${this.state.barcode}`;
        axios.get(url)
            .then((response) => {
                this.setState({ error: '', isLoading: false, doc: response.data.result });
                this.timer = setTimeout(() => {
                    this.setState({ doc: null });
                }, 30000);
            })
            .catch((error) => {
                let errorMsg = '';
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    console.log('error.response:', error.response);
                    if (error.response.status === 400) {
                        errorMsg = error.response.data.result;
                    } else {
                        errorMsg = error.response.data;
                    }

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the 
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('error.request:', error.request);
                    errorMsg = 'Нет ответа от сервера 1С!';
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('error.message:', error.message);
                    errorMsg = 'Неизвестная ошибка сервера!';
                }

                this.setState({ error: errorMsg, isLoading: false });
            });

        this.setState({ barcode: '' });
    };

    renderInfo = () => {

        if (this.state.isLoading) {
            return (
                <Dimmer active inverted>
                    <Loader size='large'>Получение данных о ценах</Loader>
                </Dimmer>);
        }

        if (this.state.error) {
            return (
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Message negative>
                            <Message.Header>Ошибка</Message.Header>
                            <p>{this.state.error}</p>
                        </Message>
                    </Grid.Column>
                </Grid.Row>);
        }

        if (this.state.doc) {
            return (<PriceInfo doc={this.state.doc} />);
        }

        return (<>
            <Image src="/logo.png" centered />
            <Header size='huge' textAlign='center' color='grey'>
                Чтобы проверить цену считайте штрих-код товара
            </Header>
        </>);
    };

    render() {
        return (

            <Segment style={{ height: '100%' }}>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Input
                            ref={this.textInput}
                            size="massive"
                            icon="search"
                            fluid
                            placeholder="Считайте штрих-код товара..."
                            loading={this.props.isLoading}
                            value={this.state.barcode}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                    </Form.Field>
                </Form>

                <Divider />

                {this.renderInfo()}

            </Segment>

        );
    }
}

MainPage.defaultProps = {
    answer: {},
    error: '',
    isLoading: false
};

export default MainPage;
