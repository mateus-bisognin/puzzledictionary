import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import api from './services/api';
import GlobalStyle from './globalstyles';

import { Container, Button } from './styles';

export default class App extends Component {
  state = {
    word: '',
    matches: [],
    loading: false,
    warning: '',
  };

  handleInputChange({ target }) {
    this.setState({
      word: target.value,
      warning: '',
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const { word } = this.state;

    const withoutNumbers = word.replace(/\d+/g, '');

    if (withoutNumbers !== word) {
      this.setState({
        warning: 'Parameter must not contain any number',
        loading: false,
      });
      return;
    }

    const searchParams = withoutNumbers.split('*');

    if (searchParams.every(param => param.length === 0)) {
      this.setState({
        warning: 'Parameter must contain letters',
        loading: false,
      });
      return;
    }

    if (!searchParams.some(param => param.length > 2)) {
      this.setState({
        warning: 'Parameter must contain at least 3 consecutive letters',
        loading: false,
      });
      return;
    }

    const chosedOne = searchParams.reduce((choice, cur) => {
      choice = cur.length > choice.length ? cur : choice;
      return choice;
    }, '');

    const index = searchParams.indexOf(chosedOne);

    const searchOption =
      index === 0
        ? 'prefix'
        : index === searchParams.length - 1
        ? 'suffix'
        : 'infix';

    const encoded = encodeURI(chosedOne);
    const { data } = await api.get(`/${searchOption}/${encoded}`);

    if (data.length === 0) {
      this.setState({
        warning: 'Search returned no match',
        loading: false,
      });
      return;
    }

    const results = data.filter(words => {
      const wordToCheck = words.word;

      return searchParams.every(
        param => word.indexOf(param) === wordToCheck.indexOf(param),
      );
    });

    this.setState({
      matches: results,
      loading: false,
    });
  }

  render() {
    const { word, matches, loading, warning } = this.state;

    return (
      <>
        <GlobalStyle />
        <Container>
          <form>
            <h2>Busque por uma palavra</h2>
            <h5>Deve conter no mínimo 3 letras em sequência</h5>
            <h5>Utilize acentos</h5>
            <h5>Para letras faltando, utilize *</h5>
            <input
              type="text"
              value={word}
              onChange={e => this.handleInputChange(e)}
            />
            <span>{warning}</span>
            <Button
              disabled={loading}
              type="submit"
              onClick={event => this.handleSubmit(event)}
            >
              {loading ? 'Carregando' : 'Procurar'}
            </Button>
          </form>
          <ul>
            {matches.map(match => (
              <li key={match.word}>
                {match.word}: {ReactHtmlParser(match.preview)}
              </li>
            ))}
          </ul>
        </Container>
      </>
    );
  }
}
