import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // Tailwind gray-200
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16, // Equivalent to p-4
  },
  content: {
    overflow: 'hidden',
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  chevron: {
    width: 20,
    height: 20,
  },
});
