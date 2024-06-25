interface Country {
  code: string;
  dialCode: string;
  name: string;
}

const COUNTRIES: Country[] = [
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

const COUNTRY_SELECT_OPTIONS = COUNTRIES.map(country => ({
  label: ` ${country.code} (${country.dialCode})`,
  value: `${country.dialCode}, ${country.code}`,
}));

export default COUNTRY_SELECT_OPTIONS;
