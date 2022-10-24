import React, { useState, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';

import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function SignUpFirstStep(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
        .required('Nome é obrigatório'),
        email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
        driverLicense: Yup.string()
        .required('CNH é obrigatória'),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', {user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro, verifique o preenchimento dos campos',
        );
      }
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet active={false} />
            </Steps>  
          </Header>

          {isKeyboardVisible ? (
              <Title />
            ) : (
              <>
                <Title>Crie sua{'\n'}conta</Title>
                <SubTitle>
                  Faça seu cadastro de{'\n'}
                  forma rápida e fácil
                </SubTitle>
              </>
          )}

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              placeholderTextColor={theme.colors.text}
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              placeholderTextColor={theme.colors.text}
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              placeholderTextColor={theme.colors.text}
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='numeric'
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button
            title='Próximo'
            onPress={handleNextStep}
            enabled={true}
            loading={false}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}