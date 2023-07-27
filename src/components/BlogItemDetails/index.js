// Write your JS code here
import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogItem: {}, isLoading: false}

  componentDidMount() {
    this.getblogeachDetails()
  }

  getblogeachDetails = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedDetails = {
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      content: data.content,
      author: data.author,
    }
    this.setState({blogItem: updatedDetails, isLoading: false})
  }

  render() {
    const {blogItem, isLoading} = this.state
    console.log('blogitemdetails loader', isLoading)
    const {title, imageUrl, content, avatarUrl, author} = blogItem
    return (
      <div className="blog-container">
        {isLoading ? (
          <div data-testid="loader">
            {/* <Loader
              data-testid="loader"
              type="TailSpin"
              color="#00BFFF"
              height={50}
              width={50}
            /> */}
          </div>
        ) : (
          <div className="blog-info">
            <h2 className="blog-details-title">{title}</h2>

            <div className="author-details">
              <img className="author-pic" src={avatarUrl} alt={author} />
              <p className="details-author-name">{author}</p>
            </div>

            <img className="blog-image" src={imageUrl} alt={title} />
            <p className="blog-content">{content}</p>
          </div>
        )}
      </div>
    )
  }
}

export default BlogItemDetails
