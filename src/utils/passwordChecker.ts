const defaultOptions = [
  {
    id: 0,
    value: 'veryweak',
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: 'weak',
    minDiversity: 2,
    minLength: 6,
  },
  {
    id: 2,
    value: 'medium',
    minDiversity: 4,
    minLength: 8,
  },
  {
    id: 3,
    value: 'strong',
    minDiversity: 4,
    minLength: 10,
  },
];

const escapeRegExp = (string: string) =>
  string.replace(/[-.*+?^${}()|[\]\\]/g, '\\$&');

const passwordStrength = (
  password: string,
  options = defaultOptions,
  allowedSymbols = '!@#$%^&*',
) => {
  const passwordCopy = password || '';

  options[0].minDiversity = 0;
  options[0].minLength = 0;

  const rules = [
    {
      regex: '[a-z]',
      message: 'lowercase',
    },
    {
      regex: '[A-Z]',
      message: 'uppercase',
    },
    {
      regex: '[0-9]',
      message: 'number',
    },
  ];

  if (allowedSymbols) {
    rules.push({
      regex: `[${escapeRegExp(allowedSymbols)}]`,
      message: 'symbol',
    });
  }

  const strength: any = {};

  strength.contains = rules
    .filter(rule => new RegExp(`${rule.regex}`).test(passwordCopy))
    .map(rule => rule.message);

  strength.length = passwordCopy.length;

  const fulfilledOptions = options
    .filter(option => strength.contains.length >= option.minDiversity)
    .filter(option => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map(option => ({ id: option.id, value: option.value }));

  Object.assign(strength, fulfilledOptions[0]);

  return strength;
};

export const PasswordChecker = { passwordStrength, defaultOptions };
