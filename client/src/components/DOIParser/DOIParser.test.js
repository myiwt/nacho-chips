import { parseDOI } from './DOIParser';

it('Test DOI Parser', async () => {
  let test_title = 'An Efficient User Verification System Using Angle-Based Mouse Movement Biometrics';
  let test_doi = '10.1145/2893185';

  const result = await parseDOI(test_doi);
  const parsed = result.get();

  expect(parsed[0].title).toBe(test_title);
});
