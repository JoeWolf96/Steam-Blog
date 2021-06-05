// NO MODAL
import './App.css';
import React, { Component } from 'react'
import NewForm from './components/NewForm'
import PostsTable from './components/PostsTable'
import Nav from './components/Nav'
import SteamView from './components/steamview'





// more on React environment variables
// https://create-react-app.dev/docs/adding-custom-environment-variables/
const music="./background.mp3"
let baseUrl = 'http://localhost:3005'
console.log(baseUrl)
// let baseUrl = 'http://localhost:3003'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      steam:'',
      prices:'',
      posts: [],
      modalOpen: false,
      postsToBeEdited:[],
      name: '',
      userLogedIn: false,

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
  //api stuff
  getAPI = (event)=>{
    // event.preventDefault()
    console.log('test')
    fetch(baseUrl + "/steam/",{
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

      this.setState({
        steam: data,
      })
     })
  }
  getPRICE = (event)=>{
    // event.preventDefault()
    console.log('testPrice')
    fetch(baseUrl + "/steam/price",{
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

      this.setState({
        prices: data,
      })
     })
  }
  //music stuff

  componentDidMount() {
   this.getAPI()

 }
// handleChange2 (event) {
//   this.setState({ [event.target.id]: event.target.value })
// }

  render () {



    return (
      <div className="App">

      <Nav loggingUser={this.loggingUser} register={this.register}/>


      <div className="intro">

      <h1> SteamDb </h1>
      </div>


      <p>Take a look at the latest Steam Releases</p>
      

      { this.state.steam
        &&
        <SteamView

        steam={this.state.steam}

        //addToFavourite
        />

      }


      <p class="article1description">Add To Your Favourites</p>
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
