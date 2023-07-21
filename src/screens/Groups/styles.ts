import styled from "styled-components/native";
import {CaretLeft} from "phosphor-react-native"


export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.GRAY_600};
  padding: 24px;
`
export const Title = styled.Text`
  color: white;
  font-size: ${(props)=> props.theme.FONT_SIZE.XL};
`

