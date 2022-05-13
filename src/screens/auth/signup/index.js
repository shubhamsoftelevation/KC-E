import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import { images } from 'src/assets';
import { useFormik } from 'formik';
import CommonStyles from 'src/assets/styles';
import { Block, Button, hp, ImageComponent, Input, Text, wp } from '_elements';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = () => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      password: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string()
        .required('Required'),
      lastname: Yup.string()
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(7, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
      confirm: Yup.string()
      .min(7, 'Too Short!')
      .max(20, 'Too Long!')
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords do not match')
    }),
    onSubmit: values => {
      navigate(RoutesName.DASHBOARD_STACK_SCREEN);
    },
  });
  return (
    <ImageBackground source={images.bg} style={CommonStyles.defaultFlex}>
      <SafeAreaView />
      <KeyboardAwareScrollView>
        <Block margin={[hp(10), 0, 0]} defaultPadding={true} flex={false}>
          <Text center={true} h1 semibold>
            Sign up
          </Text>
          <Block flex={false} margin={[hp(2), 0, 0]}>
            <Block row space={'between'} flex={false} margin={[hp(1), 0, 0]}>
              <Input
                style={{ width: wp(39) }}
                placeholder={'First Name'}
                label="First Name"
                value={formik.values.firstname}
                onChangeText={formik.handleChange('firstname')}
                onBlur={() => formik.handleBlur('firstname')}
                error={formik.touched && formik.errors.firstname}


              />
              <Input
                style={{ width: wp(39) }}
                placeholder={'Last Name'}
                label="Last Name"
                value={formik.values.lastname}
                onChangeText={formik.handleChange('lastname')}

                onBlur={() => formik.handleBlur('lastname')}
                value={formik.values.lastname}
                error={formik.touched && formik.errors.lastname}

              />
            </Block>
            <Block flex={false} margin={[hp(1), 0, 0]}>
              <Input
                placeholder={'Email Address'}
                label="Email Address"
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
                onBlur={() => formik.handleBlur('email')}
                error={formik.touched && formik.errors.email}
              />
            </Block>

            <Block flex={false} margin={[hp(1), 0, 0]}>
              <Input
                primary
                secure={true}
                placeholder={'Password'}
                label="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={() => formik.handleBlur('password')}
                error={formik.touched && formik.errors.password}
              />
            </Block>
            <Block flex={false} margin={[hp(1), 0, 0]}>
              <Input
                primary
                secure={true}
                placeholder={'Confirm Password'}
                label="Confirm Password"
                value={formik.values.confirm}
                onChangeText={formik.handleChange('confirm')}
                onBlur={() => formik.handleBlur('confirm')}
                error={formik.touched && formik.errors.confirm}
              />
            </Block>
          </Block>
          <Block flex={false} center margin={[hp(2), 0, 0]}>
            <Button style={{ width: wp(35) }} uppercase color={'primary'}>
              Confirm
            </Button>
          </Block>
          <Block margin={[hp(2), 0]} center space={'between'} flex={false} row>
            <Block
              style={{ width: wp(25) }}
              flex={false}
              borderWidth={[0, 0, 1, 0]}
              borderColorDeafult
            />
            <Text paragraph>Or sign up using</Text>
            <Block
              style={{ width: wp(25) }}
              flex={false}
              borderWidth={[0, 0, 1, 0]}
              borderColorDeafult
            />
          </Block>
          <Block margin={[hp(2), 0]} middle flex={false} row center>
            <Block
              margin={[0, wp(3)]}
              center
              middle
              flex={false}
              borderRadius={40}
              shadow
              header
              style={CommonStyles.icon}>
              <ImageComponent name="google" height={20} width={20} />
            </Block>
            <Block
              center
              middle
              flex={false}
              borderRadius={40}
              shadow
              header
              style={CommonStyles.icon}>
              <ImageComponent name="apple" height={22} width={20} />
            </Block>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default LoginScreen;
