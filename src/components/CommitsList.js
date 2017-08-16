import React from 'react';
import BackAPI from '../api';
import { Link } from 'react-router-dom';
import GitHubRepoService from "../services/GitHubRepoService"
import axios from 'axios'
import ajax from 'superagent'

class CommitsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {repo: [], commits: [], pagina: 1 };
	};

	updatePagina(pagina) {
    this.setState({pagina: pagina});
  }

	componentDidMount(props) {
    axios
    .get('https://api.github.com/repos/globocom/' + this.props.match.params.name + '/commits?per_page=20&page=' +this.state.pagina)
		.then(res => this.setState({ commits: res.data }))
	
		var repositorio = BackAPI.get(this.props.match.params.name);
		this.setState({repo: repositorio});
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps')
		if (nextProps.match.params.name !== this.props.match.params.name) {
			axios
			.get('https://api.github.com/repos/globocom/' + nextProps.match.params.name + '/commits?per_page=20&page=' +1)
			.then(res => this.setState({ commits: res.data }))
			this.updatePagina(1);
			const btnLoadMoreCommits = document.getElementsByClassName('btn-primary')[0];
			btnLoadMoreCommits.style.display ='block';
			var repositorio = BackAPI.get(nextProps.match.params.name);
			this.setState({repo: repositorio});
		}
	}
	
	carregaMais(e) {
		const paginaAtual = this.state.pagina + 1;
		ajax.get('https://api.github.com/repos/globocom/' + this.props.match.params.name + '/commits?per_page=20&page=' + paginaAtual)
			.end((error, response) => {
				if (!error && response) {
					let commits = this.state.commits;
					Array.prototype.push.apply(commits, response.body);
					this.setState({ commits: commits });
					this.setState({ pagina: paginaAtual });
					if (!response.links.last) {
						const btnLoadMoreCommits = document.getElementsByClassName('btn-primary')[0];
						btnLoadMoreCommits.style.display ='none';
					}
				} else {
					console.error('Erro', error);
				}
			}
		);
	}
	
	render() {
		if(this.state.commits){
		return (
			<div >
				<h1>{this.state.repo.name}</h1>
				<p>
					<span className="d-inline-block mr-1">
					    Stars: {this.state.repo.stargazers_count}
					</span>
					<div className="clear"></div>
					<span className="d-inline-block mr-1">
						Forks: {this.state.repo.forks}
					</span>
				</p>
				<hr />
				<h2>Commits</h2>
				<ul className="list-unstyled">
					{this.state.commits.map((commit, index) => {
						return (
							<li className="mb-1" key={index}>
								{commit.commit ? commit.commit.message : '??'}<br />
							</li>
						);
					})}
				</ul>
				<div className="text-xs-center">
					<button className="btn btn-primary" onClick={(e) => this.carregaMais(e)}>Carregar mais</button>
				</div>
			</div>
		);
	 } return false;
	}
}


export default CommitsList;
