import React from 'react';
import './App.css';

import { Octokit } from "@octokit/rest"
import StarVisual from './visualizations/StarVisual';

class App extends React.Component {

  state = {
    data: [],
    octokit: new Octokit({
      previews: ["mercy-preview"],
      auth: "token",
    }),
  }

  componentDidMount() {
    //this.loadData();
  }

  render() {
    
    const { data } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <StarVisual/>
          </div>
          <div>
            {data.map(element => {
              if('id' in element)
                return(<div>{element['full_name']}</div>)
            })}
          </div>
        </header>
      </div>
    );
  }

  loadData() {    
    const { octokit } = this.state;

    const username = "timmeinerzhagen";  

    octokit
      .paginate(octokit.rest.activity.listReposStarredByUser, {
        username: username,
       per_page: 100,
      })
      .then(data => { 
        console.log(data);
        this.setState({ data: data }); 
      })
      .catch(err => { 
        console.error(err);
      });
  }
};

export default App;
