import React, { useRef } from 'react';
import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
;

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ?'height' : 'position'

export function Departure() {

  const descriptionRef = useRef<TextInput>(null)


  return (
    <Container>
      <Header title='Saída'/>
      <KeyboardAvoidingView style={{flex:1}} behavior={keyboardAvoidingViewBehavior}>
      <ScrollView >

      <Content>
      <LicensePlateInput
        label='Placa do veículo'
        placeholder={"BRA1234"}
        onSubmitEditing={() => descriptionRef.current?.focus()}
        returnKeyType='next'
      />

      <TextAreaInput
        ref={descriptionRef}
        label='Finalidade'
        placeholder='Vou utilizar o veículo para...'
        onSubmitEditing={()=> console.log('chami no submit')}
        returnKeyType='send'
        blurOnSubmit
      />

      <Button title='Registrar Saída'/>
      </Content>
    
      </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}