import GitHubRepoService from "./services/GitHubRepoService"

const BackAPI = {
  repos : [],
  commits :[
  ],

  updateRepos: function(repos) {
    this.repos = repos;
  },

  updateCommits: function(commits) {
    this.commits = commits;
  },

  loadRepos: function() {
    GitHubRepoService.getAllRepos().then(function(response){
      this.updateRepos(response.data);
      return response.data
    }.bind(this));
    
  },
  
  all: function() {
      GitHubRepoService.getReposByUsername().then(function(response){
        this.updateRepos(response.data);
      }.bind(this));
    return this.repos
  },

    get: function(id) {
      console.log('get');
      console.log(this.repos)
      const isRepo = p => p.name === id
      console.log(this.repos.find(isRepo))
      return this.repos.find(isRepo)
    },

  getCommits: function(repo, pagina){
    GitHubRepoService.getCommitsByRepo(repo, pagina).then(function(response){
      this.updateCommits(response.data);
      return response.data;
    }.bind(this));
  return this.commits
  }
 
}

export default BackAPI
