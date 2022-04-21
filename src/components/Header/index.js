import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {MdMenu} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import {FaSearch} from 'react-icons/fa'

import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
    expandHambMenu: false,
    showSmSearchBar: false,
  }

  toggleShowSmSearchBar = () => {
    this.setState(prev => ({
      showSmSearchBar: !prev.showSmSearchBar,
      //  expandHambMenu: false,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = event => {
    event.preventDefault()
    const {activeLinkText} = this.props
    if (activeLinkText === 'Home') {
      const {searchInput} = this.state
      const {onTriggerSearch} = this.props
      onTriggerSearch(searchInput)
    }
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  toggleExpandedHamburger = () => {
    this.setState(prev => ({expandHambMenu: !prev.expandHambMenu}))
  }

  closeHamburgerExpandedView = () => {
    this.setState({expandHambMenu: false})
  }

  render() {
    const {activeLinkText} = this.props
    const {expandHambMenu, showSmSearchBar} = this.state
    const homeLinkClassName =
      activeLinkText === 'Home' ? 'active-link-text' : 'inactive-link-text'

    const profileLinkClassName =
      activeLinkText === undefined ? 'active-link-text' : 'inactive-link-text'

    const smSearchBarClassName = showSmSearchBar
      ? 'active-link-text'
      : 'inactive-link-text'

    return (
      <nav className="header-responsive-container">
        <ul className="header-nav-bar-container">
          <li>
            <Link to="/" className="website-logo-container">
              <img
                src="https://res.cloudinary.com/dfww8i8em/image/upload/v1645334921/Standard_Collection_8_xv8lnb.png"
                className="website-logo-img"
                alt="website logo"
              />
              <h1 className="website-logo-text">Insta Share</h1>
            </Link>
          </li>
          <li className="nav-links-container">
            <ul className="nav-bar-items-container">
              <li>
                <form
                  className="search-bar-container"
                  onSubmit={this.onSubmitSearchInput}
                >
                  <input
                    type="search"
                    placeholder="Search Caption"
                    className="search-input-box"
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    type="submit"
                    className="search-btn"
                    onClick={this.onSubmitSearchInput}
                  >
                    <FaSearch size={10} testid="searchIcon" color=" #989898" />
                  </button>
                </form>
              </li>
              <li className="decoration-none">
                <Link to="/" className="remove-underline">
                  <p className={homeLinkClassName}>Home</p>
                </Link>
              </li>
              <li className="decoration-none">
                <Link to="/my-profile" className="remove-underline">
                  <p className={profileLinkClassName}>Profile</p>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
          <li className="sm-hamberger">
            <button
              type="button"
              className="transparent-btn"
              onClick={this.toggleExpandedHamburger}
            >
              <MdMenu size={30} className="hamburger-menu-icon" />
            </button>
          </li>
        </ul>
        {expandHambMenu && (
          <div className="header-sm-nav-links-container">
            <ul className="sm-nav-links-wrapper ">
              <li className="decoration-none">
                <Link to="/" className="remove-underline">
                  <p className={homeLinkClassName}>Home</p>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className={`transparent-btn ${smSearchBarClassName}`}
                  onClick={this.toggleShowSmSearchBar}
                >
                  Search
                </button>
              </li>
              <li className="remove-underline">
                <Link to="/my-profile" className="decoration-none">
                  <p className={profileLinkClassName}>Profile</p>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="transparent-btn"
                  onClick={this.closeHamburgerExpandedView}
                >
                  <AiFillCloseCircle size={25} />
                </button>
              </li>
              {showSmSearchBar && (
                <div className="sm-search-container">
                  <ul className="sm-links-container">
                    <li>
                      <form
                        className="search-bar-container"
                        onSubmit={this.onSubmitSearchInput}
                      >
                        <input
                          type="search"
                          placeholder="Search Caption"
                          className="search-input-box"
                          onChange={this.onChangeSearchInput}
                        />
                        <button
                          type="submit"
                          className="search-btn"
                          onClick={this.onSubmitSearchInput}
                        >
                          <FaSearch size={10} testid="searchIcon" />
                        </button>
                      </form>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        )}
      </nav>
    )
  }
}
export default withRouter(Header)
