import PropTypes from 'prop-types'
import React from 'react'
import sizeMe from 'react-sizeme'
import Confetti from 'react-confetti'

export default sizeMe({
  monitorHeight: true,
  monitorWidth: true,
  monitorPosition: false,
})(class Example extends React.PureComponent {
  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      position: PropTypes.string,
    }),
  }
  state = {
    recycle: true,
    run: true,
    numberOfPieces: 200,
  }

  render() {

    const {
      width,
      height,
    } = this.props.size
    return (
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '50%', height: '100%'
      }}
      >
        <Confetti
          run={this.state.run}
          recycle={this.state.recycle}
          number={this.state.number}
          width={width}
          height={height}
        />
      </div>
    )
  }
})