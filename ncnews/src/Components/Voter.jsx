import React, { Component } from "react";
import * as api from "../api";
import { Votes, Upvote, Downvote, Votebox } from "../articledesign";
import ErrorPage from "./ErrorPage";

class Voter extends Component {
  state = {
    votesDifference: 0,
    error: null
  };

  votesUpdater = votes => {
    const { id, object } = this.props;
    this.setState(currentState => {
      return { votesDifference: currentState.votesDifference + votes };
    });
    api.patchVotes(votes, id, object).catch(({ response }) => {
      this.setState({
        error: {
          msg: response.data.msg,
          status: response.status
        },
        isLoading: false
      });
    });
  };

  render() {
    const { votes } = this.props;
    const { votesDifference, error } = this.state;
    return (
      <Votebox>
        <Upvote
          className="up vote"
          onClick={() => this.votesUpdater(1)}
          type="submit"
          name="up"
          disabled={votesDifference === 1}
        ></Upvote>
        <Votes> {votes + votesDifference}</Votes>
        <Downvote
          className="down vote"
          onClick={() => this.votesUpdater(-1)}
          type="submit"
          name="down"
          disabled={votesDifference === -1}
        ></Downvote>
        {error && <ErrorPage status={error.status} msg={error.msg} />}
      </Votebox>
    );
  }
}

export default Voter;
