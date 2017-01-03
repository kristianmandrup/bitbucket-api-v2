module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'react'
  ],
  'rules': {
    'arrow-parens': [2, 'always'],
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
    'camelcase': 0,
    'comma-dangle': [2, 'never'],
    'linebreak-style': 0,
    'max-len': [2, { code: 120 }],
    'new-cap': [2, { 'capIsNewExceptions': ['AbstractApi', 'Repositories', 'Request', 'Teams', 'User'] }]
  }
};
