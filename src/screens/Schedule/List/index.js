import React, {useEffect, useState, useContext} from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Scroller,
  HeaderArea,
  SearchButton,
  HeaderTitle,
  SearchArea,
  SearchInput,
  ListArea,
} from './styles';
import SearchIcon from '../../../assets/icons/search.svg';
import {SearchIconColor} from '../../../assets/styles';
import Card from '../../../components/ScheduleCard';
import LoadingComponent from '../../../components/Loading';
import EmptyDataCard from '../../../components/EmptyDataCard';
import {UserContext} from '../../../contexts/UserContext';
import Api from '../../../services/schedule';
import {showMessage} from 'react-native-flash-message';
import DataErrorCard from '../../../components/DataErrorCard';
import {checkState} from '../../../assets/functions';
import {
  BrazilianDate,
  AmericanDate,
  SearchDateFormatter,
} from '../../../pipes/pipes';

export default () => {
  const navigation = useNavigation();
  const {state} = useContext(UserContext);

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [dataError, setDataError] = useState(false);

  const search = async () => {
    if (emptyData) {
      setEmptyData(false);
    }

    if (dataError) {
      setDataError(false);
    }
    if (searchText == '') {
      setEmptyData(!checkState(list));

      showMessage({
        message: 'Informe a data do agendamento',
        type: 'warning',
        icon: 'warning',
      });
    } else {
      setLoading(true);

      let response = await Api.getAll(state.id, AmericanDate(searchText));

      if (response != 'error') {
        if (Object.keys(response).length === 0) {
          setLoading(false);
          setEmptyData(true);
          setList(response);
        } else {
          response.forEach((scheduling) => {
            const time = scheduling.hora.split(':', 2);
            scheduling.hora = time[0] + ':' + time[1];
          });
          setLoading(false);
          setList(response);
        }
      } else {
        showMessage({
          message: 'Erro ao tentar listar',
          type: 'danger',
          icon: 'danger',
        });
        setLoading(false);
        setDataError(true);
        setList([]);
      }
    }
  };

  const generateDate = () => {
    const currentDate = new Date();
    let currentDay = currentDate.getUTCDate();
    const currentMonth = currentDate.getUTCMonth() + 1;
    const currentYear = currentDate.getUTCFullYear();
    if (currentDay < 10) {
      currentDay = '0' + currentDay;
    }
    return currentYear + '-' + currentMonth + '-' + currentDay;
  };

  const getData = async () => {
    setLoading(true);
    setSearchText(BrazilianDate(generateDate()));

    let response = await Api.getAll(state.id, generateDate());

    if (response != 'error') {
      if (Object.keys(response).length === 0) {
        setLoading(false);
        setEmptyData(true);
      } else {
        setLoading(false);
        response.forEach((scheduling) => {
          const time = scheduling.hora.split(':', 2);
          scheduling.hora = time[0] + ':' + time[1];
        });
        setList(response);
      }
    } else {
      showMessage({
        message: 'Erro ao tentar listar',
        type: 'danger',
        icon: 'danger',
      });
      setLoading(false);
      setDataError(true);
      setList([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = () => {
    if (emptyData) {
      setEmptyData(false);
    }

    if (dataError) {
      setDataError(false);
    }

    setRefreshing(false);
    getData();
  };

  const handleClick = (id, name) => {
    navigation.navigate('ScheduleDetails', {id: id, name: name});
  };

  return (
    <Container>
      {!loading && (
        <Scroller
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <HeaderArea>
            <HeaderTitle>Agenda</HeaderTitle>
          </HeaderArea>
          <SearchArea>
            <SearchInput
              placeholder="Digite a data do agendamento"
              placeholderTextColor="#000000"
              value={searchText}
              onChangeText={(t) => setSearchText(SearchDateFormatter(t))}
              keyboardType="numeric"
            />
            <SearchButton onPress={search}>
              <SearchIcon with="24" height="24" fill={SearchIconColor} />
            </SearchButton>
          </SearchArea>

          {emptyData && (
            <EmptyDataCard
              message="Nenhum Agendamento encontrado"
              subMessage="Arraste para baixo para baixo para atualizar a tela"
            />
          )}

          {dataError && (
            <DataErrorCard
              message="Ocorreu um erro ao tentar listar as informações"
              subMessage="Arraste para baixo para baixo para atualizar a tela"
            />
          )}

          {!loading && (
            <ListArea>
              {list.map((item, k) => (
                <Card
                  key={k}
                  data={item}
                  onPress={() => handleClick(item.id, item.paciente.nome)}
                />
              ))}
            </ListArea>
          )}
        </Scroller>
      )}
      {loading && <LoadingComponent />}
    </Container>
  );
};
