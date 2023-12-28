import { useRoute } from '@react-navigation/native';
import { Container, Content, Description, Footer, Label, LicensePlate } from './styles';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { X } from 'phosphor-react-native';

type RouteParamsProps = {
    id:string;
}

export function Arrival() {
    const route = useRoute()
    const {id} = route.params as RouteParamsProps

  return (
    <Container>
      <Header
        title='Chegada'
      />
      <Content>
        <Label>
          Placa do veículo
        </Label>
        <LicensePlate>XXX0000</LicensePlate>

        <Label>
          Finalidade
        </Label>
        <Description>Test lorem ipsum</Description>
        <Footer>
          <ButtonIcon
            icon={X}
          />
          <Button
            title='Registrar chegada'
          />
        </Footer>
        </Content>
    </Container>
  );
}