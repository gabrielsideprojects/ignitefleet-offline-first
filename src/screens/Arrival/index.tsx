import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Content, Description, Footer, Label, LicensePlate } from './styles';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { X } from 'phosphor-react-native';
import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { BSON } from 'realm';
import { Alert } from 'react-native';

type RouteParamsProps = {
    id:string;
}

export function Arrival() {
    const route = useRoute()
    const {id} = route.params as RouteParamsProps

    const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)
    const realm = useRealm()
    const {goBack} = useNavigation()

    function handleRemoveVehiclUsage(){
      Alert.alert(
        'Cancelar',
        'Cancelar a utilização do veículo',
        [
          {
            text: 'Nâo', style: 'cancel'
          },
          {
            text: 'Sim', onPress:()=> removeVehicleUsage()
          }
        ]
      )
    }

    function removeVehicleUsage(){
      realm.write(()=> {
        realm.delete(historic)
      })
      goBack()
    }

    function handleArrivalRegister(){
      try {
        if(!historic){
          return Alert.alert('Error', 'Nâo foi possível obter os dados para registrar a chegada do veículo.')
        }

        realm.write(() => {
          historic.status = 'arrival';
          historic.updated_at = new Date()
        }
        )

        Alert.alert('Chegada', 'Chegada registrada com sucesso!')
        goBack()
      } catch (error) {
        console.log(error)
        Alert.alert('Error', 'Nâo foi possível registrar a chegada do veículo.')
      }
    }

  return (
    <Container>
      <Header
        title='Chegada'
      />
      <Content>
        <Label>
          Placa do veículo
        </Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>
          Finalidade
        </Label>
        <Description>{historic?.description}</Description>
        <Footer>
          <ButtonIcon
            icon={X}
            onPress={handleRemoveVehiclUsage}
          />
          <Button
            title='Registrar chegada'
            onPress={handleArrivalRegister}
          />
        </Footer>
        </Content>
    </Container>
  );
}