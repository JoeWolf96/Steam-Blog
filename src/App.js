// NO MODAL
import './App.css';
import React, { Component } from 'react'
import NewForm from './components/NewForm'
import PostsTable from './components/PostsTable'
import Nav from './components/Nav'
import SteamView from './components/steamview'





// more on React environment variables
// https://create-react-app.dev/docs/adding-custom-environment-variables/

let baseUrl = 'http://localhost:3005'
console.log(baseUrl)
// let baseUrl = 'http://localhost:3003'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiUrl:'https://api.steampowered.com/ISteamApps/GetAppList/v2/',
      query: '&format=json',
      apiKey:'?key=788BB881FB9E4532A765F61E7C1D7847',
      steam:'',
      appDetails:'',
      posts: [],
      modalOpen: false,
      postsToBeEdited:[],
      name: '',
      userLogedIn: false
    }

  }

  getPosts = () => {
    // fetch to the backend
    fetch(baseUrl + "/posts",{
      credentials: "include"
    })
    .then(res => {
      if (res.status===200){
        return res.json()
      }
      else {
        return []
      }
    }).then(data => {
      console.log(data)
      this.setState({
        posts: data,
      })
     })
  }

  addPosts = (newPosts) => {
    const copyPosts = [...this.state.posts]
    copyPosts.push(newPosts)
    this.setState({
      posts: copyPosts,
    })
  }
  loggingUser = async (e) => {
    console.log('loggingUser')
    e.preventDefault()
    const url = baseUrl + '/users/login'
    const logindBody = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    try {

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(logindBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })

      console.log(response)
      console.log("BODY: ",response.body)

      if (response.status === 200) {
        this.getPosts()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }

  register = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/users/signup'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        this.getPosts()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }

  deletePosts = async (id) => {
    console.log('works')
    const url = baseUrl + '/blog/' + id

    try{
      const response = await fetch( url, {
        method: 'DELETE',
        credentials: "include"
      })

      if (response.status===200){

        const findIndex = this.state.posts.findIndex(posts => posts._id === id)
        const copyPosts = [...this.state.posts]
        copyPosts.splice(findIndex, 1)

        this.setState({
          posts: copyPosts
        })
        console.log(this.state.posts)
      }

    }
    catch(err){
      console.log('Error => ', err);
    }
  }



handleSubmit = async (e) => {
  e.preventDefault()
    const url = baseUrl + '/blog/' + this.state.postsToBeEdited._id
    console.log(this.state.postsToBeEdited._id)
    try{
      const response = await fetch( url , {
        method: 'PUT',
        body: JSON.stringify({
          name: e.target.name.value,

        }),
        headers: {
          'Content-Type' : 'application/json'
        },
        credentials: "include"
      })

      if (response.status===200){
        const updatedPosts = await response.json()
        const findIndex = this.state.posts.findIndex(posts => posts._id === updatedPosts.data._id)
        const copyPosts = [...this.state.posts]
        copyPosts[findIndex] = updatedPosts.data

        this.setState({
          posts: copyPosts,
          modalOpen:false
        })
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
  }



  componentDidMount() {
    this.getPosts()
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showEditForm = (posts)=>{
    this.setState({
      modalOpen:true,
      name: posts.name,
      postsToBeEdited:posts
    })

  }
  handleSubmit2 = (event)=>{
    event.preventDefault()
    this.setState({
      searchURL: this.state.apiUrl + this.state.apiKey + this.state.query
    }, () => {
      fetch(this.state.searchURL,{
        mode: 'no-cors'
      })
      .then(response => {

        return response.json()
      }).then(json => this.setState({
        steam: json,
        appDetails: ''
      }),
      err => console.log(err))
    })
  }
// handleChange2 (event) {
//   this.setState({ [event.target.id]: event.target.value })
// }

  render () {
    console.log(this.state.posts)


    return (
      <div className="App">
        <Nav loggingUser={this.loggingUser} register={this.register}/>

          <h1> SteamSale </h1>
          <p class="intro">peepee</p>
          <>
          <form onSubmit={this.handleSubmit2}>
            <label htmlFor='appDetails'>Title</label>
            <input
              type='submit'
              value='find game info'
            />
          </form>
          {(this.state.steam)
            ? <appDetails steam={this.state.steam} />
            : ''
          }
        </>
          <p class="article1description">add comment</p>
          <NewForm baseUrl={ baseUrl } addTopic={ this.addPosts } />

          <PostsTable
            posts={this.state.posts}
            deletePosts={this.deletePosts}
            showEditForm={this.showEditForm}
            />
          <br/>
          <br/>

          {this.state.modalOpen &&

            <form onSubmit={this.handleSubmit}>
              <label>Edit: </label>
              <input name="name" value={this.state.name} onChange={this.handleChange}/> <br/>
              <button>submit Edit</button>

            </form>
          }
      </div>
    );
  }
}

export default App;
