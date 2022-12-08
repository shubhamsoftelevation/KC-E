import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Block from './Block';
import ImageComponent from './ImageComponent';
import {wp} from './responsive';
import Text from './Text';
import {light} from './theme/colors';
import {defaultFontSize, t1} from './theme/fontsize';

const componentStyles = () => {
  return StyleSheet.create({
    accent: {
      backgroundColor: light.warning,
      borderColor: light.warning,
      paddingVertical: t1 * 1.5,
    },
    button: {
      alignItems: 'center',
      borderRadius: 30,
      justifyContent: 'center',
      marginVertical: t1,
    },
    disabledButton: {
      backgroundColor: '#00000052',
      borderWidth: 0,
    },
    facebook: {
      backgroundColor: light.facebook,
      borderColor: light.facebook,
      paddingVertical: t1 * 1.5,
    },
    link: {
      backgroundColor: '#006CFF',
      borderColor: '#006CFF',
      paddingVertical: t1 * 1.5,
    },
    primary: {
      backgroundColor: light.secondary,
      borderColor: '#fff',
      paddingVertical: t1 * 1.7,
    },
    secondary: {
      backgroundColor: light.white,
      borderColor: light.secondary,
      borderWidth: 1,
      paddingVertical: t1 * 1.5,
    },
    shadow: {
      elevation: 5,
      shadowColor:
        Platform.OS === 'ios'
          ? 'rgba(101, 131, 123, 0.15)'
          : 'rgba(101, 131, 123, 0.9)',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 1,

      shadowRadius: 10,
    },
  });
};

const Button = ({
  style,
  opacity,
  gradient,
  color,
  startColor,
  endColor,
  end,
  start,
  locations,
  shadow,
  children,
  icon,
  circular,
  size,
  isLoading,
  disabled,
  borderColor,
  textStyle,
  linear,
  iconWithText,
  iconHeight = 22,
  iconWidth = 22,
  iconStyle,
  iconColor,
  uppercase = false,
  ...rest
}) => {
  const styles = componentStyles();
  const renderTextColor = () => {
    if (color === 'secondary' || color === 'link') {
      return light.secondary;
    } else if (color === 'facebook') {
      return '#6F3AC8';
    } else if (disabled && color === 'primary') {
      return 'rgba(255,255,255,0.5)';
    } else if (color === 'primary' || color === 'accent') {
      return light.primary;
    }
    return light.secondary;
  };
  const buttonStyles = [
    styles.button,
    borderColor && {borderColor},
    disabled && shadow && styles.shadow,
    shadow && styles.shadow,
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
    style,
  ];

  if (iconWithText) {
    return (
      <TouchableOpacity
        style={[buttonStyles, disabled && styles.disabledButton]}
        disabled={!!disabled}
        activeOpacity={disabled ? opacity || 0.8 : 0.2}
        {...rest}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Block flex={false} center middle row>
            <Block flex={false} style={iconStyle}>
              <ImageComponent
                name={icon}
                height={iconHeight}
                width={iconWidth}
                color={iconColor}
              />
            </Block>
            <Text
              bold
              style={textStyle}
              center
              uppercase={true}
              size={size || defaultFontSize}
              margin={[0, 0, 0, wp(3)]}
              color={renderTextColor()}>
              {children}
            </Text>
          </Block>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[buttonStyles, (disabled || isLoading) && styles.disabledButton]}
      disabled={!!disabled || isLoading}
      activeOpacity={disabled ? opacity || 0.8 : 0.2}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color={light.primary} />
      ) : (
        <Text
          bold
          style={textStyle}
          center
          uppercase={true}
          size={size || defaultFontSize}
          color={renderTextColor()}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: '#FFF',
};

export default Button;
