import { Grid } from 'semantic-ui-react';

import './App.css';
import MainPage from './components/MainPage';

function App() {
  return (

    <Grid celled padded style={{ height: '100vh' }}>
      <Grid.Row style={{ height: '100%' }}>
        <Grid.Column width={16}>

          <MainPage />

        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
