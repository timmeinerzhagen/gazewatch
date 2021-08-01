import Visual from './Visual';
import CircleHierarchyDiagram from '../diagrams/CircleHierarchyDiagram';

class StarredReposByTopicVisual extends Visual {

    draw() {
        CircleHierarchyDiagram.draw(this.visualRef, this.state.data, this.props.options);
    }
  
    async reload() {
        const { octokit } = this.props.context;
        const { username } = this.props.input;

        await octokit
          .paginate(octokit.rest.activity.listReposStarredByUser, {
            username: username,
            per_page: 100,
          })
          .then((data: any) => { 
            let topics: any = {};
    
            data.forEach((repo: any) => {
                repo.topics.forEach((topic: any) => {
                    if(topic in topics)
                        topics[topic].push(repo);
                    else
                        topics[topic] = [repo];
                });
            }); 
            this.setState({ 
                loading: false,
                data: this.createVisualizationData(topics),
            }); 
          })
          .catch((err: any) => { 
            console.error(err);
          });
    }
};

export default StarredReposByTopicVisual;
