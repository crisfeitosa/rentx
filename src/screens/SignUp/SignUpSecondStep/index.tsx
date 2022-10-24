import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
} from 'react-native';

import { useTheme } from 'styled-components';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../@types/navigation';

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

import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import api from '../../../services/api';

type SignUpSecondStepProps = NativeStackScreenProps<RootStackParamList, 'SignUpSecondStep'>;

interface Params {
  user: {
    name: string,
    email: string,
    driverLicense: string,
  }
}

export function SignUpSecondStep({ navigation, route }: SignUpSecondStepProps){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const theme = useTheme();
  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação');
    }

    if(password != passwordConfirm) {
      return Alert.alert('As senhas não são iguais');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`
      });
    })
    .catch(() => {
      Alert.alert('Opa', 'Não foi possível cadastrar')
    });
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
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              placeholderTextColor={theme.colors.text}
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir Senha'
              placeholderTextColor={theme.colors.text}
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            color={theme.colors.success}
            title='Cadastrar'
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}