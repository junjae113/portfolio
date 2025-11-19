import React, { useEffect, useState } from 'react';
import SupportMenuComponent from './SupportMenuComponent';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextArea from '../../components/textArea/TextArea';
import BasicButton from '../../components/button/BasicButton';
import { useParams } from 'react-router-dom';

const InquiryDetail = ({isUpdate, setIsUpdate}) => {
    const {id} = useParams();
    
    const [content, setContent] = useState("")

    const onChangeContent = (e) => {
        setContent(e.target.value);   
    }

    // 문의글 조회

    const [inquiryTitle, setInquiryTitle] = useState("")
    const [inquiryContent, setInquiryContent] = useState("")
    const [inquiryDate, setInquiryDate] = useState("")
    const [inquiryName, setInquiryName] = useState("")
    const [file, setFile] = useState("")
    const [userId, setUserId] = useState("")
    const [profile, setProfile] = useState("")

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry-detail/${id}`)
        .then(response => response.json())
        .then(data => {
            setInquiryTitle(data.user.title);
            setInquiryContent(data.user.content);
            const date = data.user.created_at.slice(0,10).split("-").join(".");
            setInquiryDate(date)
            setInquiryName(data.user.user_name)
            if(data.user.file != "") {
                setFile(data.user.file);
            } else {
                setFile(null);
            }
            setUserId(data.user.user_id)
          })
        .catch(error => console.error("문의글 불러오는 중 오류" + error))
    }, [])

    const token = localStorage.getItem("jwt_token");

    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    const user_id = payload.user_id;

    // if (userId != user_id) {
    //     window.alert("본인 문의글만 조회할 수 있습니다")
    //     window.open("/support/inquiry-list")
    // }

    const fileImage = file ? <S.FileImage src={file} alt='첨부파일'/> : <p></p>;
    
    // 프로필 사진 조회

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`)
        .then(response => response.json())
        .then((data) => {
            const profileImage = data.user?.dogProfile?.profileImage
            if(profileImage != null){   
                setProfile(profileImage)
            } else {
                setProfile("/assets/img/sample-profile.png")
            }
        })
    })
    
    // 답변 조회

    const [reply, setReply] = useState([])``

    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry-reply/${id}`)
      .then(response => response.json())
      .then(data => setReply(data.data))
      .catch(error => console.error("문의글 답변 불러오는 중 오류" + error))
    }, [])


    const inquiryReply = reply.map((data) => {
        const content = data.reply_content;
        const name = data.user_name;
        const date = data.created_at.slice(0, 10).split("-").join(".");
        // const profile = data.user.dogProfile.profileImage

        return (
        <S.InquiryReplyWapper>
            <S.ReplyProfileDateWrapper>
                <S.ReplyProfileDateWrapper> 
                    <S.ReplyProfileWrapper>
                     <FontAwesomeIcon icon={faArrowTurnUp} rotation={90} size='2xl' />
                     {/* <S.Profile src={profile} alt='답변 프로필' /> */}
                     <S.AuthorName>{name}</S.AuthorName>
                    </S.ReplyProfileWrapper>
                    <S.DateWrapper>
                        {date}  
                    </S.DateWrapper>
                </S.ReplyProfileDateWrapper>
            </S.ReplyProfileDateWrapper>
            <S.ReplyContent>
                {content}
            </S.ReplyContent>
        </S.InquiryReplyWapper>
        )
    })

    // 답변 등록

    const onClickReplyPost = async (e) => {
        const raw = localStorage.getItem("jwt_token")

        if(!content) {
            window.alert('내용을 입력해 주세요')
        } else{
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/post-inquiry-reply`, {
              method : "POST",
              headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${raw}`
              },
              body : JSON.stringify({
                reply_id : Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
                inquiry_id : id,
                reply_content : content,
              })
            })
            .then((res) => {
              if(!res.ok) throw new Error(`Response Fetching Error`);
              return res.json()
            })
            .then((res) => {
              console.log(res)
              if(res.message) alert(res.message);
              setIsUpdate(!isUpdate)
            })
            .catch(console.error)

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry-reply/${id}`)
            .then(response => response.json())
            .then(data => setReply(data.data))
            .catch(error => console.error("방금 등록한 답변 불러오는 중 오류" + error))
        }
     }

     const onClickToList = () => {
        if (content) {
            if (window.confirm("답변 내용이 저장되지 않습니다. 나가시겠습니까?")) {
                window.open("/support/inquiry-list", "_self")
            }
        }
     }

 return (
  <S.InquiryWrapper>
   <SupportMenuComponent activeMenu="inquiry" />
   <S.InquiryBodyWrapper>
    <S.ListWrapper>
        <S.InquiryContentWrapper>
            <S.ProfileDateWrapper>
                <S.AuthorProfileWrapper>
                        <S.Profile
                          src={profile}
                          alt="프로필"
                          onError={(e) => {
                            e.target.src = "/assets/img/sample-profile.png";
                          }}
                        />
                    <S.AuthorName>{inquiryName}</S.AuthorName>
                </S.AuthorProfileWrapper>
                <S.DateWrapper>
                    {inquiryDate}
                </S.DateWrapper>
            </S.ProfileDateWrapper>
            <S.InquiryTitile>
                {inquiryTitle}
            </S.InquiryTitile>
            <S.InquiryContent>
                {inquiryContent}
            </S.InquiryContent>
            {fileImage}
        </S.InquiryContentWrapper>
        {inquiryReply}
        <S.TextAreaWrapper>
            <TextArea placeholder={"답변을 입력해주세요"} maxChars={"500"} onChange={onChangeContent} />
            <S.Replybutton onClick={onClickReplyPost} id='replyButton' >
                <img src="/assets/icons/send.svg" alt="댓글쓰기" />
            </S.Replybutton>
        </S.TextAreaWrapper>
        <S.ButtonToList>
         {/* <Link to={"/support/inquiry-list"} > */}
          <BasicButton children={"목록"} variant={"default"} basicButton={"medium"} onClick={onClickToList} />
         {/* </Link> */}
        </S.ButtonToList>
    </S.ListWrapper>
   </S.InquiryBodyWrapper>
  </S.InquiryWrapper>
 );
};

export default InquiryDetail;