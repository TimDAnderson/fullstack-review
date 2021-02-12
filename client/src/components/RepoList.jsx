import React from 'react';
import Repo from './Repo.jsx'
// import Table from 'react-bootstrap/Table'

const RepoList = (props) => {
  console.log('this is the RepoList component')
  console.log(props.repos)
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <table>
        <thead>
          <tr>
            <th>repoID</th>
            <th>RepoName</th>
            <th>owner</th>
            <th>ownerID</th>
            <th>URL</th>
            <th>watchersCount</th>
          </tr>
        </thead>
        <tbody>
        {
          props.repos.map(repo => {
            return (
              <Repo key={repo.repoID} repo={repo}/>
              )
            })
          }
          </tbody>
      </table>
    </div>

  )
}

RepoList.propTypes = {
  repos: React.PropTypes.array.isRequired
};

export default RepoList;