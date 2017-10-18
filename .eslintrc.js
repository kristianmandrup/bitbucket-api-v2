module.exports = {
  // 'extends': 'airbnb',
  // 'plugins': [
  //   'react'
  // ],
  'parserOptions': {
    'ecmaVersion': 6
  },
  'rules': {
    'arrow-parens': [2, 'as-needed'],
    'brace-style': [2, 'stroustrup', {
      'allowSingleLine': true
    }],
    'semi': [2, "never"],
    'camelcase': 0,
    // 'comma-dangle': [2, 'never'],
    'linebreak-style': 0,
    'max-len': [2, {
      code: 160
    }],
    'new-cap': [2, {
      'capIsNewExceptions': ['AbstractApi', 'Repositories', 'Request', 'Teams', 'User']
    }]
  }
};
