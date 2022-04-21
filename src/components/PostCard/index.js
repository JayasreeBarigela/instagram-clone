import {Component} from 'react'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {BsHeart, BsHeartFill} from 'react-icons/bs'

import {BiShareAlt} from 'react-icons/bi'

import {FaRegComment} from 'react-icons/fa'

import './index.css'

class PostCard extends Component {
  state = {
    isLiked: false,
  }

  toggleLike = async () => {
    await this.setState(prev => ({isLiked: !prev.isLiked}))
    const {data} = this.props
    const {postId} = data
    const {isLiked} = this.state
    const requestBody = {
      like_status: isLiked,
    }
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(requestBody),
    }
    const postUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const response = await fetch(postUrl, options)
    const responseData = await response.json()
    console.log('like status', responseData)
  }

  render() {
    const {data} = this.props
    const {
      postId,
      userId,
      userName,
      profilePic,
      likesCount,
      comments,
      createdAt,
      postDetails,
    } = data
    const {isLiked} = this.state

    return (
      <li className="post-card-list-container" key={postId}>
        <Link to={`/users/${userId}`} className="decoration-none">
          <div className="post-card-profile-row">
            <div className="post-card-profile-bg-container">
              <img
                src={profilePic}
                alt="post author profile"
                className="post-card-profile-pic"
              />
            </div>
            <p className="user-name">{userName}</p>
          </div>
        </Link>
        <img
          alt="post"
          src={postDetails.image_url}
          className="post-card-image"
        />
        <div className="post-card-text-container">
          <div className="like-comment-share-row">
            {!isLiked && (
              <button
                type="button"
                className="transparent-btn"
                onClick={this.toggleLike}
                testid="likeIcon"
              >
                <BsHeart size={20} color="#262626" />
              </button>
            )}
            {isLiked && (
              <button
                type="button"
                className="transparent-btn"
                onClick={this.toggleLike}
                testid="unLikeIcon"
              >
                <BsHeartFill size={20} color="red" />
              </button>
            )}
            <button type="button" className="transparent-btn">
              <FaRegComment size={20} color="#475569" />
            </button>
            <button type="button" className="transparent-btn">
              <BiShareAlt size={20} color="#475569" />
            </button>
          </div>
          <p className="text-bold">
            {isLiked ? likesCount + 1 : likesCount} likes
          </p>
          <p className="post-card-caption">{postDetails.caption}</p>
          {comments.map(item => (
            <p className="post-card-text" key={item.user_id}>
              <span className="text-bold">{item.user_name}</span>
              {item.comment}
            </p>
          ))}
          <p className="post-card-gray-text">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default PostCard
