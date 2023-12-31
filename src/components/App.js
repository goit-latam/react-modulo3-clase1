import { Component } from 'react';
import { RecipeList } from './RecipeList/RecipeList';
import initialRecipes from '../recipes.json';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { RecipeForm } from './RecipeForm/RecipeForm';

// render > didMount > getItem > setState > update > render > didUpdate > setItem

export class App extends Component {
  state = {
    recipes: [],
  };

  componentDidMount() {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes !== null) {
      // si ya hay algo guardado en  LS , escribimos esto en  state
      this.setState({ recipes: JSON.parse(savedRecipes) });
    } else {
      // si  LS todavia no tiene nada, escribimos en  state initialRecipes
      this.setState({ recipes: initialRecipes });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.recipes !== this.state.recipes) {
      localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    }
  }

  addRecipe = newRecipe => {
    this.setState(prevState => ({
      recipes: [...prevState.recipes, newRecipe],
    }));
  };

  deleteRecipe = recipeId => {
    this.setState(prevState => ({
      recipes: prevState.recipes.filter(recipe => recipe.id !== recipeId),
    }));
  };

  render() {
    console.log('render');
    return (
      <Layout>
        <RecipeForm onSave={this.addRecipe} />
        <RecipeList items={this.state.recipes} onDelete={this.deleteRecipe} />
        <GlobalStyle />
      </Layout>
    );
  }
}
