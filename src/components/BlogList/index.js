// Write your JS code here
import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import BlogItem from '../BlogItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getblogsData()
  }

  getblogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      author: each.author,
      topic: each.topic,
    }))
    this.setState({blogsData: updatedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    console.log('bloglist loader', isLoading)
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <div data-testid="loader">
            {/* <Loader type="TailSpin" color="#00BFFF" height={50} width={50} /> */}
          </div>
        ) : (
          <div>
            {blogsData.map(each => (
              <BlogItem blogData={each} key={each.id} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default BlogList
