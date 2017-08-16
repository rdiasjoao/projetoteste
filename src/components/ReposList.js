import React from 'react'
import { Link } from 'react-router-dom'


const ReposList = ({ repos }) => {
return(
  <div>
    <h2>Repositórios</h2>
    <ul>
      {
        
        repos.map(p => (
          <li key={p.id}>
            <Link to={`/${p.name}`} style={{color: '#FFFFFF'}}><b>{p.name}</b></Link>
          </li>
        ))
      }
    </ul>
  </div>
)   
}

ReposList.propTypes = {
  repos: React.PropTypes.array,
};

export default ReposList;