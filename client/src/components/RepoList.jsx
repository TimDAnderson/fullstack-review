import React from 'react';
import Repo from './Repo.jsx'

const RepoList = (props) => {
  console.log('this is the RepoList component')
  console.log(props.repos)
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <div>
        {
          props.repos.map(repo => {
            return (
              <Repo repo={repo}/>
            )
          })
        }
      </div>
    </div>

  )
}

export default RepoList;