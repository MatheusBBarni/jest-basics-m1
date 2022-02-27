const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query when an object os provided', () => {
    const obj = {
      name: 'Matheus',
      profession: 'developer',
    };
    expect(queryString(obj)).toBe('name=Matheus&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Matheus',
      abilities: ['JS', 'Jest'],
    };
    expect(queryString(obj)).toBe('name=Matheus&abilities=JS,Jest');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Matheus',
      abilities: {
        first: 'JS',
        second: 'Jest',
      },
    };
    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query into an object', () => {
    const qs = 'name=Matheus&profession=developer';
    const expectedObj = {
      name: 'Matheus',
      profession: 'developer',
    };

    expect(parse(qs)).toEqual(expectedObj);
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Matheus';
    const expectedObj = {
      name: 'Matheus',
    };

    expect(parse(qs)).toEqual(expectedObj);
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Matheus&abilities=JS,Jest';
    const expectedObj = {
      name: 'Matheus',
      abilities: ['JS', 'Jest'],
    };

    expect(parse(qs)).toEqual(expectedObj);
  });
});
