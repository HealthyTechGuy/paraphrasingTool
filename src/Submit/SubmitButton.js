import React, { Component } from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';
import axios from 'axios';
import config from '../config.json';

class SubmitButton extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = { loading: false }

    async handleSubmit() {
        this.setState({ loading: true })
        const body = { inputText: this.props.inputText }

        const response = await axios({
            method: 'post',
            url: 'https://paraphrasing-tool1.p.rapidapi.com/api/rewrite',
            headers: {
                "x-rapidapi-host": "paraphrasing-tool1.p.rapidapi.com",
                "x-rapidapi-key": config.paraphrasingToolRapidAPIKey,
                "content-type": "application/json",
                "accept": "application/json",
                "useQueryString": true
            },
            data: { "sourceText": body.inputText }
        })

        this.setState({ loading: false })
        this.props.responseText(response.data.newText)
    }

    render() {
        const { loading } = this.state;
        return (
            <Box flexWrap="wrap" alignItems="center">
                {
                    loading ?
                        <CircularProgress color="primary" />
                        : <Button onClick={this.handleSubmit} disabled={loading} variant="contained" color="primary" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>Rewrite</Button>
                }
            </Box>

        );
    }
}

export default SubmitButton;