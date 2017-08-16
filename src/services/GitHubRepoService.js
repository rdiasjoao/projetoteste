import axios from 'axios'

const GitHubRepoService = {
  getAllRepos: function () {
    return axios.get('https://api.github.com/orgs/globocom/repos');
  },

  getCommitsByRepo: function(repo, page){
    return axios.get('https://api.github.com/repos/globocom/' + repo + '/commits?per_page=20&page=' + page); 
  },

  getCommits: function(repo, pagina){
    this.getCommitsByRepo(repo, pagina).then(function(response){
      return response.data;
    }.bind(this));
  
  },

  getAll: function(){
    this.getAllRepos().then(function(response){
      return response.data;
    }.bind(this));
  
  },
};


export default GitHubRepoService;