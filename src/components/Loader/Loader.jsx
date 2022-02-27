import { Grid, Loader } from 'semantic-ui-react'

export default function Loading() {
  return (
    <Grid centered style={{backgroundColor: 'black' }}>
      <Grid.Column>
        <Loader size="small" active style={{backgroundColor: 'black' }}>
          Loading
        </Loader>
      </Grid.Column>
    </Grid>
  );
}