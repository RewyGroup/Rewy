package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.models.User;
import se.rewy.site.models.Vote;
import se.rewy.site.models.VoteType;
import se.rewy.site.repository.UserRepository;
import se.rewy.site.repository.VoteRepository;

@Service
public class VoteService {
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;

    @Autowired
    public VoteService(VoteRepository voteRepository, UserRepository userRepository){
        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
    }



    public Vote setVoteType(Vote vote,long userId, String voteType){
        if(vote == null){
            vote = new Vote();
            User user = userRepository.findById(userId).get();
            vote.setUser(user);
        }
        switch (voteType){
            case  "UPVOTE":
                vote.setType(VoteType.UPVOTE);
                break;

            case "DOWNVOTE":
                vote.setType(VoteType.DOWNVOTE);
                break;

            default:
                vote.setType(VoteType.NEUTRAL);
        }
        return vote;
    }
}
