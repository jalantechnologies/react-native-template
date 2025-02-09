import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modal: {
    width: '75%',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  small: {
    width: '50%',
  },
  medium: {
    width: '75%',
  },
  large: {
    width: '90%',
  },
  header: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    marginBottom: 20,
    fontSize: 16,
  },
  footer: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'red',
  },
});
