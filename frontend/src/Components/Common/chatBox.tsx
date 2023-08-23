import { MessageType } from '../../States/ChatStates';
import styled from 'styled-components';

export function MyChat(props: {
  chatList: MessageType[];
  name: string;
  // ref: React.RefObject<HTMLDivElement>;
}) {
  return (
    <>
      <StyledDiv className="w-35 h-40">
        {props.chatList.length > 0 &&
          props.chatList.map((a, index) => {
            return a.user === 'admin' ? (
              <StyledAdmin key={index}>
                <StyledUser data={a.user}>{a.user}</StyledUser>
                <StyledText>{a.text}</StyledText>
              </StyledAdmin>
            ) : a.user === props.name ? (
              <StyledMy key={index}>
                <StyledUser data={a.user}>{a.user}</StyledUser>
                <StyledText>{a.text}</StyledText>
              </StyledMy>
            ) : (
              <StyledOthers key={index}>
                <StyledUser data={a.user}>{a.user}</StyledUser>
                <StyledText>{a.text}</StyledText>
              </StyledOthers>
            );
          })}
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled.div`
  width: 435px;
  height: 500px;
`;

const StyledMy = styled.ul`
  display: grid;
  justify-items: flex-end;
  padding-right: 38px;
  margin: 5px 0px;
  background-color: rgb(243, 247, 185);
  align-items: center;
  justify-content: flex-end;
  border: 1px solid;
  border-radius: 4px;
  list-style-type: none;
`;

const StyledAdmin = styled.ul`
  display: flex;
  font-size: 11px;
  color: darkgray;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;
  border: 1px solid;
  border-radius: 4px;
  list-style-type: none;
`;
const StyledOthers = styled.ul`
  /* display: grid;
  justify-items: flex-end; */
  align-items: center;
  padding-left: 14px;
  margin: 5px 0px;
  background-color: white;
  border: 1px solid;
  border-radius: 4px;
  list-style-type: none;
`;

const StyledUser = styled.li<{ data?: string }>`
  border: ${(props) => (props.data === 'admin' ? '0.3px solid' : '')};
  border-radius: 3px;
  width: fit-content;
  padding: 1.5px 1.5px;
  margin: 0px 2px;
  font-weight: ${(props) => (props.data !== 'admin' ? 'bold' : '')};
`;

const StyledText = styled.li`
  font-weight: 3px;
`;
