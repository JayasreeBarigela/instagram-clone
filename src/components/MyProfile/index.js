import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    myProfileList: [],
    postsList: [],
    storiesList: [],
  }

  componentDidMount() {
    this.renderMyProfile()
  }

  renderMyProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const newData = {
        followersCount: data.profile.followers_count,
        id: data.profile.id,
        followingCount: data.profile.following_count,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }

      const postsData = data.profile.posts.map(eachItem => ({
        postId: eachItem.id,
        image: eachItem.image,
      }))
      //  console.log(postsData)
      const storiesData = data.profile.stories.map(eachStory => ({
        storyId: eachStory.id,
        storyImage: eachStory.image,
      }))
      //  console.log(storiesData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        myProfileList: newData,
        postsList: postsData,
        storiesList: storiesData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="my-profile-loader" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={25} width={25} />
    </div>
  )

  onClickTryAgainMyProfile = () => {
    this.renderMyProfile()
  }

  renderMyProfileList = () => {
    const {myProfileList, storiesList, postsList} = this.state

    const {
      followersCount,
      followingCount,
      postsCount,
      profilePic,
      userBio,
      userName,
      userId,
    } = myProfileList

    return (
      <>
        <Header />
        <div className="my-user-profile-main-con">
          <div className="mobile-view">
            <h1 className="username-mobile">{userName}</h1>
            <div className="top-section">
              <div className="my-image-followers-following-posts-container">
                <img src={profilePic} alt="my profile" className="profilePic" />
                <div className="desktop">
                  <p className="username-desktop">{userName}</p>
                  <ul className="subCons-container">
                    <li className="subCon">
                      <p className="count">{postsCount}</p>
                      <p className="count-heading">posts</p>
                    </li>
                    <li className="subCon">
                      <p className="count">{followersCount}</p>
                      <p className="count-heading">followers</p>
                    </li>
                    <li className="subCon">
                      <p className="count">{followingCount}</p>
                      <p className="count-heading">following</p>
                    </li>
                  </ul>
                  <p className="username-main-desktop">{userId}</p>
                  <p className="bio-desktop">{userBio}</p>
                </div>
              </div>
              <p className="username-main-mobile">{userId}</p>
              <p className="bio-mobile">{userBio}</p>
            </div>
          </div>
          <div className="my-user-stories-container">
            <ul className="story-container">
              {storiesList.map(eachItem => (
                <li key={eachItem.storyId}>
                  <img
                    src={eachItem.storyImage}
                    alt="my story"
                    className="storyImage"
                  />
                </li>
              ))}
            </ul>
            <hr className="line" />
            <div className="icon-heading-con">
              <BsGrid3X3 className="posts-icon" />
              <h1 className="posts-heading">Posts</h1>
            </div>
            {postsList.length > 0 ? (
              <div className="posts-container">
                <ul className="ul">
                  {postsList.map(eachItem => (
                    <li key={eachItem.postId} className="list-item">
                      <img
                        src={eachItem.image}
                        alt="my post"
                        className="post-image"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="no-posts-display">
                <div className="icon-con">
                  <BiCamera className="no-posts-icon" />
                </div>
                <h1 className="no-posts-para">No Posts</h1>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <FailureView retryMethod={() => this.renderMyProfile()} />
  )

  renderAllMyProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfileList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="myProfile-container">{this.renderAllMyProfile()}</div>
    )
  }
}

export default MyProfile
