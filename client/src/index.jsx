import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO

    $.ajax({
      method: 'POST',
      url: 'https://calm-citadel-77933.herokuapp.com/repos',
      data: {"GitHandle": term},
      datatype: "json"
    })
      .done((repoArr)=>{
        console.log(repoArr)
        this.setState({
          repos: repoArr
        })
      })
  }

  searchAll () {
    console.log('in search all')
    $.ajax({
      url: 'https://calm-citadel-77933.herokuapp.com/repos'
    })
      .done((repoArr)=>{
        console.log(repoArr)
        this.setState({
          repos: repoArr
        })
      })

  }

  componentDidMount () {
    this.searchAll()
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));