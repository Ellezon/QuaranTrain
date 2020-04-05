import React from 'react';
import classNames from 'classnames';

import * as dbFns from '@/utils/database.util.js';

class VideoDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      loading: true
    }
  }
  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    return await
      dbFns.getVideos(10)
        .then(videos =>
          this.setState({
            videos,
            loading: false
          })
        );
  }

  render() {
    const { videos, loading } = this.state;
    return (
      <div className='content video-dashboard'>
        {loading && <div> LOADING </div>}
        {!loading && videos.map((vid) => {
          const category = vid.data.category? vid.data.category.toLowerCase(): '';
          const videoContainerClasses = classNames('video-container', { 'is-live': vid.isPalying }, category);
          return (
            <div key={vid.id} className={videoContainerClasses}>
              <div className='title'>{vid.data.videoTitle}</div>
            </div>
          );
        })}
      </div>

    );
  }
}

export default VideoDashboard;
