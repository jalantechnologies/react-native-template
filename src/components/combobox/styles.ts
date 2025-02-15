import { StyleSheet } from 'react-native';

// TODO: Replace with NativeWind classes during integration
export const comboboxStyles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
  input: {
    fontSize: 16,
  },
  list: {
    maxHeight: 200,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  optionText: {
    color: '#1f2937',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4, // TODO: Replace with gap-1
  },
  tag: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
