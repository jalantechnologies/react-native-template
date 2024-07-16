interface Country {
  code: string;
  dialCode: string;
  name: string;
}

export const Countries: Country[] = [
  {
    code: 'US',
    dialCode: '+1',
    name: 'United States',
  },
  {
    code: 'IN',
    dialCode: '+91',
    name: 'India',
  },
];

export const CountrySelectOptions = Countries.map(country => ({
  label: ` ${country.code} (${country.dialCode})`,
  value: `${country.dialCode}, ${country.code}`,
}));
