import Axios from 'axios';
import GithubConnector from './GithubConnector';

const pathValid = '/validUser/validRepository'
const invalid = 'validUser/validRepository'


const GIT_HUB_PATH = 'https://github.com'

const data = {
    body: "<p>test</p>"
}

beforeEach(() => {
    spyOn(Axios, 'get').and.returnValue(data)
})

describe('Test case for GitHubConnector', () => {
    it('should request github page data with valid path', async done => {

        try{
            await GithubConnector.execute(pathValid)
            expect(Axios.get).toHaveBeenCalledWith(`${GIT_HUB_PATH}${pathValid}`)
        }
        catch (error) {
            expect(error).toBeUndefined();
        }

        done()

    });

    it('should request github page data with invalid path', async done => {

        try{
            await GithubConnector.execute(pathValid)
            expect(Axios.get).toHaveBeenCalledWith(`${GIT_HUB_PATH}${invalid}`)
        }
        catch (error) {
            expect(error).toBeDefined();
        }

        done()

    });
  });