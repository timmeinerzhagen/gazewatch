// @ts-nocheck

import React from 'react';
import { Grommet, grommet, Heading, Footer, Box, TextInput, Button, Tabs, Tab, Keyboard } from 'grommet';
import { deepMerge } from 'grommet/utils';
import './App.css';

import { Octokit } from "@octokit/rest"

import StarredReposByOrgVisual from './visualizations/StarredReposByOrgVisual';
import StarredReposByTopicVisual from './visualizations/StarredReposByTopicVisual';

const theme = deepMerge(grommet, {
  global: {
    elevation: "large"
  },
  tabs: {
    background: 'light-1',
  },
  tab: {
    pad: 'small',
  },
});

class App extends React.Component {

  state = {
    octokit: new Octokit({
      previews: ["mercy-preview"],
      auth: "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",
    }),
    stargazer_range: 300000,
    username: "timmeinerzhagen",
    value: "timmeinerzhagen",
  }

  render() {
    
    const { stargazer_range, username, octokit, value } = this.state;

    return (
      <Grommet theme={theme} full>
        <Box align="center" pad="small" fill>
          <Box align="center" gap="medium" fill>
            <Tabs style={{height: "100%", width: "90%"}} padding="small" round="large">
              {/* Starred repositories for user grouped by topic */}
              <Tab title="Starred repositories for user grouped by topic">
                <Box direction="column" gap="medium" pad="medium" align="center" justify="between" fill>
                  <Box direction="row" gap="medium" align="center">
                    <Keyboard onEnter={event => { this.setState({username: value})}}>
                      <TextInput value={value} onChange={event => this.setState({value: event.target.value})}/>
                    </Keyboard>
                    <Button primary label="Visualize" onClick={() => {this.setState({username: value})}}/>
                  </Box>
                  <StarredReposByTopicVisual input={{username: username}} options={{range: stargazer_range}} context={{octokit: octokit}}/>
                </Box>
              </Tab>
              {/* Starred repositories for user grouped by org */}
              <Tab title="Starred repositories for user grouped by org">
                <Box direction="column" gap="medium" pad="medium" align="center" justify="between" fill>
                  <Box direction="row" gap="medium" align="center">
                    <Keyboard onEnter={event => { this.setState({username: value})}}>
                      <TextInput value={value} onChange={event => this.setState({value: event.target.value})}/>
                    </Keyboard>
                    <Button primary label="Visualize" onClick={() => {this.setState({username: value})}}/>
                  </Box>
                  <StarredReposByOrgVisual input={{username: username}} options={{range: stargazer_range}} context={{octokit: octokit}}/>
                </Box>
              </Tab>
            </Tabs>
          </Box>
          <Footer align="center" direction="row" justify="between" gap="medium">
            <Heading level={2}> View the project on <a href="https://github.com/timmeinerzhagen/gazewatch">GitHub</a> </Heading>
          </Footer>
        </Box>
      </Grommet>
    );
  }
}

export default App;
