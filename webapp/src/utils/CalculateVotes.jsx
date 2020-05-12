const calculateVotes = (votes) =>{
    var voteCount = 0;
    for(var i = 0; i < votes.length; i++){
      switch(votes[i].type){
        case 'upvote':
          voteCount += 1;
          break;

        case 'downvote':
          voteCount -= 1;
          break;

        default:
          voteCount +=0
      }
    }
    return voteCount;
  }
  export default calculateVotes;
