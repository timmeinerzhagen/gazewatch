import React from 'react';
import { Grommet, Heading, Header, Footer, Box, TextInput, Button } from 'grommet';
import './App.css';

import { Octokit } from "@octokit/rest"
import StarVisual from './visualizations/StarVisual';

class App extends React.Component {

  state = {
    rawdata: [],
    data_visualization: {
      name: "timmeinerzhagen",
      children: [{"name": "BetweennessCentrality", "value": 20},],
    },
    octokit: new Octokit({
      // previews: ["mercy-preview"],
    }),
    stargazer_range: 10000,
    username: "timmeinerzhagen",
    loading: true,
  }

  async componentDidMount() {
    this.loadData("timmeinerzhagen")
  }

  render() {
    
    const { data_visualization, stargazer_range, username, loading} = this.state;

    return (
      <Grommet style={{height: "100vh", width: "100vw"}}>
        <Box fill={true} align="center">
          <Header align="center" direction="row" justify="between" gap="medium">
            <Heading> Repositories with stargazers by user grouped by org </Heading>
          </Header>
          <Box align="center" gap="small" fill={true}>
            <Box direction="row" gap="medium">
              <TextInput 
                value={username}
                onChange={event => this.setState({username: event.target.value})}/>
              <Button primary label="Visualize" onClick={() => {this.setState({loading: true}); this.loadData()}}/>
            </Box>
            <StarVisual fill={true} data={data_visualization} range={stargazer_range} loading={loading}/>
          </Box>
          <Footer align="center" direction="row" justify="between" gap="medium">
            <Heading level={2}> View the project on <a href="https://github.com/timmeinerzhagen/gazewatch">GitHub</a> </Heading>
          </Footer>
        </Box>
      </Grommet>
    );
  }

  loadData() {    
    const { octokit, username } = this.state;

    octokit
      .paginate(octokit.rest.activity.listReposStarredByUser, {
        username: username,
        per_page: 100,
      })
      .then(data => { 
        this.setState({ rawdata: data }); 
        this.generateByOrg(data);
      })
      .catch(err => { 
        console.error(err);
      });
  }

  generateByOrg(data) {

    let orgs = {};

    data.forEach(repo => {
      if(repo.owner.login in orgs)
        orgs[repo.owner.login].push(repo);
      else
        orgs[repo.owner.login] = [repo];
    });
    this.setState({ data: orgs }); 
    this.createVisualizationData(orgs);
  }

  createVisualizationData(data) {
    let json = {
      name: "timmeinerzhagen",
      children: [],
    };

    Object.keys(data).forEach(function(key) {
        let entry = data[key];
        let children = [];

        entry.forEach(function(repo) {
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

    this.setState({ 
      data_visualization: json,
      loading: false,
    }); 
  }
}

export default App;
