import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';

// Cria teste para cobrir 90% do componente FeedBack.js! corrigido

describe('Teste o componente <Feedback.js />.', () => {
    test('Testa se existe um texto: "Could be better..." com o score, e numero de acertos caso o acertos sejam < 3', () => {
        // Arrange
        renderWithRouterAndRedux(<Feedback />);
        // Act
        const feedBackText = screen.getByTestId('feedback-text');
        const feedBackQuestions = screen.getByTestId('feedback-total-question');
        const feedBackScores = screen.getByTestId('feedback-total-score');
        // Assert
        expect(feedBackText).toBeInTheDocument();
        expect(feedBackQuestions).toBeInTheDocument();
        expect(feedBackScores).toBeInTheDocument();
      });
    
    test('Testa se existe um texto: "Well Done!" com o score, caso o acertos sejam >= 3', () => {
      // Arrange
      renderWithRouterAndRedux(<Feedback />);
      // Act
      const feedBackText = screen.getByTestId('feedback-text');
      // Assert
      expect(feedBackText).toBeInTheDocument();
    });
    test('Testa se os Botões Play Again e Ranking existem', () => {
      // Arrange
      renderWithRouterAndRedux(<Feedback />);
      // Act
      const buttonPlayAgain = screen.getByTestId('btn-play-again');
      const buttonRanking = screen.getByTestId('btn-ranking');
      // Assert
      expect(buttonPlayAgain).toBeInTheDocument();
      expect(buttonRanking).toBeInTheDocument();
    });
    test('Testa se ao clicar no botão de Play Again o usuario é redirecionado para a pagina do jogo.', () => {
      // Arrange
      const { history } = renderWithRouterAndRedux(<FeedBack />);
      // Act
      const buttonPlayAgain = screen.getByTestId('btn-play-again');
      userEvent.click(buttonPlayAgain)
      const gameTextNext = screen.getByText(/next/i);
      // Assert
      expect(gameTextNext).toBe()
    });
    test('Testa se ao clicar no botão de Ranking o usuario é redirecionado para a pagina do jogo.', () => {
      // Arrange
      const { history } = renderWithRouterAndRedux(<Feedback />)
      // Act
      const buttonRanking = screen.getByTestId('btn-ranking');
      // Asser
      userEvent.click(buttonRanking)
      const textRanking = screen.getByText(/ranking/i);
      expect(textRanking).toBeInTheDocument()
    });
});
