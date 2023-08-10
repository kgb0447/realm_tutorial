import { View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import { TodoRealmContext } from '../../realm/config/TodoConfig'
import Container from '../../components/layout/Container';
import Items from '../../components/shared/Items';

export default function CompletedTask() {
  const { useQuery } = TodoRealmContext;
  const { width } = useWindowDimensions();
  const items = useQuery('Completed');
  
  return (
    <Container>
      <ScrollView style={styles.container} bounces={true}>
        {
          items ? items.map((item) => (
            <View 
              key={item._id}
              style={[styles.itemWrapper,{width: width - 20}]}
            >
              <Items item={item}/>
            </View>
          )) : null
        }
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemWrapper: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    paddingVertical: 10
  },
  itemDesc:{
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 10

  },
  itemDate: {
    fontSize: 16,
    paddingVertical: 10

  },
  itemLabel: {
    fontSize: 18,
    fontWeight: '600',
  }
})