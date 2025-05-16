import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  modalBody: {
    paddingVertical: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  headerCloseButton: {
    padding: 8,
  },
  headerCloseText: {
    fontSize: 24,
    color: '#111827',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  button: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  cancelText: {
    color: '#888',
    fontWeight: '500',
    fontSize: 16,
  },
  confirmText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#aaa',
  },
});
