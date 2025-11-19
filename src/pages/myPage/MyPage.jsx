import S from './style';

import Friends from './mypageComponent/friends/Friends';
import ChatList from '../chat/ChatList';
import { useState } from 'react';

const MyPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); // 선택한 채팅방

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

    return (
        <S.Wrapper>
            <S.FirstWrapper>
                <S.Profile>
                    프로필
                </S.Profile>
                <S.Friends>
                    <Friends/>
                </S.Friends>
            </S.FirstWrapper>
            <S.SecondWrapper>
                <S.CalendarWrapper>
                    <S.Calendar />
                    <S.Plan />
                    <S.Review />
                </S.CalendarWrapper>
                <S.Chat>
                    채팅
                </S.Chat>
            </S.SecondWrapper>

        </S.Wrapper>
    );
};

export default MyPage;