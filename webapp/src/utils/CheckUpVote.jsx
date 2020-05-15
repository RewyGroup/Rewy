export const checkUpVote =(voteType) =>{
    
    const checkedVote = {
        voteType:"",
        webVoteType: "",
        counter: 0
    }

    if(voteType === "downvote"){   
    checkedVote.voteType ="upvote" 
    checkedVote.webVoteType = "UPVOTE"; 
    checkedVote.counter = 2;
  }  
  else if (voteType === "upvote") {
    checkedVote.voteType ="neutral" 
    checkedVote.webVoteType = "NEUTRAL"; 
    checkedVote.counter = -1;
  } else {
    checkedVote.voteType ="upvote" 
    checkedVote.webVoteType = "UPVOTE"; 
    checkedVote.counter = 1;
  }
    return(
        checkedVote
    )
  }