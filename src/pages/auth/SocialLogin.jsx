import React from "react";
import S from "./style";
import Text from '../../components/text/size';

const SocialLogin = (props) => {
  return (
    <S.SocialLogin {...props}>
        <S.TitleArea>
            <S.TitleLine></S.TitleLine>
            <Text.Body3>간편로그인</Text.Body3>
            <S.TitleLine></S.TitleLine>
        </S.TitleArea>

        <S.IConArea mt="20">
          <S.Icon>
              <img src="/assets/img/naver.png" alt="naver"/>
          </S.Icon>
          <S.Icon>
              <img src="/assets/img/kakao.png" alt="kakao"/>
          </S.Icon>
        </S.IConArea>

    </S.SocialLogin>
  )
};

export default SocialLogin;
