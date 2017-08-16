import React from 'react'
import { Link } from 'react-router-dom'
import GitHubRepoService from "../services/GitHubRepoService"
import ReposList from './ReposList'
import axios from 'axios'
import CommitsList from './CommitsList'
import ajax from 'superagent'
import BackAPI from '../api'

class Principal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
    this.updateRepos = this.updateRepos.bind(this);
  }

  updateRepos(repos) {
    this.setState({repos: repos});
  }

  componentDidMount(props) {
    ajax.get('https://api.github.com/orgs/globocom/repos')
    .end((error, response) => {
      if (!error && response) {
        response.body.sort(function (a, b) {
          if (parseInt(a.stargazers_count) < parseInt(b.stargazers_count)) return 1;
          if (parseInt(a.stargazers_count) > parseInt(b.stargazers_count)) return -1;
          return 0;
        });
        this.setState({ repos: [] });
        this.setState({ repos: response.body });
        BackAPI.loadRepos();
      } else {
        console.error('Erro ao recuperar do GitHub', error);
      }
    }
  );
  }

  render() {
    return (
      <div>
        <ReposList
          repos={this.state.repos}
        />
      </div>
    );
  }
}

export default Principal;

