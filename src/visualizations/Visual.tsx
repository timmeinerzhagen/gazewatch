import React from 'react';
import { Box, Spinner } from 'grommet';

type VisualProps = {
  input: any,
  options: any,
  context: any,
}

type VisualState = {
  loading: boolean,
  data: any,
}

class Visual extends React.Component<VisualProps, VisualState> {

  visualRef: any

  constructor(props: any) {
    super(props);
    this.visualRef = React.createRef();
    this.state = {
      loading: true,
      data: {
        name: "timmeinerzhagen",
        children: [{"name": "BetweennessCentrality", "value": 20},],
      },
    };
  }

  async componentDidMount(){
    await this.reload();
    this.draw();
  }

  async componentDidUpdate(prevProps: any) {
    if (JSON.stringify(prevProps.input) !== JSON.stringify(this.props.input)) {
      this.setState({loading: true});
      await this.reload();
      this.draw();
    }
  }

  render(){
    const { loading } = this.state;



    return(
      <Box align="center" justify="center" direction="column" fill>
        { loading && <Spinner justify="center" /> }
        <Box ref={this.visualRef} fill={!loading} style={{display: loading ? "none" : "block"}} />
      </Box>
    );
  }

  async reload(){};
  draw(){};

  createVisualizationData(data: any) {
    let json: any = {
        name: "timmeinerzhagen",
        children: [],
    };

    Object.keys(data).forEach(function(key) {
        let entry: any = data[key];
        let children: any = [];

        entry.forEach(function(repo: any) {
            children.push({
                name: repo.name,
                value: repo.stargazers_count,
            });
        });

        json.children.push({
            name: key,
            children: children,
        });
    });
    return json;
  }
};

export default Visual;
