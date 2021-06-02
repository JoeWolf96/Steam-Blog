import React, { Component } from 'react';

class SteamInfo extends Component {
  render () {
    return  (
      <div>
        <h1>Title: {this.props.name}</h1>
      </div>
    )
  }
}

export default SteamInfo;
