

const PostsTable = (props)=>{
  console.log(props.posts)
    return (


        <table>
          <div className="Favourites">
            <tbody>
                {props.posts.map(posts => {
                    return (
                        <tr key={posts._id.na} >
                        <td>{posts.name}</td>
                        <td onClick={() => props.deletePosts(posts._id)}> DELETE  </td>
                        <td onClick={() => props.showEditForm(posts)}> EDIT  </td>
                        </tr>
                        )
                    })
                }
            </tbody>
              </div>

        </table>



    )


}

export default PostsTable
