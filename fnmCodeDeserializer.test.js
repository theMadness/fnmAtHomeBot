const extractCodes = require('./fnmCodeDeserializer.js');

test('deserialize codes', () => {
  expect(extractCodes('!addCodes  AAAAA-00000-11111-22222-BBBBB AAAAA-00000-11111-22222-CCCCC AAAAA-00000-11111-22222-DDDDD AAAAA-00000-11111-22222-EEEEE\n'))
      .toStrictEqual([
        'AAAAA-00000-11111-22222-BBBBB',
        'AAAAA-00000-11111-22222-CCCCC',
        'AAAAA-00000-11111-22222-DDDDD',
        'AAAAA-00000-11111-22222-EEEEE',
      ]);
});
