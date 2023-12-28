import React, { useRef, useState } from 'react';
import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@realm/react';
;

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ?'height' : 'position'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const realm = useRealm()
  const user = useUser()
  const {goBack} = useNavigation()

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)


  function handleDepartureRegister(){
    try {
      if(!licensePlateValidate(licensePlate)){
        licensePlateRef.current?.focus()
        return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informe a placa correta do veículo.')
      }
  
      if(description.trim().length === 0){
        descriptionRef.current?.focus()
        return Alert.alert('Finalidade', 'Por favor, inform a finalidade da utilização do veículo.')
      }
      setIsRegistering(true)

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          description,
          license_plate: licensePlate.toUpperCase()
        }))
      })

      Alert.alert('Saída', 'Saída do veículo registrar com sucesso!')
      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Nâo foi possível registrar a saída do veículo.')
      setIsRegistering(false)
    }
 
  }


  return (
    <Container>
      <Header title='Saída'/>
      <KeyboardAvoidingView style={{flex:1}} behavior={keyboardAvoidingViewBehavior}>
      <ScrollView >

      <Content>
      <LicensePlateInput
        ref={licensePlateRef}
        label='Placa do veículo'
        onChangeText={setLicensePlate}
        placeholder={"BRA1234"}
        onSubmitEditing={() => descriptionRef.current?.focus()}
        returnKeyType='next'
      />

      <TextAreaInput
        ref={descriptionRef}
        label='Finalidade'
        onChangeText={setDescription}
        placeholder='Vou utilizar o veículo para...'
        onSubmitEditing={handleDepartureRegister}
        returnKeyType='send'
        blurOnSubmit
      />

      <Button isLoading={isRegistering} title='Registrar Saída' onPress={handleDepartureRegister}/>
      </Content>
    
      </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}