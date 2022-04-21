import {Component} from 'react'
import './index.css'

class FailureView extends Component {
  onClickingRetryBtn = () => {
    const {retryMethod} = this.props
    retryMethod()
  }

  render() {
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dfww8i8em/image/upload/v1647826125/Group_7522something_wentwrong_adoocv.png"
          alt="failure view"
          className="failure-img"
        />
        <p className="failure-description">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="try-again-btn"
          onClick={this.onClickingRetryBtn}
        >
          Try again
        </button>
      </div>
    )
  }
}

export default FailureView
