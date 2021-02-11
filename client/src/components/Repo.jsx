import React from 'react';

const Repo = (props) => {
  console.log('made it to the Repo component')
  console.log(props.repo)
  return (
    <div>{props.repo.name}</div>
  )
}

export default Repo