import styled from 'styled-components/native';
import {
  ScreenColor,
  ButtonColor,
  HeaderTitleColor,
  ButtonTextColor,
} from '../../../assets/styles';

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${ScreenColor};
`;

export const HeaderArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export const IconArea = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 140px;
  height: 140px;
  border-radius: 100px;
`;

export const PatientName = styled.Text`
  margin-top: 20px;
  font-weight: bold;
  color: ${HeaderTitleColor};
`;

export const DetailsArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export const FieldArea = styled.View`
  padding-top: 20px;
`;

export const ButtonsArea = styled.View`
  width: 100%;
  margin-bottom: 25px;
  margin-top: 25px;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
`;

export const ExamsButton = styled.TouchableOpacity`
  width: 49%;
  border: 1px solid ${ButtonColor};
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ClinicalRecordButton = styled.TouchableOpacity`
  width: 49%;
  border: 1px solid ${ButtonColor};
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonsText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${ButtonTextColor};
`;
