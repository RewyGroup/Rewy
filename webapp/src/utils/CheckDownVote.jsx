export const checkDownVote = (voteType) => {

    const checkedVote = {
        voteType: "",
        webVoteType: "",
        counter: 0
    }


    if (voteType === "upvote") {

        checkedVote.voteType = "downvote";
        checkedVote.webVoteType = "DOWNVOTE";
        checkedVote.counter = -2;
    }

    else if (voteType === "downvote") {
        checkedVote.voteType = "neutral";
        checkedVote.webVoteType = "NEUTRAL";
        checkedVote.counter = 1;

    } else {
        checkedVote.voteType = "downvote";
        checkedVote.webVoteType = "DOWNVOTE";
        checkedVote.counter = -1;

    }
    return (checkedVote)
}