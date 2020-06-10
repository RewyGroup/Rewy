import React,{useState,useEffect} from "react";
import { Row, Col, Button } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {Cookies} from 'react-cookie';
import "./Answer.css";
import {setCorrectAnswer} from '../../actions/answer'
import {checkUpVote} from "../../utils/CheckUpVote"
import { checkDownVote } from "../../utils/CheckDownVote";
import CheckVoteType from "../../utils/CheckVoteType"
import calculateVotes from "../../utils/CalculateVotes";
import {createAnswerVote} from "../../actions/answer";
import {EditorState,convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


const Answer = (props) => {
    const {answer,hasCorrect,isOwner,isLoggedIn,history,token} = props;
    const {user} = answer;
    const [voteType, setVoteType] = useState("neutral");
    const [loggedInUserVote,setLoggedInUserVote] = useState({});
    const [voteCounter,setVoteCounter] = useState(0);
    const loggedInUser = useSelector((state) => state.loginReducer.user);
    const[isWYSIWYG, setIsWYSIWYG] = useState(false);
    const [textState,setTextState] = useState(EditorState.createEmpty(),);
    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const dispatch = useDispatch();
    const [once,setOnce] = useState(true);
    const createdAt =answer.createdAt.replace("T"," ");

    const handleOnClickCorrect = event =>{        
        dispatch(setCorrectAnswer(answer.id,session_token));
        window.location.reload();

    }

    const answerWeb = {
      userId: loggedInUser.id,
      id: answer.id,
      voteType: voteType,
    };

    if(once){
      setLoggedInUserVote(answer.votes.filter(vote => vote.user.id === loggedInUser.id));
      setOnce(false);
    }

    useEffect(() => {
      if(loggedInUserVote.length > 0){
        setVoteType(loggedInUserVote[0].type);
        }
      const votes = calculateVotes(answer.votes);
      setVoteCounter(votes);


      if(answer.text.startsWith("{")){
        setIsWYSIWYG(true);
        const raw = JSON.parse(answer.text);
        const myjson = convertFromRaw(raw);
        setTextState(EditorState.createWithContent(myjson))
              
      }
    }, []);



    const upVote = () => {
        if(isLoggedIn){
          
          const checkedVote = checkUpVote(voteType);
          setVoteType(checkedVote.voteType);
          answerWeb.voteType = checkedVote.webVoteType;
          setVoteCounter(voteCounter+checkedVote.counter);
          
        dispatch(createAnswerVote(answerWeb,token));
        } else {
          history.push("/login");
        }
      };
      
     
    
      const downVote = () => {   
        if(isLoggedIn){ 
          const checkedVote = checkDownVote(voteType);
    
          setVoteType(checkedVote.voteType);
          answerWeb.voteType = checkedVote.webVoteType;
          setVoteCounter(voteCounter+checkedVote.counter);      
          dispatch(createAnswerVote(answerWeb,token));
        }else {
          history.push("/login");
        }
    
      };






    return (
        <div>
            <Row className="m-0">
                <Col xs={{ span: 1, offset: 1 }} className="answerVoteCol">
                <CheckVoteType voteType={voteType} upVote={upVote} downVote={downVote} voteCounter={voteCounter}/>
                </Col>

                <Col xs={10} className="answerDescription" >

                    <Row className="m-0" className="answerText">
                      {isWYSIWYG ?  <div>
                    <div className ="answerTextView">
                    <Editor
                     toolbarHidden={true}
                     editorState={textState}
                     readOnly={true}/> 
                </div>
                </div>:
                        <div>{answer.text} </div>}

                    </Row>

 

                </Col>
            </Row>
            <Row className="answerFooter m-0" >
                <Col xs={1}></Col >
                <Col xs={1} className="answerButtonCol" >
                    {!hasCorrect && isOwner ? <Button onClick={handleOnClickCorrect} className="correctButton" variant="success" value={answer.id}>Correct</Button>:""}
                    </Col>
                <Col className="answerFooterCol">
                        <div className="answerFooterInfo">
                            <div className="answerUserInfoText"> Skapad av:<span className="answerUserInfoCreatedBy"><img className="questionCardThumbnail" src={user.profileImageUrl} alt="thumbnail" /> {user.username}</span></div>
                            <div className="answerUserInfoText"> Skapad: {createdAt}</div>
                            <div className="answerUserInfoText"> Senast ändrad:</div>
                        </div>
                        </Col>
                    </Row>

        </div>

    )
}


export default Answer;
