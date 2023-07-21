import { ButtonIcon } from "@components/ButtonIcon";
import { Container, Icon, Name } from "./styles";

type PlayerCardProps = {
  name: string
  onRemoved: () => void
}

export function PlayerCard({ name, onRemoved }: PlayerCardProps) {
  return (
    <Container>
      <Icon />
      <Name>{name}</Name>
      <ButtonIcon 
        icon="close" 
        type="SECONDARY" 
        onPress={onRemoved}
      />
    </Container>
  )
}