import React from "react";
import './Track.css';

class Track extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            currentlyPlaying: false,
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.togglePlayPreview = this.togglePlayPreview.bind(this);
        this.renderPreviewIcon = this.renderPreviewIcon.bind(this);
    }

    renderAction() {
        if(this.props.isRemoval) {
            return <button className='Track-action' onClick={this.removeTrack}>-</button>
        } else {
            return <button className='Track-action' onClick={this.addTrack}>+</button>
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    togglePlayPreview() {
        const audio = this.refs.audio;
        if (!this.state.currentlyPlaying) {
            audio.play();
            this.setState({
                currentlyPlaying: true,
            });
        } else {
            audio.pause();
            this.setState({
                currentlyPlaying: false,
            });
        }
    }

    render() {
        return(
            <div className="Track" key={this.props.track.id}>
                <div className="Tract-cover-preview">
                    <audio ref="audio" src={this.props.track.preview} onEnded={() => this.setState({ currentlyPlaying: false})}></audio>
                    <div className="Track-preview-container">
                        {this.renderPreviewIcon()}
                    </div>
                    <img className="Track-album-cover" src={this.props.track.cover} alt="album cover"/>
                </div>
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;