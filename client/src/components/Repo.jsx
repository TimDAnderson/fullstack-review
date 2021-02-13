import React from 'react';

const Repo = (props) => {
  return (
    <tr>
      <td>{props.repo.repoID}</td>
      <td>
        <a href={props.repo.htmlURL}>{props.repo.name}</a>
      </td>
      <td>{props.repo.gitHandle}</td>
      <td>{props.repo.ownerID}</td>
      <td>
         <a href={props.repo.htmlURL}>{props.repo.htmlURL}</a>
      </td>
      <td>{props.repo.watchers_count}</td>
    </tr>
  )
}

Repo.propTypes = {
  repo: React.PropTypes.object.isRequired
};

export default Repo