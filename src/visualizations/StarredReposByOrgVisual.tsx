import Visual from './Visual';
import CircleHierarchyDiagram from '../diagrams/CircleHierarchyDiagram';

class StarredReposByOrgVisual extends Visual {

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
            let orgs: any = {};
    
            data.forEach((repo: any) => {
            if(repo.owner.login in orgs)
                orgs[repo.owner.login].push(repo);
            else
                orgs[repo.owner.login] = [repo];
            });
            this.setState({ 
                loading: false,
                data: this.createVisualizationData(orgs),
            });
          })
          .catch((err: any) => { 
            console.error(err);
          });
    }
};

export default StarredReposByOrgVisual;
