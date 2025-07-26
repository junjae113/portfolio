import React from "react";
import S from "./style";
import Text from "../text/size";
import BasicInput from "./BasicInput";

const ErrorInput = ({ status = "default", ...rest }) => {
  return (
    <div>
      <BasicInput status="error" {...rest} />
      <S.ErrorMessage mt="8">
        <img src="/assets/icons/error-red.svg" width={16} height={16} alt="에러" />
        <Text.Caption3>
          영대/소문 , 한글 , 숫자 2가지 이상 조합 8자 이상으로 변경해주세요.
        </Text.Caption3>
      </S.ErrorMessage>
    </div>
  );
};

export default ErrorInput;
