// Cria teste para cobrir 100% do componente App.js!

import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login';

describe('Teste o arquivo <App.js />.', () => {
  test('Teste se o estado global inicial da aplicação é o esperado.', () => {
    // Arrange

    const initialState = {
      user: {
        name: '',
        email: '',
      },
      api: {
        token: '',
      },
    };
      // Act
    const { store } = renderWithRouterAndRedux(<App />, initialState);
    // Assert
    expect(store.getState()).toEqual(initialState);
  });
});

describe('Teste o componente <Login.js />.', () => {
  test('Testa se existe um input para digitar o Nome do usuario.', () => {
    // Arrange
    renderWithRouterAndRedux(<Login />);
    // Act
    const name = screen.getByTestId('input-player-name');
    // Assert
    expect(name).toBeInTheDocument();
  });
  test('Testa se existe um input para digitar o Email do usuario.', () => {
    // Arrange
    renderWithRouterAndRedux(<Login />);
    // Act
    const email = screen.getByTestId('input-gravatar-email');
    // Assert
    expect(email).toBeInTheDocument();
  });
  test('Testa se existe um botão para entrar e começar o jogo.', () => {
    // Arrange
    renderWithRouterAndRedux(<Login />);
    // Act
    const buttonPlay = screen.getByTestId('btn-play');
    // Assert
    expect(buttonPlay).toBeInTheDocument();
  });
  test('Testa se existe um botão para abrir as configurações.', () => {
    // Arrange
    renderWithRouterAndRedux(<Login />);
    // Act
    const buttonSettings = screen.getByTestId('btn-settings');
    // Assert
    expect(buttonSettings).toBeInTheDocument();
  });
  /* test('Testa se ao clicar no botão de play o usuario é redirecionado para a pagina do jogo.', () => {
    // Arrange

    // Act

    // Assert

  });
  test('Testa se ao clicar no botão de configurações o usuario é redirecionado para a pagina de configurações.', () => {
    // Arrange

    // Act

    // Assert

  }); */
});
